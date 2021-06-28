const express = require("express");
const app = express();
const path = require("path");
const url = require("url");
const qs = require("querystring");
const mysql = require("mysql");
const db = require("./dbid").db;
const fs = require("fs");
const session = require("express-session");
const bodyParser = require("body-parser");
const compression = require("compression");
const { send, allowedNodeEnvironmentFlags } = require("process");
const FileStore = require("session-file-store")(session);
const cors = require("cors");
const dbfunc = require("./dbfunc");
const sche = require("./sche");
const { element } = require("prop-types");
const mail = require("./mail");
var imaps = require("imap-simple");
const _ = require("lodash");

var config = {
  imap: {
    user: "fis182@fisolution.co.kr",
    password: "fis1234*",
    host: "imap.mailplug.co.kr",
    port: 993,
    tls: true,
    ssl: true,
  },
};

async function a() {
  let result = await imaps.connect(config).then(function (connection) {
    return connection.openBox("INBOX").then(function () {
      var searchCriteria = ["800:800"];
      var fetchOptions = {
        bodies: ["HEADER", "TEXT"],
      };
      return connection
        .search(searchCriteria, fetchOptions)
        .then(function (messages) {
          let subjects = [];
          messages.forEach(function (item) {
            let header = _.find(item.parts, { which: "HEADER" });
            let text = _.find(item.parts, { which: "TEXT" });
            let subject = header.body.subject[0];
            let filters = /\<.+\@.+\..+\>/;
            console.log(header);
            if (subject.includes("failure")) {
              let target = text.body.match(filters);
              subject = target[0] + "에게 보내지지 않았습니다";
            }
            subject += " 메일 주소를 다시 확인해 주세요 " + header.body.date[0] + "에 발송됨";
            subjects.push(subject);
          });
          return subjects;
        });
        // .then(function (messages) {
          
        //   // let html_t = [];
        //   // messages.forEach(function (item) {
        //   //   var all = _.find(item.parts, { which: "TEXT" });
        //   //   var header = _.find(item.parts, { which: "HEADER" });
        //   //   let fil = /.+\r\n/g;
        //   //   let str = all.body.match(fil);
        //   //   let decode = "";
        //   //   for (let element of str) {
        //   //     if (element.includes("Content") || element.includes("--")) {
        //   //       continue;
        //   //     } else decode += Buffer.from(element, "base64").toString("utf-8");
        //   //   }
        //   //   //console.log(decode);
        //   //   //console.log(all);
        //   //   //var html = Buffer.from(all.body, "base64").toString("utf-8");
        //   //   //html_t.push(html);
        //   //   console.log(header);
        //   //   console.log(all);
        //   //   //console.log(all);
        //   //   html_t.push(decode);
        //   // });
        //   // return html_t;
        // });
    });
  });
  return result;
}

app.get("/", async (req, res) => {
  let test;
  test = await a();
  //res.set({ "Content-Type": "text/html", charset: "utf-8" });
  // let failed_message = [];
  // test.forEach((element) => {
  //   if (element.includes("발송실패")) failed_message.push(element);
  // });
  // console.log(failed_message);
  res.send(test);
});

app.listen(4000, function () {
  console.log("Example app listening on port 3000!");
});
