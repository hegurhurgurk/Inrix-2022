//const fetch = require("node-fetch");
//const json = require("json")
import fetch from "node-fetch";

fetch('http://localhost:8000/gettoken')
  .then((response) => response.json())
  .then((token) => console.log(token));
