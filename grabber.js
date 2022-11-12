const fetch = require("node-fetch");
const json = require("json")

const key = fetch("http://localhost:8000/gettoken", )
console.log(key.token);