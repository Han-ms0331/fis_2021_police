const db = require("./dbid").db;

module.exports = {
  sche: async function (search_region) {
    return new Promise((resolve) => {
      db.query(
        `SELECT aid, visit_date, visit_time, estimate_num, cid
                  FROM apply_status            
                  WHERE visit_date BETWEEN date_format(now(),'%Y,-%m-01') AND last_day(now()) 
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
};

async function a(store_schedule, i) {
  return new Promise((resolve) => {
    db.query(
      `SELECT c_name, c_address FROM center WHERE center_id = ${store_schedule[i].cid}`,
      function (error2, store_center) {
        if (error2) {
          console.log(error2);
          //   res.send(false);
        }

        store_schedule[i].c_name = store_center[0].c_name;
        store_schedule[i].c_address = store_center[0].c_address;

        //console.log(store_schedule);
        resolve(store_schedule);
        // console.log(store_schedule);
      }
    );
  });
}
