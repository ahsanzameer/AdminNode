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

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';
import { ImSearch } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";


function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="text-title-md font-bold text-black dark:text-white">
          Product name
        </TableCell>
        <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">
          Link
        </TableCell>
        <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">
          Price
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

function StoreDetails() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(DATA.current_page_no);
  const [totalPages, setTotalPages] = useState(DATA.total_pages);
  const [storeData, setStoreData] = useState(DATA.data);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const filteredData = DATA.data.filter(store =>
      store.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setStoreData(filteredData);
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
        <div className="grid grid-cols-1 gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col sm:flex-row justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-bold text-black dark:text-white">Developer Store</h3>
              <h3 className="font-bold text-black dark:text-white">Total Products: {storeData.length}</h3>

              <Paper
                className="bg-white dark:bg-boxdark-2 dark:text-bodydark text-black flex items-center overflow-hidden mt-4 sm:mt-0"
                component="form"
                onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
              >
                {
                  !searchQuery &&
                  <IconButton sx={{ p: '10px' }} aria-label="search">
                    <ImSearch color="gray" size={15} />
                  </IconButton>
                }
                <InputBase
                  style={{
                    margin: searchQuery ? '0 0 0 14px' : '0 0 0 0',
                  }}
                  className="font-bold text-black dark:text-white flex-1"
                  placeholder="Search by name"
                  inputProps={{ 'aria-label': 'search store' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {
                  searchQuery &&
                  <IconButton aria-label="search" onClick={() => (setStoreData(DATA.data), setSearchQuery(''))}>
                    <RxCross2 color="gray" size={15} />
                  </IconButton>
                }
                <button
                  className="flex justify-center items-center  w-15 h-full font-satoshi text-black dark:text-white"
                  type="submit"
                >
                  Search
                </button>
              </Paper>
            </div>
            <TableContainer className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <EnhancedTableHead />
                <TableBody>
                  {storeData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-title-md font-bold text-black dark:text-white">
                        {row.product_name}
                      </TableCell>
                      <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">
                        <a href={row.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          {row.link}
                        </a>
                      </TableCell>
                      <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">
                        {row.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {
                !searchQuery &&
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
              }
            </TableContainer>
          </div>
        </div>
      </DefaultLayout>
    </div>
  )
}

export default StoreDetails
const DATA = {
  data: [
    {
      id: 1,
      product_name: 'Shopify.com',
      price: 12,
      link: 'https://www.google.com/',
    },
    {
      id: 2,
      product_name: 'Shopify.com',
      price: 12,
      link: 'https://www.google.com/',
    },
    {
      id: 3,
      product_name: 'zdfdf.com',
      price: 12,
      link: 'https://www.google.com/',
    },
    {
      id: 4,
      product_name: 'dfs.com',
      price: 12,
      link: 'https://www.google.com/',
    },
    {
      id: 5,
      product_name: 'sssf.com',
      price: 12,
      link: 'https://www.google.com/',
    },
    {
      id: 6,
      product_name: 'sdf.com',
      price: 12,
      link: 'https://www.google.com/',
    },
    {
      id: 7,
      product_name: 'Shsdfsdsdfopify.com',
      price: 12,
      link: 'https://www.google.com/',
    },
  ],
  total_pages: 111,
  current_page_no: 4,
};