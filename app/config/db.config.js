const fs = require('fs');
const yaml = require('js-yaml');

try {
  var fileContents = fs.readFileSync('./app/config/mongodb_cred.yaml','utf8');
  var data = yaml.load(fileContents);
  // console.log(data);
  // console.log(data.uname, data.pwd);
} catch (e) {
  console.log(e);
}

// console.log("mongodb+srv://"+data.uname+":"+data.pwd+"@cluster0.xqqbi.mongodb.net/citizen_capital?retryWrites=true&w=majority")
module.exports = {
  url: "mongodb+srv://"+data.uname+":"+data.pwd+"@cluster0.xqqbi.mongodb.net/citizen_capital?retryWrites=true&w=majority"
};