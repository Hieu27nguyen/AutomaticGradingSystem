const swaggerJsDoc = require("swagger-jsdoc");
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Automatic Grading System API",
			version: "1.0.0",
			description: "A document about our Judging API System",
		},
		servers: [
			{
				url: "http://localhost:3500",
			},
		],
	},
	apis: ["./routes/*.js"],
};
const jsdocConfig = swaggerJsDoc(options);
module.exports = {jsdocConfig};