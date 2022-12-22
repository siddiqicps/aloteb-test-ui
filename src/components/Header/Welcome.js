import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import useAuth from "utils/useAuth";

import AuthService from "services/AuthService"

const auth = new AuthService()

// import AuthService from "services/AuthService"

// import LoginForm from "pages/Login/LoginForm/LoginForm"

// const username = localStorage.getItem('name');
export default class Welcome extends Component{
    constructor(props){
        super(props)
        this.state = {
            dropdownOpen: false
        }
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.logout = this.logout.bind(this)
    }

    /*
     * toggle profile-dropdown
     */
    toggleDropdown() {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    logout(){
        auth.logout()
        this.props.navigate('/')
    }


    render() {
        return (
            // <!-- Welcome Menu Start -->
            <li className="dropdown notification-list topbar-dropdown">
                <Dropdown show={this.state.dropdownOpen} onToggle={this.toggleDropdown}>
                    <Dropdown.Toggle
                        id="dropdown-profile"
                        as="a"
                        onClick={this.toggleDropdown}
                        className={classNames('nav-link nav-user me-0 waves-effect waves-light', { show: this.state.dropdownOpen })}
                    >
                        <img src={this.props.profilePic} className="rounded-circle" alt="" />
                        <span className="pro-user-name ms-1">
                            {this.props.branchName} <i className="mdi mdi-chevron-down"></i>
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-end profile-dropdown">
                        <div onClick={this.toggleDropdown}>
                            {/* <div className="dropdown-header noti-title">
                                <h6 className="text-overflow m-0">Welcome !</h6>
                            </div> */}
                            <React.Fragment key="1">
                                {/* {index === this.props.menuItems.length - 1 && <div className="dropdown-divider"></div>} */}
                                <a
                                    style={{cursor:'pointer'}}
                                    className="dropdown-item notify-item"
                                    key={'1-profile-menu'}
                                    onClick={this.logout}
                                >
                                    <i className={`fe-log-out me-1`}></i>
                                    <span>Logout</span>
                                </a>
                            </React.Fragment>
                            {/* {(this.props.menuItems || []).map((item, index) => {
                                return (
                                    // <React.Fragment key={index}>
                                    //     {index === this.props.menuItems.length - 1 && <div className="dropdown-divider"></div>}
                                    //     <Link
                                    //         to={item.redirectTo}
                                    //         className="dropdown-item notify-item"
                                    //         key={index + '-profile-menu'}
                                    //     >
                                    //         <i className={`${item.icon} me-1`}></i>
                                    //         <span>{item.label}</span>
                                    //     </Link>
                                    // </React.Fragment>
                                    
                                );
                            })} */}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
            
        );
    }

}

export function WelcomeWithRouter(props){
    const navigate = useNavigate()
    const { branchName } = useAuth()
return(<Welcome navigate={navigate} profilePic={props["profilePic"]} 
        menuItems={props["menuItems"]} username={props["username"]} userTitle={props["userTitle"]} 
        branchName={branchName}></Welcome>)
}