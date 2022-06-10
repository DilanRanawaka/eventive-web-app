import { useState, useEffect, React } from "react";
import Header from "./common/header";
import Notiflix from "notiflix";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";

import getUrl from "../../utils/routes";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Appointments = () => {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);

  const getUserData = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const getList = async () => {
    Notiflix.Loading.standard("Loading Appointments");

    let isadmin = 2;

    if (getUserData().usertype === 1 || getUserData.usertype === 2) {
      isadmin = 1;
    }

    let resp = await axios.post(getUrl("orderList"), {
      isadmin: isadmin,
      user: getUserData().id,
    });

    setList(resp.data);
    Notiflix.Loading.remove();
  };

  useEffect(() => {
    getList();
  }, []);

  const handleGet = async (record) => {
    setProducts(JSON.parse(record.products));
    setShow(true);
  };
  const handleClose = (record) => {
    setShow(false);
  };

  return (
    <>
      <Header />
      <Container fluid>
        <Row className="justify-content-center mt-5">
          <Col
            md={9}
            sm={12}
            className="shadow-sm text-primary mt-5 p-4 rounded"
          >
            <h6 className="text-primary pb-4">Appointments</h6>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Reference</TableCell>
                    <TableCell>Name/NIC</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((item, index) => (
                    <TableRow
                      key={item.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{item.ref}</TableCell>
                      <TableCell>User / 990980934V</TableCell>
                      <TableCell align="right">{item.total}</TableCell>
                      <TableCell align="center">
                        {" "}
                        <Button
                          className="mx-1"
                          variant="primary"
                          size="sm"
                          onClick={() => handleGet(item)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Package</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((item, index) => (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="center">{item.cart_qty}</TableCell>
                    <TableCell align="right">
                      {item.price * item.cart_qty}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Appointments;
