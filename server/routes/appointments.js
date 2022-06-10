const router = require("express").Router();
const { Appointments, validate } = require("../models/appointments");
const { Package, validate1 } = require("../models/packages");
const { User, validate2 } = require("../models/user");
const SendMail = require("../models/sendmail");

router.post("/add", async (req, resp) => {
  try {
    let ref = Date.now() + new Date().getTime();

    JSON.parse(req.body.cart).forEach(async function (ele) {
      console.log({
        quantity: ele.quantity - ele.cart_qty,
      });
      await Package.find({ _id: ele._id }).updateOne({
        quantity: ele.quantity - ele.cart_qty,
      });
    });

    await new Appointments({
      total: req.body.total,
      ref: ref,
      user: req.body.user,
      products: req.body.cart,
      status: 2,
    }).save();

    console.log({
      total: req.body.total,
      ref: ref,
      user: req.body.user,
      products: req.body.cart,
      status: 2,
    });

    const data = await User.findOne({ _id: req.body.user });

    if (data) {
      SendMail(
        data.email,
        "Appointment",
        "Your appointment (" +
          ref +
          ") of total (LKR " +
          req.body.total +
          ") has been recieved. Thank you"
      );
    }

    return resp.status(200).send({ message: "Appointment Recieved" });
  } catch (error) {
    return resp.status(500).send({ message: error.message });
  }
});

router.post("/list", async (req, resp) => {
  try {
    let data = [];
    if (req.body.isadmin == 2) {
      data = await Appointments.find({ user: req.body.user });
    } else {
      data = await Appointments.find();
    }
    return resp.status(200).send(data);
  } catch (error) {
    return resp.status(500).send({ message: error.message });
  }
});

module.exports = router;
