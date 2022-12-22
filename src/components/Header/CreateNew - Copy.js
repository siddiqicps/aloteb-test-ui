import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames";

// import AuthService from "services/AuthService"

// import LoginForm from "pages/Login/LoginForm/LoginForm"


export default class CreateNew extends Component{
    constructor(props){
        super(props)
        this.state = {
            dropdownOpen: false
        }
        this.toggleDropdown = this.toggleDropdown.bind(this)
    }


    /*
     * toggle dropdown
     */
    toggleDropdown(){
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    };


    render() {

        return (
            // <!-- Create new menu -->
            <>
                {(this.props.otherOptions || []).map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {/* {index === this.props.otherOptions.length - 1 && <div className="dropdown-divider"></div>} */}
                                        <Link key={index} to={item.endpoint} className="dropdown-item">
                                            <i className={classNames(item.icon, 'me-1')}></i>
                                            <span>{item.label}</span>
                                        </Link>
                                    </React.Fragment>
                                );
                            })}
            </>
        );
    }

}