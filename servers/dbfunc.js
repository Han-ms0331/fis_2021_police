const db = require("./dbid").db;

module.exports = {
  get_data: async function (sql_string) {
    return new Promise((resolve, reject) => {
      db.query(sql_string, (error, data) => {
        if (error) {
          throw error;
        }
        resolve(data);
      });
    });
  },
  set_call_status: async function (post) {
    const { cid } = post;
    const { c_manager } = post;
    const { date } = post;
    const { participation } = post;
    const { in_out } = post;
    const { uid } = post;
    const { m_ph } = post;
    const { m_email } = post;
    const { etc } = post;
    return new Promise((resolve) => {
      db.query(
        `
        INSERT INTO call_status( cid, uid, date, participation, 
        in_out, c_manager, m_ph, m_email, etc )
        VALUES (${cid}, ${uid}, '${date}', '${participation}', 
        '${in_out}', '${c_manager}', '${m_ph}', '${m_email}', '${etc}')`,
        (error, data) => {
          if (error) {
            throw error;
          } else resolve(true);
        }
      );
    });
  },
  get_agent_status: async function (a_id, a_visit_date) {
    return new Promise((resolve) => {
      db.query(
        `SELECT * FROM agent WHERE agent_id = '${a_id}'`,
        (error, data1) => {
          let result = {};
          result.agent_id = data1[0].agent_id;
          result.a_name = data1[0].a_name;
          result.a_ph = data1[0].a_ph;
          let list = [];
          db.query(
            `SELECT * FROM apply_status WHERE aid = '${a_id}' and latest = 1`,
            (error, datas2) => {
              for(let i = 0; datas2[i] != null; i++){
                let result2 = {};
                if (datas2[i].visit_date == a_visit_date) {
                  result2.visit_date = datas2[i].visit_date;
                  result2.visit_time = datas2[i].visit_time;
                  result2.estimate_num = datas2[i].estimate_num;
                  list.push(result2);
                }
              }
              result.visit = list;
              resolve(result);
              return;
            }
          );
        }
      );
    });
  },
};
