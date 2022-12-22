import React, {Component} from "react"
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { PropTypes as PT} from "prop-types"
import axios from "axios";
import { format } from "date-fns";

import { API_URL } from 'utils/constants';
// import AuthService from "services/AuthService"

import DataTable from "components/Table/DataTable";
import PaginationNew from "components/Pagination/PaginationNew";
// import AddFramework from "./AddFramework";


export default class UserListPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            show: false,
            users: [],
            links:[],
            total_rec: '',
            selected_page: 1,
            total_pages: 1
        }
        this.onOpenModal = this.onOpenModal.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }
    
    componentDidMount(){
        this.getUsers()
    }

    componentDidUpdate(prevProps){
        if(this.props.newClient !== prevProps.newClient){
            this.getClients()
        }
    }
    
    onCloseModal(){
        this.setState({show: false})
    }

    onOpenModal(){
        console.log("Opening Model")
        this.setState({show: true})
    }

    onSubmit(){
        this.onCloseModal();
    }

    selectRecord(rec,e){
        e.preventDefault()
        const target_title = e.target.title 
        if(target_title === 'View'){
            this.props.onView(rec.original)
        }
        if(target_title === 'Edit'){
            this.props.onEdit(rec.original)
        }
        if(target_title === 'Delete'){
            this.props.onDelete(rec.original)
            this.props.displayAlert({
                show: true,
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28bb4b',
                cancelButtonColor: '#f34e4e',
                confirmButtonText: 'Yes, delete it!',
                
            })
        }
    }

    /* name column render */
    NameColumn({row}){
        return (
            <div className="table-user">
                <img src={row.original.avatar} alt="" className="me-2 rounded-circle" />
                <Link to="#" className="text-body fw-semibold">
                    {row.original.name}
                </Link>
            </div>
        );
    };

    /* status column render */
    StatusColumn({row}){
        return (
            <React.Fragment>
                <span
                    className={classNames('badge', {
                        'bg-soft-success text-success': row.original.client_status === 'Active',
                        'bg-soft-danger text-danger': row.original.client_status === 'Blocked',
                    })}
                >
                    {row.original.client_status}
                </span>
            </React.Fragment>
        );
    };

    /* action column render */
    ActionColumn = () => {
        return (
            <React.Fragment>
                <Link to="#" className="action-icon">
                    {' '}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link to="#" className="action-icon">
                    {' '}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link to="#" className="action-icon">
                    {' '}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        );
    };
    
    getUsers(page_number = 1){
        const uri = API_URL+'/users/getUsers';
        const method  = 'post'
        let userPayload = {
            Token: localStorage.getItem('token')
        };
        axios({method: method, url:uri,  data: userPayload })
            .then(res =>{
                const users = res.data;
                // const links = res.data
                // const recordCount = res.data.total
                // const total_pages = res.data.last_page
                this.setState({users: users});
                // this.setState({links: links});
                // this.setState({total_rec: recordCount});
                // this.setState({total_pages:total_pages})
            })
    }

    getColumns(){
        return [
            {
                Header: 'S.No.',
                accessor: 'uid',
                sort: true,
                classes: 'table-user',
            },
            
            {
                Header: 'Name',
                accessor: 'name',
                sort: false,
            },
            {
                Header: 'Username',
                accessor: 'username',
                sort: false,
            },
            {
                Header: 'Role',
                accessor: 'role_title',
                sort: false,
            },
            
            {
                Header: 'Action',
                accessor: 'action',
                sort: false,
                classes: 'table-action',
                Cell: ({row}) => (            <React.Fragment>
                    <Link to="#" className="action-icon" title="View" onClick={(e) => this.selectRecord(row,e)}>
                        {' '}
                        <i className="mdi mdi-eye" title="View"></i>
                    </Link>
                    <Link to="#" className="action-icon" title="Edit" onClick={(e) => this.selectRecord(row,e)}>
                        {' '}
                        <i className="mdi mdi-square-edit-outline" title="Edit"></i>
                    </Link>
                    <Link to="#" className="action-icon" title="Delete" onClick={(e) => this.selectRecord(row,e)}>
                        {' '}
                        <i className="mdi mdi-delete" title="Delete"></i>
                    </Link>
                </React.Fragment>),
            },
        ];
    }

    handlePageChange(page_number){
        this.setState({selected_page: page_number})
        this.getClients(page_number)
    }

    render() {
        const columns = this.getColumns()
        const users = this.state.users //this.getFrameworks()

        return (
            // <!-- start page content here -->
            <Card>
                <Card.Body>
                    <Row className="mb-2">
                        <Col sm={4}>
                            {/* <Button variant="danger" className="waves-effect waves-light" onClick={this.onOpenModal}>
                                <i className="mdi mdi-plus-circle me-1"></i> Add Customers
                            </Button> */}
                        </Col>

                        <Col sm={8}>
                            <div className="text-sm-end mt-2 mt-sm-0">
                                {/* <Button className="btn btn-success mb-2 me-1">
                                    <i className="mdi mdi-cog"></i>
                                </Button>

                                <Button className="btn btn-light mb-2 me-1">Import</Button>

                                <Button className="btn btn-light mb-2">Export</Button> */}
                            </div>
                        </Col>
                    </Row>

                    <DataTable
                        columns={columns}
                        data={users}
                        pageSize={10}
                        isSortable={true}
                        pagination={true}
                        isSelectable={true}
                        tableClass="table-nowrap table-striped"
                    />
                </Card.Body>
                {/* add customer modal */}
                {/* <AddFramework show={this.state.show} onHide={this.onCloseModal} onSubmit={this.onSubmit} /> */}
                {this.state.total_pages > 1 && <PaginationNew paginationLinks={this.state.links} pageChange={this.handlePageChange}
                    pageIndex={this.state.selected_page} pageCount={this.state.total_pages} /> }
            </Card>
            
            // <!-- end page content here --> 
        );
    }

}