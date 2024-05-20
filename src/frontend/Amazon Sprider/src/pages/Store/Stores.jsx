import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import DefaultLayout from "../../layout/DefaultLayout";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell
                    className="text-title-md font-bold text-black dark:text-white"
                >
                    Store name
                </TableCell>
                <TableCell
                    className="text-title-md font-bold text-black dark:text-white"
                    align="center"
                >
                    Products
                </TableCell>
                <TableCell
                    className="text-title-md font-bold text-black dark:text-white"
                    align="center"
                >
                    Package
                </TableCell>
                <TableCell
                    className="text-title-md font-bold text-black dark:text-white"
                    align="center"
                >
                    Actions
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

function Stores() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const visibleRows = useMemo(
        () =>
            stableSort(DATA, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );
    const emptyRows = useMemo(
        () => rowsPerPage - Math.min(rowsPerPage, DATA.length - page * rowsPerPage),
        [DATA.length, page, rowsPerPage],
    );

    return (
        <div className="w-full">
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Stores
                            </h3>
                        </div>
                        {/* <EnhancedTableToolbar /> */}
                        <TableContainer className="rounded-sm  bg-white  dark:border-strokedark dark:bg-boxdark">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <EnhancedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={DATA.length}
                                />
                                <TableBody>
                                    {DATA.map((row, index) => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell
                                                    className="text-title-md font-bold text-black dark:text-white"
                                                    scope="row"
                                                >
                                                    {row.store_name}
                                                </TableCell>
                                                <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">{row.products}</TableCell>
                                                <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">{row.package}</TableCell>
                                                <TableCell
                                                    className="text-title-md font-bold text-black dark:text-white"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}>
                                                    <button
                                                        className="h-8.5 flex justify-center rounded bg-primary dark:bg-white py-2 px-6 font-medium text-white dark:text-black hover:bg-opacity-90"
                                                    >
                                                        View
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* <TablePagination
                            labelRowsPerPage='No of data'
                            className="bg-white dark:border-strokedark dark:bg-boxdark text-title-md font-bold text-black dark:text-white"
                            sx={{
                                boxShadow: 'none',
                                borderWidth: 0,
                            }}
                            rowsPerPageOptions={[7]}
                            component="div"
                            count={DATA.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> */}

                    </div>
                </div>
            </DefaultLayout>
        </div>
    );
}

export default Stores;

const DATA = [
    { id: 1, store_name: 'Shopify.com', products: 12, package: 'Bronze' },
    { id: 2, store_name: 'Shopify.com', products: 12, package: 'Plantinum' },
    { id: 3, store_name: 'Shopify.com', products: 12, package: 'Bronze' },
    { id: 4, store_name: 'Shopify.com', products: 12, package: 'Plantinum' },
    { id: 5, store_name: 'Shopify.com', products: 12, package: 'Bronze' },
    { id: 6, store_name: 'Shopify.com', products: 12, package: 'Plantinum' },
    { id: 7, store_name: 'Shopify.com', products: 12, package: 'Bronze' },
]