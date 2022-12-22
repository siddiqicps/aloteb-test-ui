import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"
import Chart from 'react-apexcharts';
import  ApexOptions  from 'apexcharts';
import BasicPortlet from "../BasicPortlet";
import axios from "axios";

import { API_URL } from 'utils/constants';
import { data } from "jquery";
// import Logo from "./Logo";
// import DropDownMenu from "./DropDownMenu";
// import Notification from "./Notification";
// import Welcome from "./Welcome";

// import AuthService from "services/AuthService"

// import LoginForm from "pages/Login/LoginForm/LoginForm"


export default class PieChartCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            token: '',
            total: 0,
            open: 0,
            close: 0
        }

        this.getJobsStats = this.getJobsStats.bind(this)
    }
    
    componentDidMount(){
        this.setState({token: localStorage.getItem('token')})
        this.getJobsStats()
    }

    getJobsStats(){
        let uri = API_URL+'/dashboard-jobs';
        const branch_id = localStorage.getItem('branch');
        if(branch_id && branch_id != null){
            uri += '?branch='+branch_id
        }
        axios.get(uri,{headers:{'Authorization': `Bearer ${this.state.token}`}})
            .then(res =>{
                console.log(res)
                const data = res.data[0]
                this.setState({total: data.posts, open:data.active_posts, close:data.close_posts})
            })
    }

    render() {
        const apexOpts = {
            chart: {
                type: 'donut',
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                formatter: (val) => {
                                    return val;
                                },
                            },
                            value: {
                                show: true,
                                formatter: (val) => {
                                    return val;
                                },
                            },
                        },
                    },
                },
            },
            dataLabels: {
                enabled: false,
            },
            colors: ['#4fc6e1', '#6658dd', '#ebeff2'],
            legend: {
                show: false,
            },
            labels: ['Open Jobs', 'Closed Jobs'],
            tooltip: {
                enabled: false,
            },
        };
    
        const apexData = [this.state.open, this.state.close];

        return (
            // <!-- start pie chart card -->
            <BasicPortlet cardTitle="Jobs Stats" titleClass="header-title">
                <div className="text-center">
                    <div className="row mt-2">
                        <div className="col-4">
                            <h3 data-plugin="counterup">{this.state.total}</h3>
                            <p className="text-muted font-13 mb-0 text-truncate">Total Jobs</p>
                        </div>
                        <div className="col-4">
                            <h3 data-plugin="counterup">{this.state.open}</h3>
                            <p className="text-muted font-13 mb-0 text-truncate">Open Jobs</p>
                        </div>
                        <div className="col-4">
                            <h3 data-plugin="counterup">{this.state.close}</h3>
                            <p className="text-muted font-13 mb-0 text-truncate">Closed Jobs</p>
                        </div>
                    </div> 
                    {/* <!-- end row --> */}

                    <div dir="ltr">
                        <Chart
                            options={apexOpts}
                            series={apexData}
                            type="donut"
                            height={270}
                            className="apex-charts mt-4"
                        />                
                    </div>
                </div>
            </BasicPortlet>     
            // <!-- end pie chart card --> 
        );
    }

}