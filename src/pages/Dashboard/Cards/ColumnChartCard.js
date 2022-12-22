import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"
import Chart from 'react-apexcharts';
import  ApexOptions  from 'apexcharts';
import BasicPortlet from "../BasicPortlet";
import axios from "axios";

import { API_URL } from 'utils/constants';
// import Logo from "./Logo";
// import DropDownMenu from "./DropDownMenu";
// import Notification from "./Notification";
// import Welcome from "./Welcome";

// import AuthService from "services/AuthService"

// import LoginForm from "pages/Login/LoginForm/LoginForm"


export default class ColumnChartCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            token: '',
            clients: [],
            jobs: []
        }
        this.getClients = this.getClients.bind(this)
        this.getJobsByClients = this.getJobsByClients.bind(this)
    }

    componentDidMount(){
        this.setState({token: localStorage.getItem('token')})
        // this.getClients()
        this.getJobsByClients()
    }

    getClients(page_number = 1){
        const uri = API_URL+'/clients?page='+page_number;
        axios.get(uri)
            .then(res =>{
                const clients = res.data.data;
                this.setState({clients: clients});
            })
    }

    getJobsByClients(){
        let uri = API_URL+'/dashboard-clients-jobs';
        const branch_id = localStorage.getItem('branch');
        if(branch_id && branch_id != null){
            uri += '?branch='+branch_id
        }
        axios.get(uri,{headers:{'Authorization': `Bearer ${this.state.token}`}})
            .then(res =>{
                console.log(res)
                const data = res.data
                let clients = [], jobs = [] 
                data.forEach(element => {
                    clients.push(element.client)
                    jobs.push(element.posts)
                });
                this.setState({clients: clients, jobs:jobs})
            })
    }


    render() {
        const apexOpts = {
            chart: {
                type: 'bar',
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: '20%',
                    distributed:true
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: this.state.clients,
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            colors: ['#00acc1','#5588BB','#66BBBB','#99BB55','#EE9944'],
            legend:{
                show: false
            }
        };
    
        const apexData = [
            {
                name: 'Statistics',
                data: this.state.jobs,
            },
        ];

        return (
            // <!-- start pie chart card -->
            <BasicPortlet  cardTitle="Jobs By Top Clients" titleClass="header-title">
                <div className="text-center">
                    <div className="row mt-2">
                        {/* <div className="col-4">
                            <h3 data-plugin="counterup">3,487</h3>
                            <p className="text-muted font-13 mb-0 text-truncate">Total Sales</p>
                        </div>
                        <div className="col-4">
                            <h3 data-plugin="counterup">814</h3>
                            <p className="text-muted font-13 mb-0 text-truncate">Open Campaign</p>
                        </div>
                        <div className="col-4">
                            <h3 data-plugin="counterup">5,324</h3>
                            <p className="text-muted font-13 mb-0 text-truncate">Daily Sales</p>
                        </div> */}
                    </div> 
                    {/* <!-- end row --> */}

                    <div dir="ltr">
                        <Chart
                            options={apexOpts}
                            series={apexData}
                            type="bar"
                            height={273}
                            className="apex-charts mt-2"
                        />                
                    </div>
                </div>
            </BasicPortlet>     
            // <!-- end pie chart card --> 
        );
    }

}