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
const { send } = require("process");
const FileStore = require("session-file-store")(session);
db.connect();

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

// app.get("/", (req, res) => {
//   //로그인 화면
//   fs.readFile("login", "utf-8", (err, data) => {
//     res.send(data);
//   });
// });

app.post("/login", (req, res) => {
  if (req.session.is_logined === true && req.session.userid !== null) {
    res.redirect(`/home/${req.session.userid}`);
  }
  let post = req.body;
  let id = post.username;
  // const { username } = req.body; 로 가능
  let password = post.password;
  let sql = `SELECT * FROM user WHERE u_name=?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else if (!result[0]) {
      console.log("아이디를 확인해주세요");
      res.send(false);
    } else {
      if (password === result[0].u_pwd) {
        req.session.is_logined = true;
        req.session.userid = id;
        console.log("성공");
        res.send(true);
      } else {
        console.log("비밀번호를 확인해주세요");
        res.send(false);
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
  if (req.session.is_logined) {
    var userid = path.parse(req.params.userid).base;
    res.send(userid);
  }
  //로그인 성공시 userid를 반환시켜준다.
});

app.get("/home/:userid/:target", (req, res) => {
  // 어린이집 이름에 대한 정보만 제공
  if (req.session.is_logined) {
    let target = path.parse(req.params.target).base;
    if (target) {
      //target이 포함된 어린이집 출력
      db.query(
        `SELECT * FROM center WHERE c_name LIKE '%${target}%'`,
        function (error, results) {
          //보낼 부분
          let center_info_list = []; // target이 포함된 어린이 집 목록들
          results.forEach((element) => {
            //element는 results의 배열단위
            let center_info = {};
            center_info.center_id = element.center_id;
            center_info.c_sido = element.c_sido;
            center_info.c_sigungu = element.c_sigungu;
            center_info.c_name = element.c_name;
            center_info.c_address = element.c_address;
            center_info_list.push(center_info);
          });
          if (center_info_list.length === 0) {
            res.send(false);
          } else res.send(center_info_list);
        }
      );
    }
  } else res.redirect("/");
});

//어린이집 정보 제공

// async 와 await 과 promise로 간단히 만들어 보기

const _query = async function (sql_string) {
  return new Promise((resolve, reject) => {
    db.query(sql_string, (error, data) => {
      if (error) {
        throw error;
      }
      resolve(data);
    });
  });
};

app.get("/home/:userid/search/:cid", async (req, res) => {
  if (req.session.is_logined) {
    try {
      let cid = path.parse(req.params.cid).base;
      let result = {
        centers: {},
        calls: {},
        applies: {},
      };
      result.centers = await _query(
        `SELECT * FROM center WHERE center_id = ${cid}`
      );
      result.calls = await _query(
        `SELECT * FROM call_status WHERE cid = ${cid}`
      );
      result.applies = await _query(
        `SELECT * FROM apply_status WHERE cid = ${cid}`
      );
      res.send(result);
    } catch {
      res.send(Error);
    }
  }
  else redirect('/');
});

// app.get("/home/:userid/search/:cid", (req, res) => {
//   let cid = path.parse(req.params.cid).base;

//   let result = {
//     centers: {},
//     calls: {},
//     applies: {},
//   };

//   db.query(
//     `SELECT * FROM center WHERE center_id = ${cid}`,
//     function (error, centers) {
//       if (error) {
//         throw error;
//       }
//       result.centers = centers;

//       db.query(
//         `SELECT * FROM call_status WHERE cid = ${cid}`,
//         function (error2, calls) {
//           if (error2) {
//             throw error;
//           }
//           result.calls = calls;
//           db.query(
//             `SELECT * FROM apply_status WHERE cid = ${cid}`,
//             function (error3, applies) {
//               if (error3) {
//                 throw error;
//               }
//               result.applies = applies;
//               res.send(result);
//             }
//           );
//         }
//       );
//     }
//   );
// });

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
