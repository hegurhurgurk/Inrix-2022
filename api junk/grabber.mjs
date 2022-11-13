//import fetch from "node-fetch";
async function displayer(){
  var token = await getTrips()
  document.getElementById("change").innerHTML = token;
}

async function getToken(){
  const response = await fetch('http://localhost:8000/gettoken');
  const json = await response.json();
  return json.token;
}

async function getTrips(latlong){
  const response = await fetch("http://localhost:8000/gettrips?latlong=" + latlong);
  const json = await response.json();
  return json;
}

async function getPOI(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  const response = await fetch("https://api.opentripmap.com/0.1/en/places/bbox?lon_min=-122.541&lon_max=-122.341&lat_min=37.699&lat_max=37.858&rate=2&format=json&limit=1000&apikey=5ae2e3f221c38a28845f05b6ba0fac35c7abb4081c482004315ba987", requestOptions);
  const json = await response.json();
  console.log(json[350].name);
  return json;
}

(async () => {
  console.log(await getToken())
})();
