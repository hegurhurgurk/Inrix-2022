import fetch from "node-fetch";

fetch('http://localhost:8000/gettoken')
  .then((response) => response.json())
  .then((token) => decompose(token));

function decompose(inner){
    var important = inner.token;
    console.log(important);
}


var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImNzVG9rZW4iOm51bGwsInVzZXJSb2xlIjoxLCJhcHBSb2xlIjo0LCJ1c2VySWQiOiI1MzIzY2YxNy1hNDNkLTQzZDktODRiZS1iYTRlNmU3ZmEyNDIiLCJhcHBJZCI6ImFiOGViYWQwLTQ3MGQtNDY5Zi05ODI1LWQ1YjgxNmVlZWU1YSIsImRldmVsb3BlcklkIjoiYTk0ODRiZGEtY2MxZC00YTdiLTgzMGQtYjJhNDZiYjgwY2Y3IiwiZXhwaXJ5IjoiMjAyMi0xMS0xM1QwNzozNzoyNi40OTg1NjM4WiIsImV4cCI6MTY2ODMyNTA0Niwicm9sZSI6InVzZXIifQ.Q9NKIWwmxWJ7hwbEMnF9CrJreYDGHwQDJX5A9N6_dXA");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};


function tradearea(latlong){

    fetch("https://trade-areas-api.inrix.com/v1/trips?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImNzVG9rZW4iOm51bGwsInVzZXJSb2xlIjoxLCJhcHBSb2xlIjo0LCJ1c2VySWQiOiI1MzIzY2YxNy1hNDNkLTQzZDktODRiZS1iYTRlNmU3ZmEyNDIiLCJhcHBJZCI6ImFiOGViYWQwLTQ3MGQtNDY5Zi05ODI1LWQ1YjgxNmVlZWU1YSIsImRldmVsb3BlcklkIjoiYTk0ODRiZGEtY2MxZC00YTdiLTgzMGQtYjJhNDZiYjgwY2Y3IiwiZXhwaXJ5IjoiMjAyMi0xMS0xM1QwNzozNzoyNi40OTg1NjM4WiIsImV4cCI6MTY2ODMyNTA0Niwicm9sZSI6InVzZXIifQ.Q9NKIWwmxWJ7hwbEMnF9CrJreYDGHwQDJX5A9N6_dXA&limit=10000&geoFilterType=circle&radius=20ft&points"+ latlong +"&od=destination", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}