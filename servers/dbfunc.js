<<<<<<< HEAD
const db = require("./dbid").db;

module.exports = {
    get_data : async function (sql_string) {
        return new Promise((resolve, reject) => {
          db.query(sql_string, (error, data) => {
            if (error) {
              throw error;
            }
            resolve(data);
          });
        });
    },
    modify_data : async function (sql_string) {
      return new Promise((resolve, reject) => {
        db.query(sql_string, (error, data) => {
          
        })
      })
    }
}

=======
const db = require('./dbid').db;
// db.connect();

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
};
>>>>>>> 3f74298dcd0acc26e46341cc63a08356a9f11417
