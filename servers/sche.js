const db = require("./dbid").db;

module.exports = {
  sche: async function (search_region, month) {
    return new Promise((resolve) => {
      db.query(
        `SELECT aid, visit_date, visit_time, estimate_num, cid, no, latest, etc
                  FROM apply_status            
                  WHERE visit_date BETWEEN '2021-${month}-01' AND '2021-${month}-31' 
                        AND latest = 1
                        AND aid LIKE '%${search_region}%'
                  ORDER BY visit_date, visit_time;`,
        async function (error, store_schedule) {
          if (error) {
            console.log(error);
            // res.send(false);
          }
          let temp;
          for (let i = 0; i < store_schedule.length; i++) {
            temp = await a(store_schedule, i);
          }

          resolve(temp);
        }
      );
    });
  },
  //총 스케줄 관리
  scheAll: async function (before3day, after7day) {
    return new Promise((resolve) => {
      db.query(
        `SELECT aid, visit_date, visit_time, estimate_num, cid, no, latest, etc
                  FROM apply_status            
                  WHERE visit_date BETWEEN '${before3day}' AND '${after7day}' 
                        AND latest = 1
                  ORDER BY visit_date, aid, visit_time;`,
        async function (error, store_schedule) {
          if (error) {
            console.log(error);
            // res.send(false);
          }
          let temp;
          for (let i = 0; i < store_schedule.length; i++) {
            temp = await a(store_schedule, i);
          }

          resolve(temp);
        }
      );
    });
  },
};

async function a(store_schedule, i) {
  return new Promise((resolve) => {
    db.query(
      `SELECT c_name, c_address, c_ph  FROM center WHERE center_id = ${store_schedule[i].cid}`,
      function (error2, store_center) {
        if (error2) {
          console.log(error2);
          //   res.send(false);
        }

        store_schedule[i].c_name = store_center[0].c_name;
        store_schedule[i].c_address = store_center[0].c_address;
        store_schedule[i].c_ph = store_center[0].c_ph;

        //console.log(store_schedule);
        resolve(store_schedule);
        // console.log(store_schedule);
      }
    );
  });
}
