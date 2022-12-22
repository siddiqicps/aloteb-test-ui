import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import SimpleBar from 'simplebar-react';
import classNames from "classnames";
// import AuthService from "services/AuthService"

// import LoginForm from "pages/Login/LoginForm/LoginForm"

// notifiaction continer styles
const notificationContainerStyle = {
    maxHeight: '230px',
    display: 'none',
};

const notificationShowContainerStyle = {
    maxHeight: '230px',
};

export default class Notification extends Component{
    constructor(props){
        super(props)
        this.state = {
            dropdownOpen: false,
            notificationContentStyle: notificationContainerStyle
        }
        this.toggleDropdown = this.toggleDropdown.bind(this)
    }

    /*
     * toggle notification-dropdown
     */
    toggleDropdown(){
        this.setState({dropdownOpen: !this.state.dropdownOpen});
        this.setState({notificationContentStyle:
            this.state.notificationContentStyle === notificationContainerStyle
                ? notificationShowContainerStyle
                : notificationContainerStyle
        });
    };


    render() {

        return (
            // <!-- Notification Menu Start -->
            <li className="dropdown notification-list topbar-dropdown">
                <Dropdown show={this.state.dropdownOpen} onToggle={this.toggleDropdown}>
                    <Dropdown.Toggle
                        id="dropdown-notification"
                        as="a"
                        onClick={this.toggleDropdown}
                        className={classNames('nav-link waves-effect waves-light', {
                            show: this.state.dropdownOpen,
                        })}
                    >
                        <i className="fe-bell noti-icon"></i>
                        <span className="badge bg-danger rounded-circle noti-icon-badge">9</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg">
                        <div onClick={this.toggleDropdown}>
                            <div className="dropdown-item noti-title">
                                <h5 className="m-0">
                                    <span className="float-end">
                                        <Link to="#" className="text-dark">
                                            <small>Clear All</small>
                                        </Link>
                                    </span>
                                    Notification
                                </h5>
                            </div>
                            <SimpleBar style={this.state.notificationContentStyle}>
                                {(this.props.notifications || []).map((item, i) => {
                                    return (
                                        <Link to="#" className="dropdown-item notify-item" key={i + '-noti'}>
                                            {item.avatar ? (
                                                <>
                                                    <div className="notify-icon">
                                                        <img src={item.avatar} alt="" className="img-fluid rounded-circle" />
                                                    </div>
                                                    <p className="notify-details">{item.text}</p>
                                                    <p className="text-muted mb-0 user-msg">
                                                        <small>{item.subText}</small>
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <div className={`notify-icon bg-${item.bgColor}`}>
                                                        <i className={item.icon}></i>
                                                    </div>
                                                    <p className="notify-details">
                                                        {item.text} <small className="text-muted">{item.subText}</small>
                                                    </p>
                                                </>
                                            )}
                                        </Link>
                                    );
                                })}
                            </SimpleBar>

                            <Link to="#" className="dropdown-item text-center text-primary notify-item notify-all">
                                View All <i className="fe-arrow-right"></i>
                            </Link>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
        );
    }

}