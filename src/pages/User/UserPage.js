import React, {Component} from "react"
import { Row, Col } from "react-bootstrap";
import { PropTypes as PT} from "prop-types";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

import { API_URL } from 'utils/constants';
// import AuthService from "services/AuthService"

import UserListPage from "./UserListPage";
import AddUser from "./AddUser";


class UserPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            show: false,
            created_rec: {},
            selected_rec:{},
            selected_id: '',
            action: '',
            swal: {}
        }
        // this.onCloseModal = this.onCloseModal.bind(this)
        // this.onOpenModal = this.onOpenModal.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onView = this.onView.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.displayAlert = this.displayAlert.bind(this);
        this.actionConfirm = this.actionConfirm.bind(this);
    }

    /*
     *   modal handeling
     */
    // onCloseModal(){ this.setState({show:false}); }
    // onOpenModal() { this.setState({show:true}); }

    /*
    handle form submission
    */
    onSubmit(val){
        // this.onCloseModal();
        this.setState({created_rec: val})
    };

    /*
    handle record view
    */
    onView(val){
        // this.onCloseModal();
        this.setState({selected_rec: val, action:'View'})
    };

    /*
    handle record edit
    */
    onEdit(val){
        // this.onCloseModal();
        console.log("onEdit===",val)
        this.setState({selected_rec: val, action:'Edit'})
    };

    /*
    handle record delete
    */
    onDelete(val){
        // this.onCloseModal();
        console.log("onDelete===",val)
        this.setState({selected_id: val.uid})
    };

    displayAlert(alertObj){
        const { swal } = this.props;
        const that = this
        // alertObj["onConfirm"] = function(result){ if(result.isConfirmed){ this.actionConfirm() }}
        // this.setState({swal: alertObj})
        swal.fire(alertObj)
            .then(function(response){
                console.log("Alert Response#######", response)
                if(response.isConfirmed && that.state.selected_id){ that.actionConfirm() }
            })
    }

    actionConfirm(){
        let userPayload = {
            uid:  this.state.selected_id,
            Token: localStorage.getItem('token')
        };
        const uri = API_URL+'/users/deleteUser'
        const method  = 'post'
        axios({method: method, url:uri,  data: userPayload })
            .then(res =>{
                const branches = res.data;
                this.displayAlert({
                    show: true,
                    title: 'Done!',
                    text: res.data,
                    icon: 'success',
                })
                this.setState({selected_id: '', created_rec: {}})
            })
    }


    render() {

        return (
            // <!-- start page content here -->
            <div className="content-page">
                <div className="content">

                    {/* <!-- Start Content--> */}
                    <div className="container-fluid">
                        
                        <Row>
                            <Col lg={7} xl={8}>
                                <UserListPage  newClient={this.state.created_rec} onView={this.onView} 
                                        onEdit={this.onEdit} onDelete={this.onDelete}
                                        displayAlert={this.displayAlert} />
                            </Col>
                            <Col lg={5} xl={4}>
                                {/* <ChatUsers onUserSelect={onUserChange} /> */}
                                <AddUser onSubmit={this.onSubmit} selecetedRecord={this.state.selected_rec} 
                                action={this.state.action} displayAlert={this.displayAlert} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            
            // <!-- end page content here --> 
        );
    }

}

export default withSwal(UserPage);