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
    const {cid} = post.cid;
    const {uid} = post.uid;
    const {date} = post.date;
    const {participation} = post.participation;
    const {in_out} = post.in_out;
    const {c_manager} = post.c_manager;
    const {m_ph} = post.m_ph;
    const {m_email} = post.m_email;
    const {etc} = post.etc;
    return new Promise((resolve) => {
      db.query(
        `
        INSERT INTO call_status( cid, uid, date, participation, 
        in_out, c_manager, m_ph, m_email, etc )
        VALUES (${cid}, ${uid}, ${date}, ${participation}, 
        ${in_out}, ${c_manager}, ${m_ph}, ${m_email}, ${etc});`,
        (error, data) => {
          if(error) {
            throw error;
          }
          else resolve(true);
        }
      );
    });
  },
};
