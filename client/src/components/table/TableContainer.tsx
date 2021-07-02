import React from 'react';
import { useTable } from 'react-table';

import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import Fade from '@material-ui/core/Fade';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// utils
import { mapDevicesToTableData } from './mapTableData';

// store
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setCurrentDevice } from '../../store/deviceSlice';
import { isEditingAllowed } from '../../store/authSlice';
import { IMAGE_PATH_PREFIX } from '../../api/api';

// styles
import './tableStyles.scss';

// types
import { Device } from '../../store/deviceSlice';

const TableContainer = ({ deviceList }: { deviceList: Device[] }) => {
    const allowEditing = useAppSelector(isEditingAllowed);
    const dispatch = useAppDispatch();
    const data = React.useMemo(() => mapDevicesToTableData(deviceList), [deviceList]);
    const columns = React.useMemo(
        () => [
            {
                Header: 'Изображение',
                accessor: 'imagePath' as const, // accessor is the "key" in the data
                Cell: ({ value }) => {
                    return (
                        <div className="image-container">
                            <img src={`${IMAGE_PATH_PREFIX}/${value}`} className="img" />
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
                Cell: ({ value }) => (
                    <div>
                        <p>{value.additionalInfo}</p>
                    </div>
                ),
            },
            {
                Header: '',
                id: 'actions',
                Cell: ({ value }) => {
                    return (
                        <Fade in={allowEditing}>
                            <div className="actions-column">
                                <IconButton aria-label="add-modification" onClick={() => alert(value.id)}>
                                    <AddBoxIcon color="primary" />
                                </IconButton>
                                <IconButton aria-label="edit-item">
                                    <EditIcon color="primary" />
                                </IconButton>
                            </div>
                        </Fade>
                    );
                },
            },
        ],

        [allowEditing],
    );

    const tableInstance = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

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
                        rows.map((row) => {
                            // Prepare the row for display
                            prepareRow(row);
                            return (
                                // Apply the row props
                                <TableRow
                                    {...row.getRowProps()}
                                    onClick={() => dispatch(setCurrentDevice(row.original.id))}
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
            </Table>
        </div>
    );
};

export default TableContainer;
