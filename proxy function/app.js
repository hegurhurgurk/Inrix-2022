const express = require('express');
const cors = require('cors');
const fetch = require("node-fetch");
const { response } = require('express');
const app = express();
const port = 8000;
app.set('json spaces', 2);
app.use(cors());
// to query, call: http://localhost:8000/gettoken

app.get('/gettoken', async function (req, res) {

    //Set up URL to query
    let appId = "00ji94fyg2";
    let hashToken = "MDBqaTk0ZnlnMnxUbW81bXZhMWtrMzJzRjZCbzE2dFgyd0NWNUxJWWFWMDZCczdsb1Qx";
    let url = `https://api.iq.inrix.com/auth/v1/appToken?appId=${appId}&hashToken=${hashToken}`;

    //Set up query method
    var requestOptions = {
        method: 'GET'
    };
    
    //Query INRIX for token
    let response = await fetch(url, requestOptions);
    let json = await response.json();
    let output = json.result.token;

    //Return token
    res.json({
        token: output,
    });
})

app.get('/gettrips', async function (req, res) {
    var latlong = req.query.latlong;
    //Set up URL to query
    // let appId = "00ji94fyg2";
    // let hashToken = "MDBqaTk0ZnlnMnxUbW81bXZhMWtrMzJzRjZCbzE2dFgyd0NWNUxJWWFWMDZCczdsb1Qx";
    let url = "https://trade-areas-api.inrix.com/v1/trips?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImNzVG9rZW4iOm51bGwsInVzZXJSb2xlIjoxLCJhcHBSb2xlIjo0LCJ1c2VySWQiOiI1MzIzY2YxNy1hNDNkLTQzZDktODRiZS1iYTRlNmU3ZmEyNDIiLCJhcHBJZCI6ImFiOGViYWQwLTQ3MGQtNDY5Zi05ODI1LWQ1YjgxNmVlZWU1YSIsImRldmVsb3BlcklkIjoiYTk0ODRiZGEtY2MxZC00YTdiLTgzMGQtYjJhNDZiYjgwY2Y3IiwiZXhwaXJ5IjoiMjAyMi0xMS0xM1QyMDowNzo1MS4xMDg4MTY0WiIsImV4cCI6MTY2ODM3MDA3MSwicm9sZSI6InVzZXIifQ.9G_B297y2uLLL5_9FCfQbz57rZvzFcYrXxIw4Fv-GjA&limit=10000&geoFilterType=circle&radius=20ft&points="+ latlong +"&od=destination";
    //var myHeaders = new Headers();
    //myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImNzVG9rZW4iOm51bGwsInVzZXJSb2xlIjoxLCJhcHBSb2xlIjo0LCJ1c2VySWQiOiI1MzIzY2YxNy1hNDNkLTQzZDktODRiZS1iYTRlNmU3ZmEyNDIiLCJhcHBJZCI6ImFiOGViYWQwLTQ3MGQtNDY5Zi05ODI1LWQ1YjgxNmVlZWU1YSIsImRldmVsb3BlcklkIjoiYTk0ODRiZGEtY2MxZC00YTdiLTgzMGQtYjJhNDZiYjgwY2Y3IiwiZXhwaXJ5IjoiMjAyMi0xMS0xM1QwNzozNzoyNi40OTg1NjM4WiIsImV4cCI6MTY2ODMyNTA0Niwicm9sZSI6InVzZXIifQ.Q9NKIWwmxWJ7hwbEMnF9CrJreYDGHwQDJX5A9N6_dXA");  
    
    var requestOptions = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImNzVG9rZW4iOm51bGwsInVzZXJSb2xlIjoxLCJhcHBSb2xlIjo0LCJ1c2VySWQiOiI1MzIzY2YxNy1hNDNkLTQzZDktODRiZS1iYTRlNmU3ZmEyNDIiLCJhcHBJZCI6ImFiOGViYWQwLTQ3MGQtNDY5Zi05ODI1LWQ1YjgxNmVlZWU1YSIsImRldmVsb3BlcklkIjoiYTk0ODRiZGEtY2MxZC00YTdiLTgzMGQtYjJhNDZiYjgwY2Y3IiwiZXhwaXJ5IjoiMjAyMi0xMS0xM1QyMDowNzo1MS4xMDg4MTY0WiIsImV4cCI6MTY2ODM3MDA3MSwicm9sZSI6InVzZXIifQ.9G_B297y2uLLL5_9FCfQbz57rZvzFcYrXxIw4Fv-GjA",
      },
      redirect: 'follow'
    };
    
    
    //Query INRIX for token
    let response = await fetch(url, requestOptions);
    let json = await response.json();
    let output = json.result;

    //Return token
    res.json(
        json,
    );
})

//Starting server using listen function
app.listen(port, function () {
    console.log("Server has been started at " + port);
})