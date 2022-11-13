import fetch from "node-fetch";
//import data from './busData.json';
import fs from "fs";
import { createRequire } from "module";

async function displayer(){
  var token = await getToken() // to help us see what values we are getting
  document.getElementById("change").innerHTML = token;
}

async function theBus(){
 // let test = require("./busData.json")
  // let test;
  // console.log("hi");
  //  fs.readFile('./busData.json', function(err, jsonString) => {
  //    test = JSON.parse(jsonString);
  //    console.log(test);
  //   });
  // let dataLength = test.length;  
  // let busData=[];
  // for (let i=0;i<dataLength; i++){
  //     busData.push([test[i].latitude, test[i].longitude, test[i].frequency]);
      
  // }
  // console.log(busData);
  // return busData;
  console.log("hi");
  
  const require = createRequire(import.meta.url);
  const busData = require("./busData.json");
  console.log(busData);
  let arr=[]
  let i=0;
  for (let b of busData){
    let info=[];
    info[0]=b.latitude;
    info[1]=b.longitude;
    info[2]=b.frequency;
    arr[i]=info;
    i++;
  }

}

async function getToken(){
  const response = await fetch('http://localhost:8000/gettoken'); 
  const json = await response.json(); // receive token and parse
  return json.token;
}

 async function getTrips(latlong){
  const response = await fetch("http://localhost:8000/gettrips?latlong=" + latlong);
  const json = await response.json(); //receive Inrix trip data based on given latitude and longitude values
  return json;
}

 async function getPOI(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  const response = await fetch("https://api.opentripmap.com/0.1/en/places/bbox?lon_min=-122.541&lon_max=-122.341&lat_min=37.699&lat_max=37.858&rate=2&format=json&limit=1000&apikey=5ae2e3f221c38a28845f05b6ba0fac35c7abb4081c482004315ba987", requestOptions);
  const json = await response.json(); //contacting external API for Points of Interests
  return json;
}

(async () => {
  console.log(await getToken()) // keeps everything together
})();

//get the poi locations
    //store in array
    async function getPOIInfo(){
      let result =await getPOI();
     // console.log(result);
      let arr =[];
      let i=0;
      for(let poi of result){
          let loc = [];
          loc[1]= poi.point.lon;
          loc[0]=poi.point.lat;
          arr[i]=loc;
          i++;
      }
      // for(let stuff of arr){
      //   console.log(stuff[0]+" "+stuff[1]);
      // }
      return arr
  }
  async function crowds(pois){
      let pop = []
      let i=0;
      for(let l of pois ){
          let info = []
          info[0]=l[0];
          info[1]=l[1];
          let res =await getTrips(l[0].toString()+"%7C"+l[1].toString());
          info[2]=res.data.length;
          pop[i]=info;
          i++
      }
      return pop
  }
  function startHelper(busses, checkNum, checkPlace){
      let on=busses[checkPlace][0];
      if(on>checkNum-.0036&&on<checkNum+.0036&&busses[checkPlace-1][0]<checkNum-.0035){
          return checkPlace;
      }
      else if(on>checkNum-.0036&&on<checkNum+.0036&&busses[checkPlace-1][0]>checkNum-.0035){
          return startHelper(busses, checkNum, checkPlace-1);
      }
      else if(on>checkNum+.0036){
          return startHelper(busses, checkNum, checkPlace-1);
      }
      else{
          return startHelper(busses, checkNum, checkPlace+1);
      }
      
  }
  function compute(busses,demand ){
      //for each busses
      //.0036
      for(let b =0;b<demand.length-1;b++){
         //get start position
         let start;
         if(busses[0][0]==demand[b][0]-.0036){
          start=0;
         }
         else{
          start=startHelper(busses, demand[b][0], busses.length/2 );
         }
         while(busses[start][0]<=demand[b][0]+.0036){
          if(busses[start][1]>demand[b][1]-.0036&&busses[start][1]<demand[b][1]+.0036){
              busses[start][3]+=demand[b][2];
          }
          start++
         }
      }
      let finalList=[];
      let i=0;
      let min=Number.MAX_VALUE;
      let max=Number.MIN_VALUE;
      for(let b of busses){
          if(b[3]!=0){
              b[2]=(b[2]*20)-b[3];
              if(b[2]>max){
                  max=b[2];
              }
              if(b[2]<min){
                  min=b[2];
              }
              finalList[i]=b;
              i++;
          }
      }
      
      for (let b of finalList){
          if(b[2]>=0){
              b[3]=b[2]/(max/5);
          }
          if(b[2]<0){
              b[3]=b[2]/(min/5);
          }
      }
      for (let stuff of finalList){
        console.log(stuff[0]+" "+stuff[1]+" "+stuff[2]+" "+stuff[3]+" ");
      }
      return finalList;
          //run distance for each demand
          //if the distance is within range add the demand to the busses
      //compute and save the difference format: [lat, lon, difference]

  }
async  function passer(){
  let pois = await getPOIInfo();
  let demand = await crowds(pois);
  let busses = await theBus();
  let finalComp= compute(busses, demand);
  return finalComp;
}

passer();
//get the bus stop info
  //info gotten is x and y and the frequency of busses
//run trade areas for poi
//compute the info from poi
//group poi with bus stop
//find difference


