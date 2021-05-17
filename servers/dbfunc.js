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
