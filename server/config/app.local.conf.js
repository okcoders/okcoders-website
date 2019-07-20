let dbUrl;
if (process.env.DB_URL) {
	dbUrl = process.env.DB_URL
} else {
	dbUrl = "mongodb://localhost:27017/okcoders"
}
const config = {
	dbUrl
}

module.exports = config
