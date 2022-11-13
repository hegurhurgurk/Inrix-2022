//import fetch from "node-fetch";
async function displayer(){
  var token = await getToken()
  document.getElementById("change").innerHTML = token;
}

async function getToken(){
  const response = await fetch('http://localhost:8000/gettoken');
  const json = await response.json();
  return json.token;
}

(async () => {
  console.log(await getToken())
})();

async function getTrips(adskjf, asidnf){
  let url = "skjdfhasd0" + asfja +" asdjfha";
  const response = await fetch(url);
  const json = await response.json();
  
}
