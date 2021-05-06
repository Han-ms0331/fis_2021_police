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
const compression = require('compression');
const { Store } = require("express-session");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(session({
    secret: 'jdslfjsjl2381@#!@3/12'
    store: 
}))
//db.connect();

app.get("/", (req, res) => {
  //로그인 화면
  fs.readFile("login", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/login", (req, res) => {
  var post = req.body;
  var id = post.username;
  var password = post.password;
  var sql = `SELECT * FROM user WHERE id=?`
  db.query(sql, [id], (err, result) => {
      if(err){
          console.log(err);
      }
      else if(!result[0]){
        alert('아이디를 확인해주세요');
        response.redirect('/');
      }
      else{
        if(password === result[0].password){
            req.session
        }
      }
  })
});

// app.get("/home/:userid", function (req, res) {
//   //userid 는 login 사용자 이름 어린이집 검색 요청시 어린이집 이름 querystring에서 ?target=
//   var _url = url.parse(req.url, true);
//   var target = _url.query.target;
//   var userid = path.parse(req.params.userid).base;
//   if (target) {
//     //target이 포함된 어린이집 출력
//     db.query(
//       `SELECT * FROM topic WHERE 어린이집열이름 LIKE '%${target}%'`,
//       function (error, results) {
//         //보낼 부분
//       }
//     );
//   }

//   console.log(userid);
//   console.log(target);
//   console.log(db);
// });

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
