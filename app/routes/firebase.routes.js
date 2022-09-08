module.exports = app => {
    const firebase = require("../controllers/firebase.controller.js");
    var router = require("express").Router();
    // Create a new notification
    router.put("/subscribe", firebase.subscribeUsersToTopicGroup);
    router.put("/send", firebase.sendMessageToTopicGroup);
    app.use('/api/firebase', router);
  };