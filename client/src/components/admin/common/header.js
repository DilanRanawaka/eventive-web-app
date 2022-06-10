import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Container,
  NavDropdown,
  Navbar,
  Nav,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Notiflix from "notiflix";
import axios from "axios";
import getUrl from "../../../utils/routes";
import logo from "../../../assets/images/Eventive.png";

const Header = () => {
  const [cartFullTotal, setCartFullTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [list, setList] = useState([]);

  const doLogout = () => {
    Swal.fire({
      title: "Are you sure to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location = "/";
      }
    });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const getUserData = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    Notiflix.Loading.standard("Loading Products");
    let resp = await axios.post(getUrl("ActiveListProduct"));
    setList(resp.data);
    Notiflix.Loading.remove();
  };

  const handleCartModalClose = () => {
    setShowCartModal(false);
  };
  const handleCheckout = () => {
    handleCartModalClose();
    setShowPaymentModal(true);
  };
  const handleCheckoutClose = () => {
    setShowPaymentModal(false);
  };

  var cartTotal = 0.0;

  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Container>
        <Navbar.Brand href="/home">
          {" "}
          <img src={logo} alt="eventive logo" /> &nbsp;
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {getUserData().usertype === 3 && (
              <Nav.Link href="/packages">Packages</Nav.Link>
            )}
            {getUserData().usertype === 3 && (
              <Nav.Link href="/eventslist">Events</Nav.Link>
            )}

            {getUserData().usertype === 3 && (
              <Nav.Link href="/admin/orders">Appointments</Nav.Link>
            )}

            <Nav.Link href="/admin/advisors">Contact Us</Nav.Link>

            {(getUserData().usertype === 1 || getUserData().usertype === 2) && (
              <NavDropdown title="Actions" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/categories">
                  Categories
                </NavDropdown.Item>
                <NavDropdown.Item href="/newpackages">
                  Packages
                </NavDropdown.Item>
                <NavDropdown.Item href="/events">Events</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="/admin/appointments">
                  My appointments
                </NavDropdown.Item>

                {getUserData().usertype === 1 && <NavDropdown.Divider />}
                {getUserData().usertype === 1 && (
                  <NavDropdown.Item href="/users">Users</NavDropdown.Item>
                )}
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            {getUserData().usertype === 3 && (
              <Nav.Link
                onClick={() => {
                  cartTotal = 0.0;

                  JSON.parse(localStorage.getItem("cart")).forEach(function (
                    ele
                  ) {
                    cartTotal += Number(ele.cart_qty * ele.price);
                  });

                  console.log(cartTotal);
                  setCartFullTotal(cartTotal);

                  setShowCartModal(true);
                }}
              >
                Cart
              </Nav.Link>
            )}

            <NavDropdown
              title={getUserData().name}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item onClick={doLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Modal show={showCartModal} onHide={handleCartModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell align="center">Package Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.length === 0 && (
                  <TableRow className="text-center">
                    <TableCell className="text-danger" colSpan={5}>
                      Empty Cart
                    </TableCell>
                  </TableRow>
                )}
                {JSON.parse(localStorage.getItem("cart")).map((item, index) => (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{item.name}</TableCell>
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
          <Button variant="secondary" onClick={handleCartModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCheckout}>
            Checkout ({cartFullTotal})
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPaymentModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>One Last Step</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form className="text-start" onSubmit={handleEnrollment}> */}
          <Form.Group className="mb-3" controlId="startdatetimeGroup">
            <Form.Label>Event Date & Time</Form.Label>
            <Form.Control
              // onChange={handleChange}
              required
              name="startdatetime"
              // value={data.startdatetime}
              type="datetime-local"
              placeholder="Enter event date and time"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="eventvenue">
            <Form.Label>Venue/Event Location</Form.Label>
            <Form.Control
              // onChange={handleChange}
              required
              name="title"
              // value={data.title}
              type="text"
              placeholder="Enter event location"
            />
          </Form.Group>
          {/* <Form/> */}
          <Box sx={{ display: "flex" }} className="pt-2 justify-content-center">
            <CircularProgress />
          </Box>
          <h6
            sx={{ display: "flex" }}
            className="py-4 d-flex justify-content-center"
          >
            PLEASE PAY THE AMMOUNT TO MAKE APPOINTMENT
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCheckoutClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              handleCheckoutClose();

              Notiflix.Loading.standard("Payment Processing");

              window.open(
                "https://buy.stripe.com/test_bIYeWK5inb863U4aEE",
                "_blank"
              );

              await axios.post(getUrl("addOrder"), {
                cart: localStorage.getItem("cart"),
                user: getUserData().id,
                total: cartFullTotal,
              });
              localStorage.setItem("cart", JSON.stringify([]));
              Notiflix.Loading.remove();
              getList();
            }}
          >
            Proceed to Pay
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Header;
