const fetch = require("node-fetch");
const json = require("json")

//Set up URL to query
var number1 = 5
var number2 = 4
var url = "https://sampleapi.smistele.repl.co/differentroute?value1=" + number1 + "&value2=" + number2

//Set up query method
var requestOptions = {
  method: 'GET'
};

//Make query using fetch
var output = fetch(url, requestOptions)
  .then(response => response.json())
  .then(result => handleOutput(result))
  .catch(error => console.log('error', error));

//Process output
function handleOutput(value){
  console.log(value)
  console.log("")
  console.log(value.result)
}