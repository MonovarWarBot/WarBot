let data = new Array();
const root = document.querySelector("#root");
const add = document.querySelector("#add");
const form = document.querySelector("#form");
const inputs = document.querySelector("#inputs");
const combate = document.querySelector("#combate");
const participantes = document.querySelector("#participantes");
let localData = JSON.parse(localStorage.getItem("data"));
let localDataHistory = JSON.parse(localStorage.getItem("history"));
let historyData = [];

if (localData !== null) {
  data = localData;
  historyData = localDataHistory;
  localDataFound();
}

function acction() {
  let vivos = aliveComprobe();
  let random = randomSelect();

  if (vivos) {
    form.remove();
    combate.remove();
    participantes.remove();
    localStorage.clear();
    for (i = 0; i < data.length; i++) {
      if (data[i][1] == "alive") {
        ganador = data[i][0];
      }
    }
    let newRoot = document.createElement("h1");
    newRoot.innerHTML = `Ganador/a: <span>${ganador}</span>`;

    root.parentNode.replaceChild(newRoot, root);
  } else {
    let ganadorRonda = Math.floor(Math.random() * random.length);
    historyData.push([
      data[random[0]][0],
      data[random[1]][0],
      data[random[ganadorRonda]][0]
    ]);
    localStorage.setItem("history", JSON.stringify(historyData));
    console.log(historyData);

    let res =
      '<thead><tr><th scope="col">Nombres</th><th scope="col">Ganador</th></tr></thead>';
    for (let i = 0; i < historyData.length; i++) {
      res += `<thead><tr><th scope="col">${historyData[i][0]} VS ${
        historyData[i][1]
      }</th> <th scope="col" class="ganador">${
        historyData[i][2]
      }</th></tr></thead>`;
    }
    root.innerHTML = res;

    random.splice(ganadorRonda, 1);
    data[random[0]][1] = "dead";
    let nombrePart = "";
    for (let i = 0; i < data.length; i++) {
      nombrePart += `<span class="${data[i][1]}">${data[i][0]}</span>, `;
    }
    participantes.innerHTML = nombrePart;
    localStorage.setItem("data", JSON.stringify(data));
  }
}

//seleccion aleatoria
function randomSelect() {
  let vivos = aliveComprobe();
  if (vivos) {
    return false;
  } else {
    do {
      select1 = Math.floor(Math.random() * data.length);
      select2 = Math.floor(Math.random() * data.length);
    } while (
      select1 === select2 ||
      data[select1][1] == "dead" ||
      data[select2][1] == "dead"
    );

    return [select1, select2];
  }
}
//comprobar vivos
function aliveComprobe() {
  var alive = 0;
  for (let i = 0; i < data.length; i++) {
    let position = data[i][1];
    if (position !== "dead") {
      alive = alive + 1;
    }
  }
  if (alive < 2) {
    return true;
  } else {
    return false;
  }
}
//Inputs and add Event
add.addEventListener("click", function(event) {
  event.preventDefault();
  const dataToAdd = document.querySelectorAll(".data_to_add");
  let nombrePart = "";
  for (let i = 0; i < dataToAdd.length; i++) {
    data.push([dataToAdd[i].value, "alive"]);
    nombrePart += `<span class="alive">${dataToAdd[i].value}</span>, `;
  }
  console.log(data);
  localStorage.setItem("data", JSON.stringify(data));
  form.style.display = "none";
  participantes.innerHTML = nombrePart;
  combate.style.display = "block";
});
function localDataFound() {
  let nombrePart = "";
  for (let i = 0; i < data.length; i++) {
    nombrePart += `<span class="${data[i][1]}">${data[i][0]}</span>, `;
  }
  form.style.display = "none";
  participantes.innerHTML = nombrePart;
  combate.style.display = "block";

  let res =
    '<thead><tr><th scope="col">Nombres</th><th scope="col">Ganador</th></tr></thead>';
  for (let i = 0; i < historyData.length; i++) {
    res += `<thead><tr><th scope="col">${historyData[i][0]} VS ${
      historyData[i][1]
    }</th> <th scope="col" class="ganador">${
      historyData[i][2]
    }</th></tr></thead>`;
  }
  root.innerHTML = res;
}
function addInput() {
  let input = document.createElement("input");
  input.setAttribute("class", "data_to_add"),
    input.setAttribute("type", "text"),
    inputs.appendChild(input);
}
function removeInput() {
  const dataToAdd = document.querySelectorAll(".data_to_add");
  let lastChild = dataToAdd.length - 1;
  if (lastChild > 1) {
    dataToAdd[lastChild].remove();
  }
}
