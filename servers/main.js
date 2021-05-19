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
db.connect();
const whitelist = ["*"];
var corsOptions = {
  origin: function (origin, callback) {
    var isWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
    // callback expects two parameters: error and options
  },
  credentials: true,
};
app.use(cors(corsOptions));
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
app.all("/*", function (req, res, next) {
  res.set({
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
  });
  next();
});
app.get("/", (req, res) => {
  res.send("success");
});
app.post("/login", (req, res) => {
  let post = JSON.parse(Object.keys(req.body)[0]);
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
        req.session.save(() => {
          res.send("session stored");
        });
        let a = {
          userid: result[0].user_id,
          username: result[0].u_name,
          success: true,
        };
        console.log("성공");
        res.send(a);
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
});
app.get("/home/:userid", function (req, res) {
  //uid 반환
  if (true) {
    var userid = path.parse(req.params.userid).base;
    res.send(userid);
  }
});
app.get("/home/:userid/:target", (req, res) => {
  // 어린이집 이름에 대한 정보만 제공
  if (true) {
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
            center_info.c_ph = element.c_ph;
            center_info_list.push(center_info);
          });
          res.send(center_info_list);
        }
      );
    }
  }
});
//어린이집 정보 제공
// async 와 await 과 promise로 간단히 만들어 보기
// data db에서 가져오기
app.get("/home/:userid/search/:cid", async (req, res) => {
  if (true) {
    try {
      let cid = path.parse(req.params.cid).base;
      let result = {
        centers: {},
        calls: {},
        applies: {},
      };
      result.centers = await dbfunc.get_data(
        `SELECT * FROM center WHERE center_id = ${cid}`
      );
      result.calls = await dbfunc.get_data(
        `SELECT * FROM call_status WHERE cid = ${cid}`
      );
      result.applies = await dbfunc.get_data(
        `SELECT * FROM apply_status WHERE cid = ${cid}`
      );
      res.send(result);
    } catch {
      res.send(Error);
    }
  }
});
app.post("/home/call_write/:cid", async (req, res) => {
  const cid = path.parse(req.params.cid).base;
  let post = JSON.parse(Object.keys(req.body)[0]);
  post.cid = cid;
  console.log(post);
  let result = await dbfunc.set_call_status(post);
  console.log(result);
  res.send(result);
});
app.get("/home/get_agent/:a_region/:visit_date", async (req, res) => {
  let a_region = path.parse(req.params.a_region).base;
  let visit_date = path.parse(req.params.visit_date).base;
  let result = [];
  await db.query(
    `SELECT * FROM agent WHERE agent_id LIKE '%${a_region}%'`,
    async (error, datas) => {
      for (let i = 0; datas[i] != null; i++) {
        let agent_id = await datas[i].agent_id;
        let result2 = await dbfunc.get_agent_status(agent_id, visit_date);
        result.push(result2);
        res.send(result);
      }
    }
  );
});
app.post("/home/applysave", (req, res) => {
  let post = JSON.parse(Object.keys(req.body)[0]);
  console.log(post);
  let sql = `INSERT INTO apply_status(cid, uid, recept_date, collect, visit_date, visit_time, estimate_num, aid, latest)
  VALUES (${post.cid}, ${post.uid}, '${post.recept_date}', '${post.collect}', '${post.visit_date}', '${post.visit_time}', '${post.estimate_num}', '${post.aid}',1);`;
  db.query(
    `UPDATE apply_status SET latest=0 WHERE cid=${post.cid};`,
    (err, update_apply) => {
      //같은 시설 수정전 정보들 latest=0 만들기
      if (err) {
        console.log(err);
        //  res.send(false);
      }
      db.query(sql, (err, store_apply) => {
        if (err) {
          console.log(err);
          //   res.send(false);
        }
        res.send(true);
      });
    }
  );
});

app.get("/schedule/:date", async (req, res) => {
  const date = path.parse(req.params.date).base;
  let resultdata = {};
  function scan() {
    return new Promise(function (resolve, reject) {
      db.query(
        `SELECT aid, visit_time, estimate_num, cid
				  FROM apply_status
				  WHERE visit_date = '${date}' AND latest = 1
				  ORDER BY visit_time;`,
        function (error, store_schedule) {
          if (error) {
            console.log(error);
            // res.send(false);
          }

          for (let i = 0; i < store_schedule.length; i++) {
            db.query(
              `SELECT c_name, c_address FROM center WHERE center_id = ${store_schedule[i].cid}`,
              function (error2, store_center) {
                if (error2) {
                  console.log(error2);
                  //   res.send(false);
                }

                store_schedule[i].c_name = store_center[0].c_name;
                store_schedule[i].c_address = store_center[0].c_address;
                resultdata = resultdata + store_schedule;
              }
            );
          }
          resolve(resultdata);
          console.log(resultdata);
        }
      );
    });
  }

  scan().then((resolvedData) => {
    // console.log(resolvedData);
    res.send(resolvedData);
  });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
