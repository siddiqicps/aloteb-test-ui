import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"


// import AuthService from "services/AuthService"

import BreedCrumb from "components/BreedCrumb/BreedCrumb";
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
                        <BreedCrumb breadCrumbItems={[
                        { label: 'Apps', path: '/apps/chat' },
                        { label: 'Chat', path: '/apps/chat', active: true },
                    ]}
                    title={'Home'}/>
                        <DashboardCards />
                    </div>
                </div>
            </div>
            // <!-- end page content here --> 
        );
    }

}