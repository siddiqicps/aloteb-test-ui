import React, { useRef, useEffect, forwardRef, useState } from 'react';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
    useExpanded,
} from 'react-table';
import classNames from 'classnames';
import { Button, Spinner } from 'react-bootstrap';

// components
import Pagination from '../Pagination/Pagination';

// interface GlobalFilterProps {
//     preGlobalFilteredRows: any;
//     globalFilter: any;
//     setGlobalFilter: any;
//     searchBoxClass: any;
// }

// Define a default UI for filtering
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass, handleFilter }) => {
    const count = preGlobalFilteredRows.length;
    // const [value, setValue] = useState(globalFilter);
    const [name, setName] = useState(globalFilter);
    const [phone, setPhone] = useState(globalFilter);
    const [email, setEmail] = useState(globalFilter);
    const [post, setPost] = useState(globalFilter);
    // const onChange = useAsyncDebounce((value) => {
    //     setGlobalFilter(value || undefined);
    // }, 200);

    function filterResults(){
        let filter = ''
        if(name && name != ''){
            filter += '&name='+name
        }
        if(phone && phone != ''){
            filter += '&phone='+phone
        }
        if(email && email != ''){
            filter += '&email='+email
        }
        if(post && post != ''){
            filter += '&post='+post
        }
        handleFilter(filter)
    }

    return (
        <div className={classNames(searchBoxClass)}>
            <span className="d-flex align-items-center">
                Search :{' '}
                <input
                    type="search"
                    value={name || ''}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    // placeholder={`${count} records...`}
                    placeholder={`Name`}
                    className="form-control w-auto ms-1"
                />
                <input
                    type="search"
                    value={phone || ''}
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                    // placeholder={`${count} records...`}
                    placeholder={`Contact No.`}
                    className="form-control w-auto ms-1"
                />
                <input
                    type="search"
                    value={email || ''}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    // placeholder={`${count} records...`}
                    placeholder={`Email`}
                    className="form-control w-auto ms-1"
                />
                <input
                    type="search"
                    value={post || ''}
                    onChange={(e) => {
                        setPost(e.target.value);
                    }}
                    // placeholder={`${count} records...`}
                    placeholder={`Job Title`}
                    className="form-control w-auto ms-1"
                />
                <Button variant="primary" className="waves-effect waves-light" onClick={filterResults} style={{marginLeft:'20px'}}>
                    Filter
                </Button>
            </span>
        </div>
    );
};

// interface IndeterminateCheckboxProps {
//     indeterminate: any;
//     children?: React.ReactNode;
// }

const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = useRef();
        const resolvedRef = ref || defaultRef;

        useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                    <label htmlFor="form-check-input" className="form-check-label"></label>
                </div>
            </>
        );
    }
);

// interface TableProps {
//     isSearchable?: boolean;
//     isSortable?: boolean;
//     pagination?: boolean;
//     isSelectable?: boolean;
//     isExpandable?: boolean;
//     sizePerPageList?: {
//         text: string;
//         value: number;
//     }[];
//     columns: {
//         Header: string;
//         accessor: string;
//         sort?: boolean;
//         Cell?: any;
//         className?: string;
//     }[];
//     data: any[];
//     pageSize?: any;
//     searchBoxClass?: string;
//     tableClass?: string;
//     theadClass?: string;
// }

const DataTable = (props) => {
    const isSearchable = props['isSearchable'] || false;
    const isSortable = props['isSortable'] || false;
    const pagination = props['pagination'] || false;
    const isSelectable = props['isSelectable'] || false;
    const isExpandable = props['isExpandable'] || false;
    const sizePerPageList = props['sizePerPageList'] || [];

    let otherProps = {};

    if (isSearchable) {
        otherProps['useGlobalFilter'] = useGlobalFilter;
    }
    if (isSortable) {
        otherProps['useSortBy'] = useSortBy;
    }
    if (isExpandable) {
        otherProps['useExpanded'] = useExpanded;
    }
    if (pagination) {
        otherProps['usePagination'] = usePagination;
    }
    if (isSelectable) {
        otherProps['useRowSelect'] = useRowSelect;
    }

    const dataTable = useTable(
        {
            columns: props['columns'],
            data: props['data'],
            initialState: { pageSize: props['pageSize'] || 10 },
        },
        otherProps.hasOwnProperty('useGlobalFilter') && otherProps['useGlobalFilter'],
        otherProps.hasOwnProperty('useSortBy') && otherProps['useSortBy'],
        otherProps.hasOwnProperty('useExpanded') && otherProps['useExpanded'],
        otherProps.hasOwnProperty('usePagination') && otherProps['usePagination'],
        otherProps.hasOwnProperty('useRowSelect') && otherProps['useRowSelect'],
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);

            isExpandable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        // Build our expander column
                        id: 'expander', // Make sure it has an ID
                        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                            <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '-' : '+'}</span>
                        ),
                        Cell: ({ row }) =>
                            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
                            // to build the toggle for expanding a row
                            row.canExpand ? (
                                <span
                                    {...row.getToggleRowExpandedProps({
                                        style: {
                                            // We can even use the row.depth property
                                            // and paddingLeft to indicate the depth
                                            // of the row
                                            paddingLeft: `${row.depth * 2}rem`,
                                        },
                                    })}
                                >
                                    {row.isExpanded ? '-' : '+'}
                                </span>
                            ) : null,
                    },
                    ...columns,
                ]);
        }
    );

    let rows = pagination ? dataTable.page : dataTable.rows;
    let loader = dataTable.data.length > 0 ? false : true;
    return (
        <>
            {isSearchable && (
                <GlobalFilter
                    preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
                    globalFilter={dataTable.state.globalFilter}
                    setGlobalFilter={dataTable.setGlobalFilter}
                    searchBoxClass={props['searchBoxClass']}
                    handleFilter = {props['handleFilter']}
                />
            )}

            <div className="table-responsive">
                <table
                    {...dataTable.getTableProps()}
                    className={classNames('table table-centered react-table', props['tableClass'])}
                >
                    <thead className={props['theadClass']}>
                        {(dataTable.headerGroups || []).map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {(headerGroup.headers || []).map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}
                                        className={classNames({
                                            sorting_desc: column.isSortedDesc === true,
                                            sorting_asc: column.isSortedDesc === false,
                                            sortable: column.sort === true,
                                        })}
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...dataTable.getTableBodyProps()}>
                        {(rows || []).map((row, i) => {
                            dataTable.prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {(row.cells || []).map((cell) => {
                                        return (
                                            <td
                                                {...cell.getCellProps([
                                                    {
                                                        className: cell.column.className,
                                                    },
                                                    {
                                                        style: cell.column.style
                                                    }
                                                ])}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                        
                    </tbody>
                </table>
                {/* <div className="d-flex justify-content-center">
                    <strong>Loading...</strong>
                    <Spinner animation="grow" variant="primary"/>;
                </div> */}
            </div>
            {/* {pagination && <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} />} */}
        </>
    );
};

export default DataTable;
