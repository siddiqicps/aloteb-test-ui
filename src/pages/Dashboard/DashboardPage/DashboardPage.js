import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"


// import AuthService from "services/AuthService"

import DashboardCards from "../DashboardCards/DashboardCards";


export default class DashboardPage extends Component{
    constructor(context){
        super()
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
                        
                        <DashboardCards />
                    </div>
                </div>
            </div>
            // <!-- end page content here --> 
        );
    }

}