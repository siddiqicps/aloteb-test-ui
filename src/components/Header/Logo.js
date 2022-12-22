import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"

// import AuthService from "services/AuthService"

// import LoginForm from "pages/Login/LoginForm/LoginForm"


export default class Logo extends Component{
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
            // <!-- LOGO -->
            <div className="logo-box">
                <a href="index.html" className="logo logo-dark text-center">
                    <span className="logo-sm">
                        <img src="assets/images/Logo-SolarHRM.png" alt="" height="44" />
                        {/* <!-- <span className="logo-lg-text-light">UBold</span> --> */}
                    </span>
                    <span className="logo-lg">
                        <img src="assets/images/Logo-SolarHRM.png" alt="" height="44" />
                        {/* <!-- <span className="logo-lg-text-light">U</span> --> */}
                    </span>
                </a>

                <a href="index.html" className="logo logo-light text-center">
                    <span className="logo-sm">
                        <img src="assets/images/Logo-SolarHRM.png" alt="" height="44" />
                    </span>
                    <span className="logo-lg">
                        <img src="assets/images/Logo-SolarHRM.png" alt="" height="44" />
                    </span>
                </a>
            </div>
        );
    }

}