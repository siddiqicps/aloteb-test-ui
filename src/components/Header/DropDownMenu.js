import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"
import { Link } from "react-router-dom";
import classNames from "classnames";
import CreateNew from "./CreateNew";
import useAuth from "utils/useAuth";

// import AuthService from "services/AuthService"

// import LoginForm from "pages/Login/LoginForm/LoginForm"


export default class DropDownMenu extends Component{
    constructor(props){
        super(props)
        this.state = {
            isopen: false
        }

        this.handleLeftMenuCallBack = this.handleLeftMenuCallBack.bind(this)
    }

    getOtherMenuItems(){
        let menuItems = [
            
            {
                id: 1,
                label: 'Dashboard',
                icon: 'bi-file-bar-graph',
                endpoint: '/dashboard',
            },
            {
                id: 2,
                label: 'Users',
                icon: 'fe-users',
                endpoint: '/users',
            },
        ];

        return menuItems;
    }
    

     /**
     * Toggle the leftmenu when having mobile screen
     */
    handleLeftMenuCallBack() {
        this.setState({isopen: !this.state.isopen});
        // if (openLeftMenuCallBack) openLeftMenuCallBack();
    };


    render() {
        const otherOptions = this.getOtherMenuItems()

        return (
            // <!-- Topbar Start -->
            <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
                <li>
                    <button
                        className="button-menu-mobile open-left d-lg-none d-bolck waves-effect waves-light"
                        onClick={this.handleLeftMenuCallBack}
                    >
                        <i className="fe-menu" />
                    </button>
                </li>

                {/* Mobile menu toggle (Horizontal Layout) */}
                <li>
                    <Link
                        to="#"
                        className={classNames('navbar-toggle nav-link', {
                            open: this.state.isopen,
                        })}
                        onClick={this.handleLeftMenuCallBack}
                    >
                        <div className="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </Link>
                </li>   
    
                <li className="dropdown d-none d-xl-block">
                    <CreateNew otherOptions={otherOptions} />
                </li>
            </ul>
        );
    }

}

export function DropDownMenuFunction(){
    const { branch } = useAuth()
    return(<DropDownMenu branchId={branch}></DropDownMenu>);
}