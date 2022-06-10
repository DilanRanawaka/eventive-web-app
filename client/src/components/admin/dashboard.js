/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, React } from "react";
import getUrl from "../../utils/routes";
import axios from "axios";
import Notiflix from "notiflix";
import Header from "./common/header";
import { Col, Modal, Container, Row } from "react-bootstrap";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [showCartModal, setShowCartModal] = useState(false);
  // const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [product, setProduct] = useState(null);
  // const [cartFullTotal, setCartFullTotal] = useState(0);

  const getList = async () => {
    Notiflix.Loading.standard("Loading Products");
    let resp = await axios.post(getUrl("ActiveListProduct"));
    setList(resp.data);
    Notiflix.Loading.remove();
  };

  useEffect(() => {
    getList();
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };
  const showProduct = (productRecord) => {
    setShowModal(true);
    setProduct(productRecord);
  };

  const initialData = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    status: 1,
  };

  console.log(initialData);

  const addToCart = (productObj) => {
    let productsCart = JSON.parse(localStorage.getItem("cart"));
    if (productsCart.length > 0) {
      let checkExists = false;
      var eleIndex = 0;
      productsCart.forEach(function (cartItem) {
        if (productObj._id === cartItem._id) {
          if (productObj.quantity > productObj["cart_qty"]) {
            productObj["cart_qty"] = productObj["cart_qty"] + 1;
            productsCart[eleIndex] = productObj;
          }
          checkExists = true;
        }
        eleIndex++;
      });

      if (checkExists === false) {
        productObj["cart_qty"] = 1;
        productsCart.push(productObj);
      }
    } else {
      productObj["cart_qty"] = 1;
      productsCart.push(productObj);
    }
    localStorage.setItem("cart", JSON.stringify(productsCart));

    console.log(productsCart);
  };
  // const handleCartModalClose = () => {
  //   setShowCartModal(false);
  // };

  // const handleCheckout = () => {
  //   handleCartModalClose();
  //   setShowPaymentModal(true);
  // };

  // const handleCheckoutClose = () => {
  //   setShowPaymentModal(false);
  // };

  // const getUserData = () => {
  //   return JSON.parse(localStorage.getItem("user"));
  // };

  // var cartTotal = 0.0;

  return (
    <>
      <Header></Header>
      <Container fluid>
        <h3 className="text-dark  mt-5 mb-2 ml-5">Event Packages</h3>
        <h5 className="text-dark  ml-5 ">
          Selct your event packages from here and appoint us in few steps
        </h5>

        <Row className="justify-content-center mt-5">
          <Col md={12}></Col>
          {list.map((item, index) => (
            <Col
              md={3}
              sm={12}
              className="shadow-sm text-dark mt-2 mb-3 p-4 m-0.5 rounded"
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={require("../../../../server/images/" + item.image)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    LKR {item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      showProduct(item);
                    }}
                    size="large"
                  >
                    VIEW
                  </Button>
                  <Button onClick={() => addToCart(item)} size="large">
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {product && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{product.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              className="w-100 mb-3"
              src={require("../../../../server/images/" + product.image)}
            ></img>

            <p>{product.description}</p>
            <h4 className="text-primary">LKR {product.price}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* <Modal show={showCartModal} onHide={handleCartModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && (
                <tr className="text-center">
                  <td className="text-danger" colSpan={5}>
                    No Data Found
                  </td>
                </tr>
              )}
              {JSON.parse(localStorage.getItem("cart")).map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.cart_qty}</td>
                  <td>{item.price * item.cart_qty}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCartModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCheckout}>
            Checkout ({cartFullTotal})
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* <Modal show={showPaymentModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="ownerNameGroup">
            <Form.Label>Owner Name</Form.Label>
            <Form.Control required type="text" placeholder="Enter owner name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cardNumberGroup">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter card number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cardYearGroup">
            <Form.Label>Year</Form.Label>
            <Form.Control required type="number" placeholder="Enter Year" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cardMonthGroup">
            <Form.Label>Month</Form.Label>
            <Form.Control required type="text" placeholder="Enter month" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cvcGroup">
            <Form.Label>CVC</Form.Label>
            <Form.Control required type="text" placeholder="Enter cvc" />
          </Form.Group>
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
            Pay
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default Dashboard;
