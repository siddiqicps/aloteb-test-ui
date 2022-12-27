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
            name: props.selecetedRecord.name,
            email: props.selecetedRecord.email,
            username: props.selecetedRecord.username,
            password: props.selecetedRecord.password,
            role_id: props.selecetedRecord.role_id,
            contact_no: props.selecetedRecord.contact_no,
            uid: props.selecetedRecord.uid,
            swal: {},
            isDisabled: false,
            roles: '',
            page_title: 'Add New User'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.formReset = this.formReset.bind(this)
        this.dateFromDateString = this.dateFromDateString.bind(this)
        this.getRoles = this.getRoles.bind(this)
        this.createOptions = this.createOptions.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        this.getRoles();
    }

    componentDidUpdate(prevProps){
        if(this.props.selecetedRecord.uid !== prevProps.selecetedRecord.uid
            || this.props.action !== prevProps.action){
            this.setState({name: this.props.selecetedRecord.name, 
                uid: this.props.selecetedRecord.uid,
                email: this.props.selecetedRecord.email,
                username: this.props.selecetedRecord.username,
                password: this.props.selecetedRecord.password,
                role_id: this.props.selecetedRecord.role_id, 
                contact_no: this.props.selecetedRecord.contact_no,
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

    handleChange(event) {
        // if(event.target.name == 'client_date'){
        //     this.setState({[event.target.name]: event.target.value});
        // }else if(event.target.name == 'client_status'){
        //     const status = event.target.checked ? 'Active' : 'Blocked' 
        //     this.setState({[event.target.name]: status});
        // }else if(event.target.name == 'client_logo'){
        //     const file = event.target.files[0];
        //     this.setState({[event.target.name]: file})
        //     this.previewFile(file)
        // }else{
            this.setState({[event.target.name]: event.target.value});
        // }
    }

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

    getRoles(){
        const uri = API_URL+'/users/getRoles'
        const method = 'post'
        const payload = {Token : localStorage.getItem('token') }
        axios({method: method, url:uri,  data: payload })
            .then(res =>{
                const roles = res.data;
                this.setState({roles: roles});
            })
    }

    createOptions(){
        const roles = this.state.roles
        let items = [];         
        for (let i = 0; i < roles.length; i++) {             
            items.push(<option key={i} value={roles[i].role_id}>{roles[i].role_title}</option>);   
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return items;
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
                                label="Username"
                                type="text"
                                name="username"
                                containerClass={'mb-3'}
                                key="username"
                                value = {this.state.username}
                                onChange={this.handleChange}
                            />
                            <FormInput
                                label="Password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                containerClass={'mb-3'}
                                value = {this.state.password}
                                onChange={this.handleChange}
                            />
                            <FormInput
                                label="Name"
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                containerClass={'mb-3'}
                                value = {this.state.name}
                                onChange={this.handleChange}
                            />
                            <FormInput
                                label="Contact Number"
                                type="number"
                                name="contact_no"
                                placeholder="Enter contact number"
                                containerClass={'mb-3'}
                                value = {this.state.contact_no}
                                onChange={this.handleChange}
                            />
                            <FormInput
                                label="Email"
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                containerClass={'mb-3'}
                                value = {this.state.email}
                                onChange={this.handleChange}
                            />
                            <FormInput
                                label="Select Role"
                                type="select"
                                name="role_id"
                                containerClass={'mb-3'}
                                className="form-select"
                                key="select"
                                value = {this.state.role_id}
                                onChange={this.handleChange}
                            >
                                <option>--Select Role--</option>
                                {this.createOptions()}
                            </FormInput>

                            {/* <FormInput
                                label="Client Logo"
                                type="file"
                                name="client_logo"
                                containerClass={'mb-3'}
                                key="file"
                                accept="image/*"
                                onChange={this.handleChange}
                            />
                            <img src={this.state.fileDataURL}  height="64" className={'mb-3'} /> */}

                            {/* <Form.Group className={'mb-3'}>
                                <Form.Check
                                    type="switch"
                                    label="Client Status"
                                    name="client_status"
                                    id="disabled-custom-switch"
                                    className="mt-1"
                                    defaultChecked = {this.state.client_status == 'Active' ? true : false}
                                    onChange={this.handleChange}
                                />
                            </Form.Group> */}

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