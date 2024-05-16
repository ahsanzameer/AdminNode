import React, { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import { Link, useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton } from '@mui/material';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ViewPackageModal from '../../components/Modals/ViewPackageModal';
import EditPackageModal from '../../components/Modals/EditPackageModal';


function ListPackage() {
  // const history = useHistory()
  const navigate=useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [data, setData] = useState(null);
  const [open2, setOpen2] = useState(false);

  const [open3, setOpen3] = useState(false);
  const handleClose3 = () => setOpen3(false);

  const [open4, setOpen4] = useState(false);
  const handleClose4 = () => setOpen4(false);

  const handleClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setData(rowData)
  };
  const handleClose = (type, emnt) => {
    if (type == 'edit') {
      setOpen4(true)
    //  navigate('/editpackage');
    } else if (type == 'delete') {
      setOpen2(true);
    } else if (type == 'detail') {
      setOpen3(true);
    }
    setAnchorEl(null);
  };


  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <DefaultLayout>
      <TableContainer component={Paper} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                className="text-title-md font-bold text-black dark:text-white"
              >Description</TableCell>
              <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">Name</TableCell>
              <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">Price</TableCell>
              <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">Amazon</TableCell>
              <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">CSV</TableCell>
              <TableCell className="text-title-md font-bold text-black dark:text-white" align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {DATA.map((row,index) => {
              return(
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  className="text-title-md font-bold text-black dark:text-white"
                  component="th" scope="row" style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {row.dsc}
                </TableCell>
                <TableCell align="center" className="text-title-md font-bold text-black dark:text-white">{row.name}</TableCell>
                <TableCell align="center" className="text-title-md font-bold text-black dark:text-white">{row.price}</TableCell>
                <TableCell align="center" className="text-title-md font-bold text-black dark:text-white">{row.amazon_imp_no}</TableCell>
                <TableCell align="center" className="text-title-md font-bold text-black dark:text-white">{row.csv ? row.csv : '-'}</TableCell>
                <TableCell align="center"
                  className="text-title-md font-bold text-black dark:text-white"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Link
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event) => handleClick(event,row)}
                  // onClick={() => (handleClick(), setData(row))}
                  >
                    <PiDotsThreeOutlineVerticalFill style={{ fontSize: 20 }} />
                  </Link>
                </TableCell>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem
                    onClick={() => handleClose('edit', row)}
                    >Edit</MenuItem>
                  <MenuItem
                    onClick={() => handleClose('detail', row)}>View details</MenuItem>
                  <MenuItem
                    onClick={() => handleClose('delete', row)}>Delete</MenuItem>
                </Menu>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>


      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="dark:bg-boxdark-2 dark:text-bodydark">
          {"Delete Package"}
        </DialogTitle>
        <DialogContent className="dark:bg-boxdark-2 dark:text-bodydark">
          <DialogContentText id="alert-dialog-description" className="dark:bg-boxdark-2 dark:text-bodydark">
            Are you sure you want to delete this package?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dark:bg-boxdark-2 dark:text-bodydark">
          <Button onClick={handleClose2}>Yes</Button>
          <Button onClick={handleClose2} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <ViewPackageModal
        data={data}
        open={open3}
        onClose={handleClose3}
      />
      <EditPackageModal
         data={data}
        open={open4}
        onClose={handleClose4}
      />
    </DefaultLayout>
  );
}

export default ListPackage;

const DATA = [
  {
    name: 'Shirts',
    dsc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    price: 353,
    amazon_imp_no: 34,
    csv: null,
    createdAt: '12-02-24'
  },
  {
    name: 'T-shirts',
    dsc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    price: 432,
    amazon_imp_no: 34,
    csv: 8,
    createdAt: '12-02-24'
  },
  {
    name: 'Shorts',
    dsc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    price: 444,
    amazon_imp_no: 453,
    csv: 5,
    createdAt: '12-02-24'
  },
  {
    name: 'Trousers',
    dsc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    price: 122,
    amazon_imp_no: 64,
    csv: 66,
    createdAt: '12-02-24'
  },
  {
    name: 'Astin ka sanp',
    dsc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    price: 44,
    amazon_imp_no: 4,
    csv: 99,
    createdAt: '12-02-24'
  },
];
