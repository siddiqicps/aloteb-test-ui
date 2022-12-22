import React, {Component} from 'react';
import { Modal, Button, Card, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import VerticalForm from 'components/Form/VerticalForm';
import FormInput from 'components/Form/FormInput';
import classNames from 'classnames';
import axios from "axios";
import { format } from 'date-fns';

import { API_URL } from 'utils/constants';
// components
// import { VerticalForm, FormInput } from '../../../../components/';

// interface AddCustomerProps {
//     show: boolean;
//     onHide: () => void;
//     onSubmit: (value: any) => void;
// }

export default class AddUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: props.selecetedRecord.added_date,
            email: props.selecetedRecord.client_name,
            username: props.selecetedRecord.client_testimonial,
            password: props.selecetedRecord.client_profile,
            role_id: props.selecetedRecord.client_logo,
            contact_no: props.selecetedRecord.client_status,
            uid: props.selecetedRecord.uid,
            swal: {},
            isDisabled: false,
            fileDataURL: '',
            page_title: 'Add New User'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.formReset = this.formReset.bind(this)
        this.dateFromDateString = this.dateFromDateString.bind(this)
        this.previewFile = this.previewFile.bind(this)
    }

    componentDidUpdate(prevProps){
        if(this.props.selecetedRecord.uid !== prevProps.selecetedRecord.uid
            || this.props.action !== prevProps.action){
            this.setState({name: this.props.selecetedRecord.client_name, 
                uid: this.props.selecetedRecord.client_id,
                email: this.props.selecetedRecord.client_testimonial,
                username: this.props.selecetedRecord.added_date,
                password: this.props.selecetedRecord.client_profile,
                role_id: this.props.selecetedRecord.client_status, 
                contact_no: this.props.selecetedRecord.client_status,
                isDisabled: false,
                page_title:'Edit User'});
            if(this.props.action === 'View'){
                this.setState({isDisabled: true, page_title: 'User Details'})
            }
        }
    }

    dateFromDateString(dateStr){
        const dateTimeArr = dateStr.split('T')
        const [y, m, d] = dateTimeArr[0].split('-');
        const [hh, mm ,ss] = dateTimeArr[1] ? dateTimeArr[1].split(':') : [];
        const dateTimeObj = new Date(y,m-1,d)
        return format(dateTimeObj, 'yyyy-MM-dd')
    }

    // dateForPicker(dateStr){}

    // handleChange(event) {
    //     if(event.target.name == 'client_date'){
    //         this.setState({[event.target.name]: event.target.value});
    //     }else if(event.target.name == 'client_status'){
    //         const status = event.target.checked ? 'Active' : 'Blocked' 
    //         this.setState({[event.target.name]: status});
    //     }else if(event.target.name == 'client_logo'){
    //         const file = event.target.files[0];
    //         this.setState({[event.target.name]: file})
    //         this.previewFile(file)
    //     }else{
    //         this.setState({[event.target.name]: event.target.value});
    //     }
    // }

    handleSubmit(event){
        event.preventDefault();
    
        let userPayload = {
          name:  this.state.name,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          role_id: this.state.role_id,
          contact_no: this.state.contact_no,
          Token: localStorage.getItem('token')
        };

        let uri = API_URL+'/users/addUser';
        let method = 'post';
        let msg = 'User addedd successfully';
        if(this.state.client_id){
            uri += API_URL+'/users/updateUser';
            userPayload.uid = this.state.uid;
            msg = 'User updated successfully'
        }
        axios({method: method, url:uri,  data: userPayload })
          .then(res => {
            console.log(res);
            this.props.onSubmit(res.data);
            this.props.displayAlert({
                show: true,
                title: 'Done!',
                text: msg,
                icon: 'success',
            })
          })
    }

    formReset(){
        this.setState({name: '', 
            email: '', 
            username: '',
            password:'',
            role_id: '',
            contact_no:'',
            uid: '',
            isDisabled: false, page_title:'Add New Client'})
    }

    previewFile(file){
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    this.setState({fileDataURL:result})
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }
    }


    render() {
        /*
        form validation schema
        */
        const schemaResolver = yupResolver(
            yup.object().shape({
                name: yup.string().required('Please enter name'),
                email: yup.string().required('Please enter email').email('Please enter valid email'),
                phone: yup
                    .string()
                    .required('Please enter phone')
                    .matches(/^\d{10}$/, 'Phone number is not valid'),
                location: yup.string().required('Please enter location'),
            })
        );
        return (
            <>
                <Card>
                    <Card.Header as="h5" style={{backgroundColor:'#dee2e6'}}>{this.state.page_title}</Card.Header>
                    <Card.Body>
                        {/* <h5 className={classNames('mb-0', this.props.titleClass)}>Add Branch</h5> */}
                        <VerticalForm onSubmit={this.props.onSubmit} resolver={schemaResolver}>
                        <fieldset disabled={this.state.isDisabled}>
                            <FormInput
                                label="Date"
                                type="date"
                                name="client_date"
                                containerClass={'mb-3'}
                                key="date"
                                value = {this.state.client_date ? this.dateFromDateString(this.state.client_date) : ''}
                                onChange={this.handleChange}
                            />
                            <FormInput
                                label="Client Name"
                                type="text"
                                name="client_name"
                                placeholder="Enter client name"
                                containerClass={'mb-3'}
                                value = {this.state.client_name}
                                onChange={this.handleChange}
                            />
                            <FormInput
                                label="Clent Testimonial"
                                type="textarea"
                                name="client_testimonial"
                                placeholder="Enter client testimonial"
                                containerClass={'mb-3'}
                                value = {this.state.client_testimonial}
                                onChange={this.handleChange}
                            />
                            <FormInput
                                label="Client Profile"
                                type="textarea"
                                name="client_profile"
                                placeholder="Enter client profile"
                                containerClass={'mb-3'}
                                value = {this.state.client_profile}
                                onChange={this.handleChange}
                            />

                            <FormInput
                                label="Client Logo"
                                type="file"
                                name="client_logo"
                                containerClass={'mb-3'}
                                key="file"
                                accept="image/*"
                                onChange={this.handleChange}
                            />
                            <img src={this.state.fileDataURL}  height="64" className={'mb-3'} />

                            <Form.Group className={'mb-3'}>
                                <Form.Check
                                    type="switch"
                                    label="Client Status"
                                    name="client_status"
                                    id="disabled-custom-switch"
                                    className="mt-1"
                                    defaultChecked = {this.state.client_status == 'Active' ? true : false}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <div className="text-end">
                                <Button variant="success" type="submit" className="waves-effect waves-light me-1" onClick={this.handleSubmit}>
                                    Save
                                </Button>
                                <Button variant="danger" className="waves-effect waves-light" onClick={this.formReset}>
                                    Reset
                                </Button>
                            </div>
                            </fieldset>
                        </VerticalForm>
                    </Card.Body>
                </Card>
            </>
        );
    }

}