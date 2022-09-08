module.exports = app => {
    const notification = require("../controllers/notification.controller.js");
    var router = require("express").Router();
    // Create a new notification
    router.post("/", notification.create);
    app.use('/api/notification', router);
  };