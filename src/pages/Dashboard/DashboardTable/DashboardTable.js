import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';
import BasicPortlet from "../BasicPortlet";

import avatar1 from '../../../images/users-user-1.jpg';
import avatar2 from '../../../images/users-user-2.jpg';
import avatar3 from '../../../images/users-user-3.jpg';
import avatar4 from '../../../images/users-user-4.jpg';
import avatar5 from '../../../images/users-user-5.jpg';
import avatar6 from '../../../images/users-user-6.jpg';
import avatar7 from '../../../images/users-user-7.jpg';
import avatar8 from '../../../images/users-user-8.jpg';
import avatar9 from '../../../images/users-user-9.jpg';
import avatar10 from '../../../images/users-user-10.jpg';


export default class DashboardTable extends Component{
    constructor(context){
        super()
        // this.state = {
        //     username: '',
        //     email: '',
        //     password: '',
        //     loginError: ''
        // }
    }
    
    getTableData() {
        return [
            {
                id: 1,
                name: 'App design and development',
                startDate: 'Jan 03, 2015',
                dueDate: 'Oct 12, 2018',
                teamMembers: [
                    {
                        image: avatar1,
                        name: 'Mat Helme',
                    },
                    {
                        image: avatar2,
                        name: 'Michael Zenaty',
                    },
                    {
                        image: avatar3,
                        name: 'James Anderson',
                    },
                    {
                        image: avatar5,
                        name: 'Username',
                    },
                ],
                status: 'Work in Progress',
                clients: 'Halette Boivin',
            },
            {
                id: 2,
                name: 'Coffee detail page - Main Page',
                startDate: 'Sep 21, 2016',
                dueDate: 'May 05, 2018',
                teamMembers: [
                    {
                        image: avatar3,
                        name: 'Mat Helme',
                    },
                    {
                        image: avatar4,
                        name: 'Michael Zenaty',
                    },
                    {
                        image: avatar5,
                        name: 'Username',
                    },
                ],
                status: 'Pending',
                clients: 'Durandana Jolicoeur',
            },
            {
                id: 3,
                name: 'Poster illustation design',
                startDate: 'Mar 08, 2018',
                dueDate: 'Sep 22, 2018',
                teamMembers: [
                    {
                        image: avatar2,
                        name: 'Mat Helme',
                    },
                    {
                        image: avatar6,
                        name: 'Michael Zenaty',
                    },
                    {
                        image: avatar7,
                        name: 'Username',
                    },
                ],
                status: 'Completed',
                clients: 'Lucas Sabourin',
            },
            {
                id: 4,
                name: 'Drinking bottle graphics',
                startDate: 'Oct 10, 2017',
                dueDate: 'May 07, 2018',
                teamMembers: [
                    {
                        image: avatar9,
                        name: 'Mat Helme',
                    },
                    {
                        image: avatar10,
                        name: 'Michael Zenaty',
                    },
                    {
                        image: avatar1,
                        name: 'Username',
                    },
                ],
                status: 'Work in Progress',
                clients: 'Donatien Brunelle',
            },
            {
                id: 5,
                name: 'Landing page design - Home',
                startDate: 'Coming Soon',
                dueDate: 'May 25, 2021',
                teamMembers: [
                    {
                        image: avatar5,
                        name: 'Mat Helme',
                    },
                    {
                        image: avatar8,
                        name: 'Michael Zenaty',
                    },
                    {
                        image: avatar2,
                        name: 'James Anderson',
                    },
                    {
                        image: avatar7,
                        name: 'Username',
                    },
                ],
                status: 'Coming Soon',
                clients: 'Karel Auberjo',
            },
        ];
    }


    render() {
        const projectsDetails = this.getTableData()

        return (
            // <!-- start data table card -->
            <>
                <BasicPortlet cardTitle="Jobseekers Recently Applied" titleClass="header-title">
                    <div className="table-responsive">
                        <table className="table table-centered table-nowrap table-borderless mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Jobseeker Name</th>
                                    <th>Email</th>
                                    <th>Contact No.</th>
                                    <th>Applied For</th>
                                    {/* <th>Status</th>
                                    <th>Clients</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {(projectsDetails || []).map((project, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{project.name}</td>
                                            <td>{project.startDate}</td>
                                            <td>{project.dueDate}</td>
                                            <td>
                                                <div className="avatar-group">
                                                    {(project.teamMembers || []).map((item, index) => {
                                                        return (
                                                            <OverlayTrigger
                                                                key={index}
                                                                placement="top"
                                                                overlay={<Tooltip id={item.name}>{item.name}</Tooltip>}
                                                            >
                                                                <Link to="#" className="avatar-group-item">
                                                                    <img
                                                                        src={item.image}
                                                                        className="rounded-circle avatar-xs"
                                                                        alt="friend"
                                                                    />
                                                                </Link>
                                                            </OverlayTrigger>
                                                        );
                                                    })}
                                                </div>
                                            </td>
                                            <td>
                                                <span
                                                    className={classNames('badge bg-soft-info text-info p-1', {
                                                        'bg-soft-info text-info': project.status === 'Work in Progress',
                                                        'bg-soft-warning text-warning': project.status === 'Pending',
                                                        'bg-soft-success text-success': project.status === 'Completed',
                                                        'bg-soft-dark text-dark': project.status === 'Coming Soon',
                                                    })}
                                                >
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td>{project.clients}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </BasicPortlet>
            </>
            // <!-- end data table card --> 
        );
    }

}