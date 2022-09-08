const db = require("../models");
const Notification = db.notifications;

// Create and Save a new subscriber
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a notification
  const notification = new Notification({
    topic: req.body.topic,
    title: req.body.title,
    body: req.body.body
  });
  // Save notification in the database
  notification
    .save(notification)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the notification."
      });
    });
};
