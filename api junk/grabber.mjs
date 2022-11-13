import fetch from "node-fetch";
//import data from './busData.json';
import fs from "fs";
import { createRequire } from "module";

async function displayer(){
  var token = await getToken() // to help us see what values we are getting
  document.getElementById("change").innerHTML = token;
}

async function theBus(){
  const require = createRequire(import.meta.url);
  const busData = require("./busData.json");
  //console.log(busData);
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
  return arr;
}

async function getToken(){
  const response = await fetch('http://localhost:8000/gettoken'); 
  const json = await response.json(); // receive token and parse
  return json.token;
}

 async function getTrips(latlong){
  const response = await fetch("http://localhost:8000/gettrips?latlong=" + latlong+"");
 
  const json = await response.json(); //receive Inrix trip data based on given latitude and longitude values
 // console.log(json);
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
         
          loc[1]= poi.point.lat;
          loc[0]=poi.point.lon;
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
        
          let res =await getTrips(l[1].toString()+"|"+l[0].toString());
          l[2]=res.data.length;
          pop[i]=l;
          i++
      }
      return pop
  }
  // function startHelper(busses, checkNum, checkPlace){
  //   let onArr= busses[checkPlace]; 
  //  // console. log (busses);
  //   console.log (checkPlace);
  //   let on=onArr[0];
  //   let counter=0;

  //   while(on<checkNum-.0036||on>checkNum+.0036){
  //       chec
  //       on=onArr[counter];
  //   }
  //   return counter;
      // if(on>checkNum-.0036&&on<checkNum+.0036&&onArrL[0]<checkNum-.0035){
      //     return checkPlace;
      // }
      // else if((on>checkNum-.0036)&&(on<checkNum+.0036)&&(busses[checkPlace-1][0]>checkNum-.0035)){
      //     return startHelper(busses, checkNum, checkPlace-1);
      // }
      // else if(on>checkNum+.0036){
      //     return startHelper(busses, checkNum,Math.floor(checkPlace/2));
      // }
      // else{
      //     return startHelper(busses, checkNum, checkPlace+1);
      // }
      
  //}
  function compute(busses,demand ){
    //Precondition: busses holds bus data demand holds inrix data lat, long, amount of people
    //Postcondition returns 2d array of x y and color coordinates
      //for each busses
      //.0036

    //loop through demand
    let walkingDistance=0.0036
    outerLoop:for (let demandPos=0; demandPos<demand.length; demandPos++){
       // console.log("demandPos "+demandPos)

      //loop through busses
     innerLoop:   for (let busPos=0; busPos<busses.length; busPos++){
      //console.log("busPos "+busPos)
            if (busses[busPos][1]>demand[demandPos][1]-walkingDistance ){

             // console.log("first if bus lat:"+busses[busPos][1]+" , demand lat:"+(demand[demandPos][1]-walkingDistance) )
              if (busses[busPos][1]>demand[demandPos][1]+walkingDistance){
                //console.log("second if")
                break innerLoop;
              }
              if(busses[busPos][0]<=demand[demandPos][0]+walkingDistance&&busses[busPos][0]>=demand[demandPos][0]-walkingDistance){
                //console.log("third if")
                if(busses[busPos][3]==null){
                  busses[busPos][3]=0;
                }
              busses[busPos][3]+=demand[demandPos][2];
              //console.log("running total " +busPos+" "+busses[busPos][3]);
              }
            }


        }
    }
      let finalList=[];
      let i=0;
      let min=Number.MAX_VALUE;
      let max=Number.MIN_VALUE;
      for(let b of busses){
          if(b[3]!=null){
            //console.log(b[3]);
              b[2]=(b[2]*5*7)-(b[3]*3);
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
              b[3]=Math.floor(b[2]/(max/5));
          }
          if(b[2]<0){
              b[3]=Math.floor(b[2]/(min/5));
          }
      }
      for (let stuff of finalList){
       // console.log(stuff[0]+" "+stuff[1]+" "+stuff[2]+" "+stuff[3]+" ");
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
  //returns 2d array [[x,y,color]...]
  return finalComp;
}
  let finalComp= await passer();
	var keys = ["long", "lat", "disc", "bucket"];
	var newArr = finalComp;
	var formatted = [],
   data = newArr,
   cols = keys,
   l = cols.length;
	for (var i=0; i<data.length; i++) {
			var d = data[i],
					o = {};
			for (var j=0; j<l; j++)
					o[cols[j]] = d[j];
			formatted.push(o);
	}
 let JSONout=JSON.stringify(formatted);
  console.log(JSONout);








const myJson = JSON.stringify(passer());
console.log("hi");
console.log(myJson);
//get the bus stop info
  //info gotten is x and y and the frequency of busses
//run trade areas for poi
//compute the info from poi
//group poi with bus stop
//find difference


