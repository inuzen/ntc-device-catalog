import React, { useState } from 'react';
import { useTable, usePagination, Row, TableInstance } from 'react-table';

// components
import Fade from '@material-ui/core/Fade';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination } from '@material-ui/core/';
import ConfirmDeleteDialog from '../layout/ConfirmDeleteDialog';

// icons
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';

// utils
import { mapDevicesToTableData } from './mapTableData';

// store
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
    setCurrentDeviceFromState,
    getSingleDevice,
    getDeviceList,
    getAllDevices,
    getTotalDeviceCount,
    deleteDevice,
} from '../../store/deviceSlice';
import { isEditingAllowed, setEditMode, openViewModal } from '../../store/layoutSlice';
import { IMAGE_PATH_PREFIX } from '../../api/api';

// styles
import './tableStyles.scss';

// types
// import type { Device } from '../../store/deviceSlice';
import type { TableDataPropItem } from './mapTableData';

const TableContainer = () => {
    const allowEditing = useAppSelector(isEditingAllowed);
    const deviceCount = useAppSelector(getTotalDeviceCount);
    const deviceList = useAppSelector(getDeviceList);
    const [deleteID, setDeleteID] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const data = React.useMemo(() => mapDevicesToTableData(deviceList), [deviceList]);
    const columns = React.useMemo(
        () => [
            {
                Header: 'Изображение',
                accessor: 'imagePath' as const, // accessor is the "key" in the data
                Cell: ({ value }) => {
                    const imagePath = value || 'no-image.png';
                    return (
                        <div className="image-container">
                            <img src={`${IMAGE_PATH_PREFIX}/${imagePath}`} className="img" />
                        </div>
                    );
                },
            },
            {
                Header: 'Название',
                accessor: 'name' as const,
            },
            {
                Header: 'Сокращение',
                accessor: 'shortName' as const,
            },
            {
                Header: 'Описание',
                accessor: 'description' as const,
            },
            {
                Header: 'Краткое инфо',
                accessor: 'data' as const,
                Cell: ({ value }) => {
                    if (!value?.additionalInfo) return null;

                    const extraInfo = JSON.parse(value.additionalInfo);
                    const showCaseFields = extraInfo.filter((value) => value.showcase);
                    return (
                        <div>
                            {showCaseFields.map((field) => (
                                <p>{`${field.name}: ${field.value}`}</p>
                            ))}
                        </div>
                    );
                },
            },
            {
                Header: '',
                id: 'actions',
                Cell: ({ row }) => {
                    const onAddModClick = (e) => {
                        e.stopPropagation();
                        dispatch(setCurrentDeviceFromState(row.original.id));
                        dispatch(setEditMode('mod'));
                    };

                    const onEditClick = (e) => {
                        e.stopPropagation();
                        dispatch(setCurrentDeviceFromState(row.original.id));
                        dispatch(setEditMode('edit'));
                    };

                    const onDeleteClick = (e) => {
                        e.stopPropagation();
                        setDeleteID(row.original.id);
                    };

                    return (
                        <Fade in={allowEditing}>
                            <div className="actions-column">
                                <IconButton aria-label="add-modification" onClick={onAddModClick}>
                                    <AddBoxIcon color="primary" />
                                </IconButton>
                                <IconButton aria-label="edit-item" onClick={onEditClick}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton aria-label="delete-item" onClick={onDeleteClick}>
                                    <DeleteForever color="primary" />
                                </IconButton>
                            </div>
                        </Fade>
                    );
                },
            },
        ],

        [allowEditing],
    );

    const tableInstance = useTable({ columns, data }, usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        //rows,
        prepareRow,
        page,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = tableInstance as TableInstance<TableDataPropItem>;

    const handleChangePage = (event, newPage) => {
        gotoPage(newPage);
    };
    // TODO: do the loading indicator and just load everything always.
    const handleChangeRowsPerPage = (event) => {
        const rowsPerPage = Number(event.target.value);
        // dispatch(getAllDevices({ limit: rowsPerPage, offset: 0 }));
        setPageSize(rowsPerPage);
    };

    const onDeleteDialogClose = () => {
        setDeleteID(null);
    };
    const onDeleteDialogConfirm = () => {
        dispatch(deleteDevice(deleteID));
        setDeleteID(null);
    };

    return (
        <div>
            <CssBaseline />
            <Table {...getTableProps()}>
                <TableHead>
                    {
                        // Loop over the header rows
                        headerGroups.map((headerGroup) => (
                            // Apply the header row props
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {
                                    // Loop over the headers in each row
                                    headerGroup.headers.map((column) => (
                                        // Apply the header cell props
                                        <TableCell {...column.getHeaderProps()}>
                                            {
                                                // Render the header
                                                column.render('Header')
                                            }
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableHead>
                {/* Apply the table body props */}
                <TableBody {...getTableBodyProps()}>
                    {
                        // Loop over the table rows
                        page.map((row) => {
                            // Prepare the row for display
                            prepareRow(row);
                            return (
                                // Apply the row props
                                <TableRow
                                    {...row.getRowProps()}
                                    onClick={() => {
                                        dispatch(getSingleDevice(row.original.id));
                                        dispatch(openViewModal());
                                    }}
                                >
                                    {
                                        // Loop over the rows cells
                                        row.cells.map((cell) => {
                                            // Apply the cell props
                                            return (
                                                <TableCell {...cell.getCellProps()}>
                                                    {
                                                        // Render the cell contents
                                                        cell.render('Cell')
                                                    }
                                                </TableCell>
                                            );
                                        })
                                    }
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[1, 5, 10, 25, { label: 'All', value: data.length }]}
                            // colSpan={3}
                            count={deviceCount}
                            rowsPerPage={pageSize}
                            page={pageIndex}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
            <ConfirmDeleteDialog
                deleteID={deleteID}
                handleClose={onDeleteDialogClose}
                handleConfirm={onDeleteDialogConfirm}
            />
        </div>
    );
};

export default TableContainer;
