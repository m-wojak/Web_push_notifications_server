const db = require("../models");
const Subscriber = db.subscribers;
// Create and Save a new subscriber
exports.create = (req, res) => {
  // Validate request
  if (!req.body.token) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a subscriber
  const subscriber = new Subscriber({
    token: req.body.token,
    topic: req.body.topic
  });

  // Save subscriber in the database
  subscriber
    .save(subscriber)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the subscriber."
      });
    });
};

// Retrieve all subscribers by topic from the database.
exports.findAllByTopic = (req, res) => {
  const topic = req.params.topic;
  // console.log("Topic for findAllByTopic: ",topic)
  Subscriber.find( {'topic': topic} )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subscribers."
      });
    });
};
// Find a single subscriber with a token
exports.findOneByToken = (req, res) => {
    const token = req.params.token;
    Subscriber.findOne({'token': token})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found subscriber with token " + token });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving subscriber with token=" + token });
      });
  };
// Find a single subscriber with an uid
exports.findOneByUID = (req, res) => {
  const uid = req.params.uid;
  Subscriber.findOne({'uid': uid })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found subscriber with uid " + uid });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving subscriber with uid=" + uid });
    });
};
// Find a single subscriber with a token and uid
exports.findOneByTokenAndUID = (req, res) => {
  const token = req.params.token;
  const uid = req.params.uid;
  Subscriber.findOne({ 'token': token, 'uid': uid })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Did not find subscriber with token= " + token + " and uid= " + uid });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving subscriber with token= " + token + " and uid= " + uid });
    });
};
// Find a single subscriber with a topic and token
exports.findOneByTopicAndToken = (req, res) => {
    const topic = req.params.topic;
    const token = req.params.token;
    Subscriber.findOne({ 'topic': topic, 'token': token })
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Did not find subscriber with topic= " + topic + " and token= " + token });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving subscriber with topic= " + topic + " and token= " + token });
      });
  };
// Update a subscriber by the token in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const token = req.params.token;
  Subscriber.findOneAndUpdate({'token': token}, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update subscriber with token=${token}. Maybe subscriber was not found!`
        });
      } else res.send({ message: "subscriber was updated successfully!" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating subscriber with token=" + token
      });
    });
};
// Delete a subscriber with the specified token in the request
exports.delete = (req, res) => {
  const token = req.params.token;
  // Subscriber.findOneAndRemove({'token':token})
  Subscriber.deleteMany({'token':token})
    .then(data => {
      console.log("deleteMany response: ",data)
      if (!data) {
        res.status(404).send({
          message: `Cannot delete subscriber with token=${token}. Maybe subscriber was not found!`
        });
      } else {
        res.send({
          message: "subscriber was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete subscriber with token=" + token
      });
    });
};
// Delete all subscribers from the database.
exports.deleteAll = (req, res) => {
  Subscriber.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} subscribers were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all subscribers."
      });
    });
};