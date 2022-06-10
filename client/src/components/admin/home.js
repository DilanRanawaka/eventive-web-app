import React from "react";
// import { Link } from "react-router-dom";
import HomeImage from "../../assets/images/home.png";
import FeatureImage1 from "../../assets/images/featureImage1.png";
import FeatureImage2 from "../../assets/images/featureImage1.png";
import Client from "../../assets/images/client.png";
import FBIcon from "../../assets/icons/fb.png";
import InstaIcon from "../../assets/icons/instagram.png";
import Header from "./common/header";

const HomeSection = () => {
  return (
    <>
      <Header />

      <div>
        <section className=" slider_section position-relative">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="slider_item-box">
                  <div className="slider_item-container">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="slider_item-detail">
                            <div>
                              <h1>
                                Welcome to <br />
                                Eventive
                              </h1>
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                              </p>
                              <div className="d-flex">
                                <a
                                  href
                                  className="text-uppercase custom_dark-btn"
                                >
                                  Contact Us
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="slider_img-box">
                            <div>
                              <img src={HomeImage} alt="" className="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="service_section layout_padding ">
          <div className="container">
            <h2 className="custom_heading">Our Services</h2>
            <p className="custom_heading-text">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have
            </p>
            <div className=" layout_padding2">
              <div className="card-deck">
                <div className="card">
                  {/* <img className="card-img-top" src="images/card-item-1.png" alt="Card image cap" /> */}
                  <div className="card-body">
                    <h5 className="card-title">Weddings</h5>
                    <p className="card-text">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p>
                  </div>
                </div>
                <div className="card">
                  {/* <img className="card-img-top" src="images/card-item-2.png" alt="Card image cap" /> */}
                  <div className="card-body">
                    <h5 className="card-title">Birthdays</h5>
                    <p className="card-text">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p>
                  </div>
                </div>
                <div className="card">
                  {/* <img className="card-img-top" src="images/card-item-3.png" alt="Card image cap" />s */}
                  <div className="card-body">
                    <h5 className="card-title">Engagements</h5>
                    <p className="card-text">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="d-flex justify-content-center">
        <a href="" className="custom_dark-btn">
          Read More
        </a>
      </div> */}
          </div>
        </section>

        <section className="event_section">
          <div className="container">
            <h2 className="custom_heading">Portfolio</h2>
            <p className="custom_heading-text">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have
            </p>
            <div className="row layout_padding2">
              <div className="col-md-4">
                <div className="event_detail-box">
                  <h3>Outdoor Function</h3>
                  <p className="mt-4 mb-5">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have
                  </p>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <div className="event_img-box d-flex justify-content-center align-items-center">
                  <img src={FeatureImage1} alt="" className="" width="250px" />
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <div className="event_img-box d-flex justify-content-center align-items-center">
                  <img src={FeatureImage2} alt="" className="" width="250px" />
                </div>
              </div>
            </div>
            <div className="row layout_padding2">
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <div className="event_img-box d-flex justify-content-center ">
                  <img src={FeatureImage2} alt="" className="" width="250px" />
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <div className="event_img-box d-flex justify-content-center ">
                  <img src={FeatureImage2} alt="" className="" width="250px" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="event_detail-box">
                  <h3>Indoor Function</h3>
                  <p className="mt-4 mb-5">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="tasty_section">
    <div className="container_fluid">
      <h2>
        EVENTIVE
      </h2>
    </div>
  </section> */}

        <section className="client_section layout_padding">
          <div className="container">
            <h2 className="custom_heading">Testimonial</h2>
            <p className="custom_heading-text">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have
            </p>
            <div>
              <div
                id="carouselExampleControls-2"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="client_container layout_padding2">
                      <div className="client_img-box">
                        <img src={Client} alt="" />
                      </div>
                      <div className="client_detail">
                        <h3>Johnhex</h3>
                        <p className="custom_heading-text">
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form, by injected humour, or randomised words
                          which don't look even slightly believable. If you are{" "}
                          <br />
                          going to use a passage of Lorem Ipsum, you need to be
                          sure
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="client_container layout_padding2">
                      <div className="client_img-box">
                        <img src={Client} alt="" />
                      </div>
                      <div className="client_detail">
                        <h3>Johnhex 2</h3>
                        <p className="custom_heading-text">
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form, by injected humour, or randomised words
                          which don't look even slightly believable. If you are{" "}
                          <br />
                          going to use a passage of Lorem Ipsum, you need to be
                          sure
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="client_container layout_padding2">
                      <div className="client_img-box">
                        <img src={Client} alt="" />
                      </div>
                      <div className="client_detail">
                        <h3>Johnhex 3</h3>
                        <p className="custom_heading-text">
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form, by injected humour, or randomised words
                          which don't look even slightly believable. If you are{" "}
                          <br />
                          going to use a passage of Lorem Ipsum, you need to be
                          sure
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="custom_carousel-control">
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleControls-2"
                    role="button"
                    data-slide="prev"
                  >
                    <span className="" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleControls-2"
                    role="button"
                    data-slide="next"
                  >
                    <span className="" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="contact_section layout_padding">
          <div className="container">
            <h2 className="font-weight-bold">Contact Us</h2>
            <div className="row">
              <div className="col-md-8 mr-auto">
                <form action="">
                  <div className="contact_form-container">
                    <div>
                      <div>
                        <Box
                          className="py-2"
                          sx={{
                            // width: 500,
                            maxWidth: "100%",
                          }}
                        >
                          <TextField fullWidth label="Name" id="fullWidth" />
                        </Box>
                        
                      </div>
                      <div>
                        <Box
                          className="py-2"
                          sx={{
                            // width: 500,
                            maxWidth: "100%",
                          }}
                        >
                          <TextField fullWidth label="Email" id="fullWidth" />
                        </Box>
                        
                      </div>
                      <div>
                        <Box
                          className="py-2"
                          sx={{
                            // width: "100%",
                            maxWidth: "100%",
                          }}
                        >
                          <TextField
                            fullWidth
                            id="outlined-multiline"
                            label="Message"
                            multiline
                            rows={5}
                          />
                        </Box>
                       
                      </div>
                      <div className="mt-5">
                        <button type="submit">send</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section> */}

        <section className="info_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h5>About</h5>
                <ul>
                  <li>randomised</li>
                  <li>words which</li>
                  <li>don't look even</li>
                  <li>slightly</li>
                  <li>believable. If you</li>
                  <li>are going to use</li>
                  <li>a passage of</li>
                  <li>Lorem Ipsum,</li>
                </ul>
              </div>
              <div className="col-md-4">
                <h5>Services</h5>
                <ul>
                  <li>randomised</li>
                  <li>words which</li>
                  <li>don't look even</li>
                  <li>slightly</li>
                  <li>believable. If you</li>
                  <li>are going to use</li>
                  <li>a passage of</li>
                  <li>Lorem Ipsum,</li>
                </ul>
              </div>
              <div className="col-md-4">
                <div className="social_container">
                  <h5>Follow Us</h5>
                  <div className="social-box">
                    <a href>
                      <img src={FBIcon} alt="" className="" />
                    </a>

                    <a href>
                      <img src={InstaIcon} alt="" className="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-fluid footer_section">
          <p>
            Copyright &copy; 2022 All Rights Reserved By
            <a href> Eventive</a>
          </p>
        </section>
      </div>
    </>
  );
};

export default HomeSection;
