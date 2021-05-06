const express = require("express");
const app = express();
const path = require("path");
const url = require("url");
const qs = require("querystring");
const mysql = require("mysql");
const db = require("./dbid");
const fs = require("fs");
const session = require("express-session");
const bodyParser = require("body-parser");
const compression = require("compression");
const FileStore = require("session-file-store")(session);

db.db.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(
  session({
    secret: "jdslfjsjl2381@#!@3/12",
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
  })
);
//db.connect();

app.get("/", (req, res) => {
  //로그인 화면dddd
  fs.readFile("login", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/login", (req, res) => {
  if (req.session.is_logined === true && req.session.userid !== null) {
    res.redirect(`/home/${req.session.userid}`);
  }
  var post = req.body;
  var id = post.username;
  var password = post.password;
  var sql = `SELECT * FROM user WHERE u_name=?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else if (!result[0]) {
      console.log("아이디를 확인해주세요");
      res.redirect("/");
    } else {
      if (password === result[0].u_pwd) {
        req.session.is_logined = true;
        req.session.userid = id;
        console.log("성공");
        res.redirect(`/home/${id}`);
      } else {
        console.log("비밀번호를 확인해주세요");
        res.redirect("/");
      }
    }
  });
});

app.post("/logout", (req, res) => {
  req.session.remove("userid");
  req.session.remove("is_logined");
  res.redirect("/");
});

app.get("/home/:userid", function (req, res) {
  //userid 는 login 사용자 이름 어린이집 검색 요청시 어린이집 이름 querystring에서 ?target=
  // var _url = url.parse(req.url, true);
  // var target = _url.query.target;
  // var userid = path.parse(req.params.userid).base;
  res.send(작업물);
});

app.post("/home/:userid/search", (req, res) => {
  // 어린이집 이름에 대한 정보만 제공
  var post = req.body;
  var kindergarden = post.kindergarden;
  if (target) {
    //target이 포함된 어린이집 출력
    db.query(
      `SELECT * FROM center WHERE c_name LIKE '%${target}%'`,
      function (error, results) {
        //보낼 부분
        results.forEach((element) => {
          var center_info = {};
        });
      }
    );
  }
  res.send(결과물);
});

//어린이집 정보 제공
app.post("/home/:userid/search/:kindergarden", (req, res) => {});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
