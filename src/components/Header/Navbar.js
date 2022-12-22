import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"
import Logo from "./Logo";
import DropDownMenu, { DropDownMenuFunction } from "./DropDownMenu";
import Notification from "./Notification";
import Welcome, { WelcomeWithRouter } from "./Welcome";

import profilePic from '../../images/dummy-user.png';
import avatar4 from '../../images/users-user-4.jpg';

// import AuthService from "services/AuthService"

// import LoginForm from "pages/Login/LoginForm/LoginForm"


export default class Navbar extends Component{
    constructor(context){
        super()
        // this.state = {
        //     username: '',
        //     email: '',
        //     password: '',
        //     loginError: ''
        // }
    }

    getNotifications(){
       return [
            {
                id: 1,
                text: 'Tahir Siddiqui',
                subText: 'Hi, How are you? What about our next meeting',
                avatar: profilePic,
            },
            // {
            //     id: 2,
            //     text: 'Caleb Flakelar commented on Admin',
            //     subText: '1 min ago',
            //     icon: 'mdi mdi-comment-account-outline',
            //     bgColor: 'primary',
            // },
            // {
            //     id: 3,
            //     text: 'Karen Robinson',
            //     subText: 'Wow ! this admin looks good and awesome design',
            //     avatar: avatar4,
            // },
            // {
            //     id: 4,
            //     text: 'New user registered.',
            //     subText: '5 hours ago',
            //     icon: 'mdi mdi-account-plus',
            //     bgColor: 'warning',
            // },
            // {
            //     id: 5,
            //     text: 'Caleb Flakelar commented on Admin',
            //     subText: '1 min ago',
            //     icon: 'mdi mdi-comment-account-outline',
            //     bgColor: 'info',
            // },
            // {
            //     id: 6,
            //     text: 'Carlos Crouch liked Admin',
            //     subText: '13 days ago',
            //     icon: 'mdi mdi-heart',
            //     bgColor: 'secondary',
            // },
        ];
    }

    getProfileMenu(){
        // get the profilemenu
        return [
            // {
            //     label: 'My Account',
            //     icon: 'fe-user',
            //     redirectTo: '#',
            // },
            // {
            //     label: 'Settings',
            //     icon: 'fe-settings',
            //     redirectTo: '#',
            // },
            // {
            //     label: 'Lock Screen',
            //     icon: 'fe-lock',
            //     redirectTo: '/auth/lock-screen',
            // },
            // {
            //     label: 'Logout',
            //     icon: 'fe-log-out',
            //     redirectTo: '/logout',
            // },
        ];
    }


    render() {
        const Notifications = this.getNotifications();
        const ProfileMenus = this.getProfileMenu()
        const username = localStorage.getItem('name');
        return (
            // <!-- Topbar Start -->
            <div className="navbar-custom">
                <div className="container-fluid">
                    <ul class="list-unstyled topnav-menu float-end mb-0">
                        {/* <Notification notifications={Notifications} /> */}
                        <WelcomeWithRouter profilePic={profilePic}
                                menuItems={ProfileMenus}
                                username={username}
                                userTitle={'Admin'} />
                    </ul>
                    <Logo />
                    <DropDownMenuFunction />
                </div>
            </div>
        );
    }

}