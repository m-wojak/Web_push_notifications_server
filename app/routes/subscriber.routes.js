module.exports = app => {
    const subscribers = require("../controllers/subscriber.controller.js");
    var router = require("express").Router();
    // Create a new help_section
    router.post("/", subscribers.create);
    // Retrieve all subscriber by topic
    router.get("/topic/:topic", subscribers.findAllByTopic);
    // Update a help_section with id
    router.put("/token/:token", subscribers.update);
    // Delete a help_section with id
    router.delete("/token/:token", subscribers.delete);
    // Create a new help_section
    router.delete("/", subscribers.deleteAll);
    app.use('/api/subscribers', router);
  };