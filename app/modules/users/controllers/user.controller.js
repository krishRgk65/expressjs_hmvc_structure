const User = require("../models/user.model.js");
// const coreModel = require("../../../core/core.model.js")(User.table);
const coreModel = require("../../users/core/core.model.js")(User.table);
// http://localhost:3000/customers?search=ayu&page=3&per_page=3
exports.getAll = (req, res) => {
  
  req.column = ["name", "email"];
coreModel.paginate(req, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else 
  
    res.send(data);
  });
};
exports.store = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // can custom object
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });
coreModel.store(User, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else 

    res.send(data);
  });
};
exports.show = (req, res) => {
  coreModel.show(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found userId with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving userId with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
coreModel.update(
    req.params.userId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};
exports.destroy = (req, res) => {
  coreModel.destroy(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.customerId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};