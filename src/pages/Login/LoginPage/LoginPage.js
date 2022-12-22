import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"
import { Container,Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// import AuthService from "services/AuthService"

// import LoginForm from "pages/Login/LoginForm/LoginWithRouter"
import { LoginWithRouter } from "../LoginForm/LoginForm";


export default class LoginPage extends Component{
    constructor(){
        super()
        // this.state = {
        //     username: '',
        //     email: '',
        //     password: '',
        //     loginError: ''
        // }
    }

    componentDidMount(){
        console.log("Inside LoginPage")
    }

    // static contextTypes = {
    //     router: PT.object
    // }

    // static propTypes = {
    //     location: PT.object,
    //     auth: PT.instanceOf(AuthService)
    // }

    // onLoginSubmit(event){
    //     event.preventDefault()
    //     const {username, password} = this.state
    //     if(username && password){
    //         auth.login(username, password)
    //         .then(result => {
    //             if (!result.token) {
    //               this.setState({loginError: result.message})
    //               return
    //             }
    //             auth.finishAuthentication(result.token)
    //             // this.props.history.push('/dashboard')
    //         })
    //     }
    // }

    render() {

        return (
            <>
            <div className="account-pages mt-5 mb-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={4}>
                            <Card className="bg-pattern">
                                <Card.Body className="p-4">
                                    <div className="text-center w-75 m-auto">
                                        <div className="auth-logo">
                                            <Link to="/" className="logo logo-dark text-center">
                                                <span className="logo-lg">
                                                    <img src="assets/images/Logo-SolarHRM.png" alt="" height="44" />
                                                </span>
                                            </Link>

                                            <Link to="/" className="logo logo-light text-center">
                                                <span className="logo-lg">
                                                    <img src="assets/images/Logo-SolarHRM.png" alt="" height="22" />
                                                </span>
                                            </Link>
                                        </div>
                                        <p className="text-muted mb-4 mt-3">Enter your username and password to access admin panel.</p>
                                    </div>
                                    <LoginWithRouter />
                                </Card.Body>
                            </Card>

                            {/* bottom links */}
                            {/* {bottomLinks} */}
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* <footer className="footer footer-alt">
                2015 - {new Date().getFullYear()} &copy; UBold theme by{' '}
                <Link to="#" className="text-white-50">
                    Coderthemes
                </Link>
            </footer> */}
        </>
        );
    }

}