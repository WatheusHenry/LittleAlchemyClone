function drag(ev, isReDrag = false) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    if (isReDrag) {
      ev.dataTransfer.setData("isReDrag", "true");
    } else {
      ev.dataTransfer.setData("isReDrag", "false");
    }
  }

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/plain");
    var isReDrag = ev.dataTransfer.getData("isReDrag");
    var draggedElement = document.getElementById(data);
  
    // Verifica se é um re-arraste
    if (isReDrag) {
      var droppableRect = ev.target.getBoundingClientRect();
      var x = ev.clientX - droppableRect.left - draggedElement.width / 2;
      var y = ev.clientY - droppableRect.top - draggedElement.height / 2;
  
      draggedElement.style.position = "absolute";
      draggedElement.style.left = x + "px";
      draggedElement.style.top = y + "px";
  
      ev.target.appendChild(draggedElement);
    } else {
      // Cria uma nova imagem para o primeiro arraste
      var newImage = document.createElement("img");
      newImage.src = draggedElement.src;
      newImage.alt = draggedElement.alt;
      newImage.id = data;
      newImage.classList.add("draggable", "teste");
      newImage.style.position = "absolute";
  
      var droppableRect = ev.target.getBoundingClientRect();
      var x = ev.clientX - droppableRect.left - newImage.width / 2;
      var y = ev.clientY - droppableRect.top - newImage.height / 2;
  
      newImage.style.left = x + "px";
      newImage.style.top = y + "px";
  
      newImage.ondragstart = function (event) {
        drag(event, true);
      };
  
      ev.target.appendChild(newImage);
    }
  }
  


function allowDrop(ev) {
  ev.preventDefault();
}

function clearDroppable() {
  var droppableDiv = document.getElementById("droppableContainer");
  while (droppableDiv.firstChild) {
    droppableDiv.removeChild(droppableDiv.firstChild);
  }
}

//
//
//
// Lista de nomes de arquivos de imagem
var initial = ["fire", "water", "earth", "air"];
var all = [
  "fire",
  "water",
  "earth",
  "air",
  "pressure",
  "energy",
  "dust",
  "lava",
  "rain",
  "mud",
  "steam",
  "sea",
  "wind",
  "stone",
  "atmosphere",
  "earthquake",
  "gunpowder",
  "salt",
  "volcano",
  "granite",
  "obsidian",
  "brick",
  "plant",
  "flood",
  "ocean",
  "geyser",
  "sky",
  "sand",
  "wall",
  "fog",
  "mountain",
  "storm",
  "metal",
  "explosion",
  "swamp",
  "tsunami",
  "algae",
  "isle",
  "wave",
  "cotton",
  "grass",
  "tobacco",
  "seaweed",
  "garden",
  "moss",
  "coal",
  "ash",
  "cloud",
  "eruption",
  "hurricane",
  "rust",
  "sound",
  "atomic bomb",
  "grenade",
  "fireworks",
  "glass",
  "sun",
  "dew",
  "bullet",
  "archipelago",
  "steel",
  "electricity",
  "blade",
  "mountain range",
  "river",
  "beach",
  "horizon",
  "flower",
  "ivy",
  "diamond",
  "sandstorm",
  "clay",
  "cactus",
  "desert",
  "quicksand",
  "dune",
  "moon",
  "boiler",
  "sandstone",
  "life",
  "house",
  "pond",
  "bird",
  "scissors",
  "blender",
  "scythe",
  "sword",
  "golem",
  "pyramid",
  "oasis",
  "ring",
  "human",
  "light bulb",
  "wire",
  "pottery",
  "water lily",
  "sunflower",
  "glasses",
  "mirror",
  "telescope",
];

// Container das divs
const elementsContainer = document.getElementById("draggableContainer");

// Função para iniciar o arraste
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

// Loop para criar as divs com imagens
for (const filename of all) {
  const div = document.createElement("div");
  div.classList.add("divImage");
  div.id = filename;  
  div.setAttribute("draggable", true); 
  div.ondragstart = drag; 

  const img = document.createElement("img");
  img.src = `public/img/${filename}.png`; 
  img.alt = `${filename}`;
  img.id = filename;
  div.classList.add("draggable");
  img.setAttribute("draggable", true);
  img.ondragstart = drag;
  img.ondragstart = function (event) {
    drag(event, false);
  };

  elementsContainer.appendChild(img);
}
