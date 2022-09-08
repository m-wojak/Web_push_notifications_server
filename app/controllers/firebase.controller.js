var admin = require("firebase-admin");
var { getMessaging } = require("firebase-admin/messaging")
var serviceAccount = require("../../citizencapital-wpn-4dc50-firebase-adminsdk-hkzv2-3d46b95985.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// console.log(admin);

exports.subscribeUsersToTopicGroup = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to subscribe can not be empty!"
      });
    }
    const topic = req.body.topic;
    const tokenlist = req.body.tokens;
    console.log(topic);
    console.log(tokenlist);
    var max_cnt = 500
    console.log("tokens length: ",tokenlist.length);
    var tokenLength = tokenlist.length
    console.log("tokenLength: ", tokenLength)
    if (tokenLength <= max_cnt) {
      // console.log("messaging: ",messaging)
      // console.log("data to firebase ",tokenlist, topic)
      getMessaging().subscribeToTopic(tokenlist,topic) 
      .then((response) => {
        // See the MessagingTopicManagementResponse reference documentation
        // for the contents of response.
        // console.log('Successfully subscribed to topic:', response);
        console.log('Successfully subscribed to topic:', response)
        res.send(response);
      })
      .catch(err => {
        console.log('Error subscribing to topic:', err);
        res.status(500).send({
          message:
          err.message || "Some error occurred while subscribing users to topic."
        });
      })
    } else {
      var z = Math.floor(tokenLength/max_cnt);
      var remainder = tokenLength % max_cnt;
        if (remainder > 0) {var call_count = z + 1
        } else {
          call_count = z
        }
      for (var i = 0; i < call_count; i++) {
        var i_start = i * max_cnt
        if (i <= z) {
          var i_end = i_start + max_cnt
        } else {
          i_end = i_start + remainder
        }
        var token_slice = tokenlist.slice(i_start,i_end)
        getMessaging().subscribeToTopic(token_slice, topic)
          .then((response) => {
            // See the MessagingTopicManagementResponse reference documentation
            // for the contents of response.
            console.log('Successfully subscribed to topic:', response);
            res.send(response);
          })
          .catch(err => {
            console.log('Error subscribing to topic:', err);
            res.status(500).send({
              message:
              err.message || "Some error occurred while subscribing users to topic."
            });
        });
      }
    };
  };
  exports.sendMessageToTopicGroup = (req, res) => {
    
    if (!req.body) {
      return res.status(400).send({
        message: "Data to send can not be empty!"
      });
    }
    
    const message = req.body;
    console.log('Message: ',message)
    getMessaging().send(message)
    .then((response) => {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log('Successfully sent message:', response)
      res.send(response)
    })
    .catch(err => {
      // console.log('Error subscribing to topic:', error);
      console.log('Error sending message:', err);
      res.status(500).send({
        message:
        err.message || "Some error occurred while sending message to topic group."
      });
    });
    
  };