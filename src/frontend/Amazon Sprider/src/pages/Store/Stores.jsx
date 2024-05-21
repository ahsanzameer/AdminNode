import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import DefaultLayout from "../../layout/DefaultLayout";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useDispatch, useSelector } from "react-redux";


function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell className="text-title-md font-bold text-black dark:text-white">
                    Store name
                </TableCell>
                <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">
                    Products
                </TableCell>
                <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">
                    Package
                </TableCell>
                <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">
                    Actions
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

function Stores() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(DATA.current_page_no);
    const [totalPages, setTotalPages] = useState(DATA.total_pages);
    const [storeData, setStoreData] = useState({});

    useEffect(() => { 
        handleGetSettingApi()
    }, [currentPage]);

    const handleGetSettingApi = async () => {
        try {
          const response = await getSettingApi();
          const { status, message, object } = response.data;

          if (status === 200) {
            dispatch(setSetting(object));
          } else if (message) {
            toast.error(message, { duration: 3000 });
          }
        } catch (error) {
          console.log(error);
          toast.error(error, { duration: 3000 });
        }
      };

    const generatePageNumbers = () => {
        const pageNumbers = [];
        const maxPages = 5; // maximum number of pages to display at a time
        const startPage = Math.max(currentPage - Math.floor(maxPages / 2), 1);
        const endPage = Math.min(startPage + maxPages - 1, totalPages);

        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) {
                pageNumbers.push("...");
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push("...");
            }
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="w-full">
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">Stores</h3>
                        </div>
                        <TableContainer className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <EnhancedTableHead />
                                <TableBody>
                                    {DATA.data.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className="text-title-md font-bold text-black dark:text-white">
                                                {row.store_name}
                                            </TableCell>
                                            <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">
                                                {row.products}
                                            </TableCell>
                                            <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">
                                                {row.package}
                                            </TableCell>
                                            <TableCell
                                                className="text-title-md font-bold text-black dark:text-white"
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <button className="h-8.5 flex justify-center rounded bg-primary dark:bg-white py-2 px-6 font-medium text-white dark:text-black hover:bg-opacity-90">
                                                    View
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="flex justify-end h-12 bg-white dark:border-strokedark dark:bg-boxdark p-2 sm:p-4">
                                <div className="flex items-center space-x-2 sm:space-x-4 bg-white dark:bg-boxdark px-2 sm:px-4 rounded-md overflow-x-auto" style={{ overflowX: 'auto', scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href="#"
                                                    onClick={() => setCurrentPage(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                />
                                            </PaginationItem>
                                            {generatePageNumbers().map((page, index) => (
                                                <PaginationItem key={index} isActive={currentPage === page} onClick={() => typeof page === 'number' && setCurrentPage(page)}>
                                                    <PaginationLink href="#">{page}</PaginationLink>
                                                </PaginationItem>
                                            ))}
                                            <PaginationItem>
                                                <PaginationNext
                                                    href="#"
                                                    onClick={() => setCurrentPage(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            </div>
                        </TableContainer>
                    </div>
                </div>
            </DefaultLayout>
        </div>
    );
}

export default Stores;

const DATA = {
    data: [
        {
            id: 1,
            store_name: 'Shopify.com',
            products: 12,
            package: 'Bronze',
        },
        {
            id: 2,
            store_name: 'Shopify.com',
            products: 12,
            package: 'Plantinum',
        },
        {
            id: 3,
            store_name: 'Shopify.com',
            products: 12,
            package: 'Bronze',
        },
        {
            id: 4,
            store_name: 'Shopify.com',
            products: 12,
            package: 'Plantinum',
        },
        {
            id: 5,
            store_name: 'Shopify.com',
            products: 12,
            package: 'Bronze',
        },
        {
            id: 6,
            store_name: 'Shopify.com',
            products: 12,
            package: 'Plantinum',
        },
        {
            id: 7,
            store_name: 'Shopify.com',
            products: 12,
            package: 'Bronze',
        },
    ],
    total_pages: 111,
    current_page_no: 4,
};
