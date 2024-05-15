import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ListPackage() {

  return (
    <DefaultLayout>

      <TableContainer component={Paper} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white' }}>Description</TableCell>
              <TableCell style={{ color: 'white' }} align="center">Name</TableCell>
              <TableCell style={{ color: 'white' }} align="center">Price</TableCell>
              <TableCell style={{ color: 'white' }} align="center">Amazon</TableCell>
              <TableCell style={{ color: 'white' }} align="center">CSV</TableCell>
              <TableCell style={{ color: 'white' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {DATA.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{ color: 'white', maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {row.dsc}
                </TableCell>
                <TableCell align="center" style={{ color: 'white' }}>{row.name}</TableCell>
                <TableCell align="center" style={{ color: 'white' }}>{row.price}</TableCell>
                <TableCell align="center" style={{ color: 'white' }}>{row.amazon_imp_no}</TableCell>
                <TableCell align="center" style={{ color: 'white' }}>{row.csv ? row.csv : '-'}</TableCell>
                <TableCell align="center" style={{ color: 'white' }}>
                  <Link 
                  // to={`/editpackage/${row}`} 
                  style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#3F51B5', padding: '5px 15px 5px 15px' , borderRadius: '3px'}}>Edit</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </DefaultLayout>
  );
}

export default ListPackage;

const DATA = [
  {
    name: 'scasdc',
    dsc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    price: 9999,
    amazon_imp_no: 99,
    csv: 99,
  },
  {
    name: 'scasdc',
    dsc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    price: 9999,
    amazon_imp_no: 99,
    csv: 99,
  },
  {
    name: 'scasdc',
    dsc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    price: 9999,
    amazon_imp_no: 99,
    csv: 99,
  },
  {
    name: 'scasdc',
    dsc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    price: 9999,
    amazon_imp_no: 99,
    csv: 99,
  },
  {
    name: 'scasdc',
    dsc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    price: 9999,
    amazon_imp_no: 99,
    csv: 99,
  },
];
