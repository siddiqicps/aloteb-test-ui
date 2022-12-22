import React, {Component} from "react"
import { Row, Col } from "react-bootstrap";
import { PropTypes as PT} from "prop-types"


// import AuthService from "services/AuthService"

import BreedCrumb from "components/BreedCrumb/BreedCrumb";


export default class UserCreatePage extends Component{
    constructor(props){
        super(props)
        // this.state = {
        //     username: '',
        //     email: '',
        //     password: '',
        //     loginError: ''
        // }
    }


    render() {

        return (
            // <!-- start page content here -->
            <div className="content-page">
                <div className="content">

                    {/* <!-- Start Content--> */}
                    <div className="container-fluid">
                        <BreedCrumb breadCrumbItems={[
                                { label: 'Apps', path: '/apps/chat' },
                                { label: 'Chat', path: '/apps/chat', active: true },
                            ]}
                            title={'Frameworks'} />
                        <Row>
                            <Col lg={7} xl={8}>
                                {/* <ChatUsers onUserSelect={onUserChange} /> */}
                            </Col>
                            <Col lg={5} xl={4}>
                                {/* <ChatArea selectedUser={selectedUser} /> */}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            
            // <!-- end page content here --> 
        );
    }

}