//import fetch from "node-fetch";
async function displayer(){
  var token = await getToken()
  document.getElementById("change").innerHTML = token;
}

async function getToken(){
  // fetch('http://localhost:8000/gettoken')
  //   .then((response) => {return response.json();})
  //   .then((json) => {token = json})
  const response = await fetch('http://localhost:8000/gettoken');
  const json = await response.json();
  return json.token;
}

(async () => {
  console.log(await getToken())
})();
