import React, {Component} from "react"
import { PropTypes as PT} from "prop-types"
import PieChartCard from "pages/Dashboard/Cards/PieChartCard";
import ColumnChartCard from "pages/Dashboard/Cards/ColumnChartCard";
import LineChartCard from "pages/Dashboard/Cards/LineChartCard";
import DashboardTable from "pages/Dashboard/DashboardTable/DashboardTable";


// import AuthService from "services/AuthService"



export default class DashboardCards extends Component{
    constructor(context){
        super()
        // this.state = {
        //     username: '',
        //     email: '',
        //     password: '',
        //     loginError: ''
        // }
    }


    render() {

        return (
            // <!-- start dashboard cards here -->
            <>
                <div className="row">
                    <div className="col-xl-4 col-md-6">
                        <PieChartCard />
                    </div>
                    <div className="col-xl-8 col-md-6">
                        <ColumnChartCard />
                    </div>
                    {/* <div className="col-xl-4 col-md-12">
                        <LineChartCard />
                    </div> */}
                </div>
                {/* <div className="row">
                    <div className="col-md-12">
                        <DashboardTable />
                    </div>
                </div> */}
            </>
            
            // <!-- end dashboard cards here --> 
        );
    }

}