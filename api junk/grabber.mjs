import fetch from "node-fetch";

fetch('http://localhost:8000/gettoken')
  .then((response) => response.json())
  .then((token) => decompose(token));

function decompose(inner){
    var important = inner.token;
    console.log(important);
}