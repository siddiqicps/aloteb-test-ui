import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

class PaginationNew extends Component{
    constructor(props){
        super(props)
        this.state = {
            pageCount: props.pageCount,
            pageIndex: props.pageIndex,
            visiblePages: this.getVisiblePages(null, props.pageCount),
            paginationLinks: props.paginationLinks
        }
        this.filterPages = this.filterPages.bind(this)
        this.getVisiblePages = this.getVisiblePages.bind(this)
        this.changePage = this.changePage.bind(this)
    }

    componentDidMount(){
        this.setState({pageCount: this.props.pageCount, pageIndex: this.props.pageIndex
        , paginationLinks: this.props.paginationLinks})
        const visiblePages = this.getVisiblePages(null, this.state.pageCount);
        this.setState({visiblePages: visiblePages})
    }


    /**
     * get filter pages
     */
    filterPages(visiblePages, totalPages){
        return visiblePages.filter((page) => page <= totalPages)
    }

    /**
     * handle visible pages
     */
    getVisiblePages(page, total){
        // console.log(page,"================",total)
        if (total < 7) {
            return this.filterPages([1, 2, 3, 4, 5, 6], total);
        } else {
            if (page !== null && page % 5 >= 0 && page > 4 && page + 2 < total) {
                return [1, page - 1, page, page + 1, total];
            } else if (page !== null && page % 5 >= 0 && page > 4 && page + 2 >= total) {
                return [1, total - 3, total - 2, total - 1, total];
            } else {
                return [1, 2, 3, 4, 5, total];
            }
        }
    }
    
     /**
     * handle page change
     * @param page - current page
     * @returns
     */
    changePage(page){
        const activePage = this.state.pageIndex;

        if (page === activePage) {
            return;
        }

        const visiblePages = this.getVisiblePages(page, this.state.pageCount);
        this.setState({visiblePages: this.filterPages(visiblePages, this.state.pageCount)});

        this.props.pageChange(page);
    }

    render(){
        const activePage = this.props.pageIndex ;
        return (
            <>
                <div className="d-lg-flex align-items-center text-center pb-1">
                    {/* {this.props.sizePerPageList.length > 0 && (
                        <div className="d-inline-block me-3">
                            <label className="me-1">Display :</label>
                            <select
                                value={this.props.tableProps.state.pageSize}
                                onChange={(e) => {
                                    this.props.tableProps.setPageSize(Number(e.target.value));
                                }}
                                className="form-select d-inline-block w-auto"
                            >
                                {(this.props.sizePerPageList || []).map((pageSize, index) => {
                                    return (
                                        <option key={index} value={pageSize.value}>
                                            {pageSize.text}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    )} */}

                    <span className="me-3">
                        Page{' '}
                        <strong>
                            {this.props.pageIndex } of {this.props.pageCount
                            }
                        </strong>{' '}
                    </span>

                    {/* <span className="d-inline-block align-items-center text-sm-start text-center my-sm-0 my-2">
                        <label className="form-label">Go to page : </label>
                        <input
                            type="number"
                            value={this.state.pageIndex }
                            min="1"
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                this.props.pageChange(page);
                                this.props.tableProps.setPageIndex(this.props.tableProps.state.pageIndex);
                            }}
                            className="form-control w-25 ms-1 d-inline-block"
                        />
                    </span> */}

                    <ul className="pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0">
                        <li
                            key="prevpage"
                            className={classNames('page-item', 'paginate_button', 'previous', {
                                disabled: activePage === 1,
                            })}
                            onClick={() => {
                                if (activePage === 1) return;
                                this.changePage(activePage - 1);
                            }}
                        >
                            <Link to="#" className="page-link">
                                <i className="mdi mdi-chevron-left"></i>
                            </Link>
                        </li>
                        {(this.state.visiblePages || []).map((page, index, array) => {
                            return array[index - 1] + 1 < page ? (
                                <React.Fragment key={page}>
                                    <li className="page-item disabled d-none d-xl-inline-block">
                                        <Link to="#" className="page-link">
                                            ...
                                        </Link>
                                    </li>
                                    <li
                                        className={classNames('page-item', 'd-none', 'd-xl-inline-block', {
                                            active: activePage === page,
                                        })}
                                        onClick={(e) => this.changePage(page)}
                                    >
                                        <Link to="#" className="page-link">
                                            {page}
                                        </Link>
                                    </li>
                                </React.Fragment>
                            ) : (
                                <li
                                    key={page}
                                    className={classNames('page-item', 'd-none', 'd-xl-inline-block', {
                                        active: activePage === page,
                                    })}
                                    onClick={(e) => this.changePage(page)}
                                >
                                    <Link to="#" className="page-link">
                                        {page}
                                    </Link>
                                </li>
                            );
                        })}
                        <li
                            key="nextpage"
                            className={classNames('page-item', 'paginate_button', 'next', {
                                disabled: activePage === this.state.pageCount,
                            })}
                            onClick={() => {
                                if (activePage === this.state.pageCount) return;
                                this.changePage(activePage + 1);
                            }}
                        >
                            <Link to="#" className="page-link">
                                <i className="mdi mdi-chevron-right"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </>
        );
    }

}


export default PaginationNew;