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
  let day = new Date();
  let year = day.getFullYear();
  let month = day.getMonth() + 1;
  let date = day.getDate();
  let today = `${year}-${month}-${date}`;
  post.cid = cid;
  post.today = today;
  let result2 = [];
  for (let key in post) {
    switch (key) {
      case "cid":
        if (post[key] == "") result2.push(1);
        break;
      case "c_manager":
        if (post[key] == "") result2.push(2);
        break;
      case "data":
        if (post[key] == "") result2.push(3);
        break;
      case "participation":
        if (post[key] == "") result2.push(4);
        break;
      case "in_out":
        if (post[key] == "") result2.push(5);
        break;
      case "uid":
        if (post[key] == "") result2.push(6);
        break;
      case "m_ph":
        if (post[key] == "") result2.push(7);
        break;
      case "m_email":
        if (post[key] == "") result2.push(8);
        break;
    }
  }
  let error_code = {};
  if (result2.length > 0) {
    error_code.error = result2;
    res.send(error_code);
  } else {
    console.log(post);
    let result = await dbfunc.set_call_status(post);
    console.log(result);
    res.send(result);
  }
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
      }
      res.send(result);
    }
  );
});

app.get("/home/applymodify/:cid/:visit_date", (req, res) => {
  let cid = path.parse(req.params.cid).base;
  let visit_date = path.parse(req.params.visit_date).base;
  db.query(
    `UPDATE apply_status SET latest=0 WHERE cid=${post.cid} and visit_date = ${visit_date}`,
    (err, update_apply) => {
      if (err) {
        console.log(err);
        res.send(false);
      }
      res.send(true);
    }
  );
});

app.post("/home/applysave", (req, res) => {
  let post = JSON.parse(Object.keys(req.body)[0]);

  const { cid } = post;
  const { uid } = post;
  const { recept_date } = post;
  const { visit_date } = post;
  const { visit_time } = post;
  const { estimate_num } = post;
  const { aid } = post;
  let result2 = [];
  for (let key in post) {
    switch (key) {
      case "cid":
        if (post[key] == "") result2.push(1);
        break;
      case "uid":
        if (post[key] == "") result2.push(2);
        break;
      case "recept_date":
        if (post[key] == "") result2.push(3);
        break;

      case "visit_date":
        if (post[key] == "") result2.push(4);
        break;
      case "visit_time":
        if (post[key] == "") result2.push(5);
        break;
      case "estimate_num":
        if (post[key] == "") result2.push(6);
        break;
      case "aid":
        if (post[key] == "") result2.push(7);
        break;
    }
  }
  let error_code = {};
  if (result2.length > 0) {
    error_code.error = result2;
    res.send(error_code);
  } else {
    let sql = `INSERT INTO apply_status(cid, uid, recept_date,  visit_date, visit_time, estimate_num, aid, latest)
        VALUES (${cid}, ${uid}, '${recept_date}',  '${visit_date}', '${visit_time}', '${estimate_num}', '${aid}',1);`;
    db.query(sql, (err, store_apply) => {
      if (err) {
        console.log(err);
      }
      res.send(true);
    });
  }
});

app.get("/schedule/:search_region", async (req, res) => {
  let result = {
    sches: {},
    agents: {},
  };

  const search_region = path.parse(req.params.search_region).base; //해당 지역 스케줄
  result.sches = await sche.sche(search_region);
  result.agents = await dbfunc.get_data(
    `SELECT agent_id FROM agent WHERE agent_id LIKE '%${search_region}%'`
  );

  res.send(result);
});
// 콜직원 업무 현황
app.get("/:userid/getbusinessstatus", async (req, res) => {
  //let userid = path.parse(req.params.userid).base;
  if (userid === "Admin") res.send(false);
  let day = new Date();
  let year = day.getFullYear();
  let month = day.getMonth() + 1;
  let date = day.getDate();
  let today = `${year}-${month}-${date}`;
  let user_info = await dbfunc.get_data("SELECT * FROM user");
  let business_status = [];
  for (let i in user_info) {
    let cur_id = user_info[i].user_id;
    let cur_name = user_info[i].u_name;
    let how_many = 0;
    let call_data = await dbfunc.get_data(
      `SELECT * FROM call_status WHERE today = ${today} and uid = ${cur_id};`
    );
    let data = {};
    data.call_status = [];
    for (let j in call_data) {
      let add_data = {};
      add_data.cid = call_data[j].cid;
      let c_name = await dbfunc.get_data(
        `SELECT * FROM center WHERE today = ${today} and uid = ${cur_id};`
      )[0].c_name;
      add_data.participation = call_data[j].participation;
      data.call_status.push(add_data);
      how_many++;
    }
    data.how_many = how_many;
    business_status.push(data);
  }
});

// 요원 추가 변경
app.post("/:userid/setagent", (req, res) => {
  let post = JSON.parse(Object.keys(req.body)[0]);
  let u_name = post.u_name;
  let u_pwd = post.u_pwd;
  let u_ph = post.u_ph;
  db.query(`INSERT INTO user(u_name, u_pwd, u_ph) VALUES (${u_name}, ${u_pwd}, ${u_ph})`);
  res.send(true);
});

app.get("/:userid/:user_id/deleteagent", (req,res) => {
  let 
});
// 어린이집 추가 삭제 변경
app.post("/:userid/setcenter");

app.get("/:userid/deletecenter");
// 콜직원 추가 변경
app.get("/:userid/deleteuser");

app.post("/:userid/setuser")

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
