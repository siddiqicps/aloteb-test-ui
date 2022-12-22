import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"
import { Button, Alert } from "react-bootstrap"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";

import VerticalForm from 'components/Form/VerticalForm';
import FormInput from 'components/Form/FormInput';
import AuthService from "services/AuthService"
import useAuth  from "../../../utils/useAuth"
const auth = new AuthService()

export default class LoginForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            loginError: '',
            loading: ''
        }
        this.onLoginSubmit = this.onLoginSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        // const authStatus = auth.isAuthenticated()
        // if(authStatus){
        //     this.props.navigate('/dashboard')
        // }
    }

    static contextTypes = {
        router: PT.object
    }

    static propTypes = {
        location: PT.object,
        auth: PT.instanceOf(AuthService)
    }

    onLoginSubmit(event){
        event.preventDefault()
        const {username, password} = this.state
        if(username && password){
            auth.login(username, password)
            .then(async (result) => {
                if (!result.access_token) {
                  this.setState({loginError: result.message})
                  return
                }
                auth.finishAuthentication(result)
                // console.log(result,"============",res)
                // this.props.loginHook().then(() => {
                    this.props.navigate('/dashboard')
                // })
            })
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        /*
        form validation schema
        */
        const schemaResolver = yupResolver(
            yup.object().shape({
                username: yup.string().required('Please enter Username'),
                password: yup.string().required('Please enter Password'),
            })
        );

        return (
            <>
                {this.state.loginError && (
                    <Alert variant="danger" className="my-2">
                        {this.state.loginError}
                    </Alert>
                )}

                <VerticalForm
                    resolver={schemaResolver}
                    defaultValues={{ username: 'test', password: 'test' }}
                >
                    <FormInput
                        label="Username"
                        type="text"
                        name="username"
                        placeholder="Enter your Username"
                        containerClass={'mb-3'}
                        onChange={this.handleChange}
                        value={this.state.username}
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        containerClass={'mb-3'}
                        onChange={this.handleChange}
                    ></FormInput>

                    <div className="text-center d-grid">
                        <Button variant="primary" type="submit" disabled={this.state.loading} onClick={this.onLoginSubmit}>
                            Log In
                        </Button>
                    </div>
                </VerticalForm>

                {/* <div className="text-center">
                    <h5 className="mt-3 text-muted">Sign in with</h5>
                    <SocialLinks />
                </div> */}
            </>
        );
    }

}

export function LoginWithRouter(props){
    const navigate = useNavigate()
    // const { login } = useAuth()
    return (<LoginForm navigate={navigate} />)
}