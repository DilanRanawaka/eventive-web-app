import { useState, useEffect, React } from "react";
import Header from "./common/header";
import Notiflix from "notiflix";
import Moment from "moment";
import Swal from "sweetalert2";
import {
  Col,
  Container,
  Row,
  Badge,
  Modal,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import getUrl from "../../utils/routes";
import axios from "axios";

const Events = () => {
  const [list, setList] = useState([]);
  const [showmodal, setShowmodal] = useState(false);
  const [paticipatients, setPaticipatients] = useState([]);

  const handleEnrollment = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      Notiflix.Loading.standard();
      if (isnew === false) {
        data["id"] = recordid;
      }
      await axios.post(
        getUrl(isnew === true ? "addEvent" : "updateEvent"),
        data
      );
      setData(initialData);
      setIsnew(true);
      setError({
        message: "Event Processed Successfully",
        color: "success",
      });
      Notiflix.Loading.remove();
      getList();
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        setError({
          message: error.response.data.message,
          color: "danger",
        });
      }
    }
  };

  const getList = async () => {
    Notiflix.Loading.standard("Loading Events");
    let resp = await axios.post(getUrl("listEvent"));
    setList(resp.data);
    Notiflix.Loading.remove();
  };

  useEffect(() => {
    getList();
  }, []);

  const initialData = {
    title: "",
    description: "",
    startdatetime: "",
    status: 1,
  };

  const [data, setData] = useState(initialData);

  const [isnew, setIsnew] = useState(true);
  const [recordid, setRecordid] = useState(0);

  const [error, setError] = useState({
    message: "",
    color: "success",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleDelete = async (record) => {
    Swal.fire({
      title: "Are you sure to delete this record",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      Notiflix.Loading.standard();
      await axios.post(getUrl("deleteEvent"), { id: record });
      Notiflix.Loading.remove();
      getList();
    });
  };

  const handleGet = async (record) => {
    Swal.fire({
      title: "Are you sure to edit this record",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      Notiflix.Loading.standard();
      let response = await axios.post(getUrl("getEvent"), { id: record });
      if (response.status === 200) {
        setIsnew(false);
        setRecordid(response.data._id);
        setData({
          title: response.data.title,
          description: response.data.description,
          startdatetime: response.data.startdatetime,
          status: response.data.status,
        });
      }
      Notiflix.Loading.remove();
    });
  };

  const getPaticipatients = async (eventid) => {
    Notiflix.Loading.standard();
    let response = await axios.post(getUrl("getEventParticipatients"), {
      event: eventid,
    });
    setPaticipatients(response.data);
    Notiflix.Loading.remove();
    setShowmodal(true);
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
            <h6 className=" text-primary pb-4">Events List</h6>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell align="left">Event Name</TableCell>
                    <TableCell align="center">Date/Time</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.length === 0 && (
                    <TableRow className="text-center">
                      <TableCell className="text-danger" colSpan={5}>
                        No Data Found
                      </TableCell>
                    </TableRow>
                  )}
                  {list.map((item, index) => (
                    <TableRow
                      key={item._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">{item.title}</TableCell>
                      <TableCell align="center">
                        {Moment(item.startdatetime).format("D/MM/Y hh:mm A")}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <Badge bg={item.status === 1 ? "success" : "danger"}>
                          {item.status === 1 ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Button
                          className="mx-1"
                          variant="warning"
                          size="sm"
                          onClick={() => getPaticipatients(item._id)}
                        >
                          Partipatients
                        </Button>
                        <Button
                          className="mx-1"
                          variant="primary"
                          size="sm"
                          onClick={() => handleGet(item._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="mx-1"
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Col>
          <Col
            md={3}
            sm={12}
            className="shadow-sm text-primary mt-5 p-4 rounded"
          >
            <h6 className=" text-primary pb-4">Add / Update Events</h6>

            <Form className="text-start" onSubmit={handleEnrollment}>
              <Form.Group className="mb-3" controlId="nameGroup">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  required
                  name="title"
                  value={data.title}
                  type="text"
                  placeholder="Enter event title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="startdatetimeGroup">
                <Form.Label>Event Date & Time</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  required
                  name="startdatetime"
                  value={data.startdatetime}
                  type="datetime-local"
                  placeholder="Enter event date and time"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="descriptionGroup">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  required
                  placeholder="Enter event remark"
                  name="description"
                  value={data.description}
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="statusGroup">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  onChange={handleChange}
                  name="status"
                  aria-label="Default select example"
                  value={data.status}
                >
                  <option value={1}>Active</option>
                  <option value={2}>Inactive</option>
                </Form.Select>
              </Form.Group>
              {error && error.message && (
                <Alert key={error.color} variant={error.color}>
                  {error.message}
                </Alert>
              )}
              <Button
                className="mt-4 w-100"
                variant={isnew ? "primary" : "warning"}
                type="submit"
              >
                {isnew ? "Submit" : "Update"}
              </Button>
              <Button
                className="mt-4 w-100"
                variant="danger"
                type="button"
                onClick={() => {
                  setData(initialData);
                  setIsnew(true);
                }}
              >
                Reset
              </Button>
            </Form>
          </Col>
        </Row>
        <Modal
          show={showmodal}
          onHide={() => {
            setShowmodal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Paticipatients</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>NIC</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paticipatients.map((item, index) => (
                    <TableRow
                      key={item._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{item.nic}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowmodal(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Events;
