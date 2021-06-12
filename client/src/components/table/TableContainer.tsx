import React from 'react';
import { mockTableData } from './mockData';
import { useTable } from 'react-table';
import './tableStyles.scss';

const TableContainer = () => {
    const data = React.useMemo(() => [...mockTableData], []);
    const columns = React.useMemo(
        () => [
            {
                Header: 'Изображение',
                accessor: 'imagePath', // accessor is the "key" in the data
            },
            {
                Header: 'Краткое инфо',
                accessor: 'data',
                Cell: ({ value }) => (
                    <div>
                        <p>{value.name}</p>
                        <p>{value.short_name}</p>
                        <p>{value.supply}</p>
                    </div>
                ),
            },
        ],

        [],
    );

    const tableInstance = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {
                        // Loop over the header rows
                        headerGroups.map((headerGroup) => (
                            // Apply the header row props
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    // Loop over the headers in each row
                                    headerGroup.headers.map((column) => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps()}>
                                            {
                                                // Render the header
                                                column.render('Header')
                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                    {
                        // Loop over the table rows
                        rows.map((row) => {
                            // Prepare the row for display
                            prepareRow(row);
                            return (
                                // Apply the row props
                                <tr {...row.getRowProps()}>
                                    {
                                        // Loop over the rows cells
                                        row.cells.map((cell) => {
                                            // Apply the cell props
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {
                                                        // Render the cell contents
                                                        cell.render('Cell')
                                                    }
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TableContainer;
