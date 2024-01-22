document.addEventListener("DOMContentLoaded", function () {
  elementsContainerLoop();
});

function drag(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
  if (ev.target.parentElement.id === "droppableContainer") {
    ev.dataTransfer.setData("isRedrag", "true");
  } else {
    ev.dataTransfer.setData("isRedrag", "false");
  }
}

var recipes = [
  ["pressure", ["air", "air"]],
  ["energy", ["air", "fire"]],
  ["dust", ["air", "earth"]],
  ["lava", ["earth", "fire"]],
  ["rain", ["air", "water"]],
  ["mud", ["earth", "water"]],
  ["steam", ["fire", "water"]],
  ["sea", ["water", "water"]],
  ["wind", ["air", "energy"]],
  ["stone", ["air", "lava"]],
  ["atmosphere", ["air", "pressure"]],
  ["earthquake", ["earth", "energy"]],
  ["gunpowder", ["dust", "fire"]],
  ["salt", ["fire", "sea"]],
  ["volcano", ["earth", "lava"]],
  ["granite", ["lava", "pressure"]],
  ["obsidian", ["lava", "water"]],
  ["brick", ["fire", "mud"]],
  ["plant", ["earth", "rain"]],
  ["flood", ["rain", "rain"]],
  ["ocean", ["sea", "sea"]],
  ["geyser", ["steam", "earth"]],
  ["sky", ["air", "cloud"]],
  ["sand", ["air", "stone"]],
  ["wall", ["brick", "brick"]],
  ["fog", ["cloud", "earth"]],
  ["mountain", ["earth", "earthquake"]],
  ["storm", ["cloud", "energy"]],
  ["metal", ["fire", "stone"]],
  ["explosion", ["fire", "gunpowder"]],
  ["swamp", ["mud", "plant"]],
  ["tsunami", ["earthquake", "ocean"]],
  ["algae", ["ocean", "plant"]],
  ["isle", ["ocean", "volcano"]],
  ["wave", ["ocean", "wind"]],
  ["cotton", ["cloud", "plant"]],
  ["grass", ["earth", "plant"]],
  ["tobacco", ["fire", "plant"]],
  ["seaweed", ["ocean", "plant"]],
  ["garden", ["plant", "plant"]],
  ["moss", ["plant", "stone"]],
  ["coal", ["plant", "pressure"]],
  ["ash", ["energy", "volcano"]],
  ["cloud", ["air", "steam"]],
  ["eruption", ["energy", "volcano"]],
  ["hurricane", ["energy", "wind"]],
  ["rust", ["air", "metal"]],
  ["sound", ["air", "wave"]],
  ["atomic bomb", ["energy", "explosion"]],
  ["grenade", ["explosion", "metal"]],
  ["fireworks", ["explosion", "sky"]],
  ["glass", ["fire", "sand"]],
  ["sun", ["fire", "sky"]],
  ["dew", ["fog", "grass"]],
  ["bullet", ["gunpowder", "metal"]],
  ["archipelago", ["isle", "isle"]],
  ["steel", ["coal", "metal"]],
  ["electricity", ["energy", "metal"]],
  ["blade", ["metal", "stone"]],
  ["mountain range", ["mountain", "mountain"]],
  ["river", ["mountain", "water"]],
  ["beach", ["ocean", "sand"]],
  ["horizon", ["ocean", "sky"]],
  ["flower", ["garden", "plant"]],
  ["ivy", ["plant", "wall"]],
  ["diamond", ["coal", "pressure"]],
  ["sandstorm", ["energy", "sand"]],
  ["clay", ["mud", "sand"]],
  ["cactus", ["plant", "sand"]],
  ["desert", ["sand", "sand"]],
  ["quicksand", ["sand", "swamp"]],
  ["dune", ["sand", "wind"]],
  ["moon", ["sky", "stone"]],
  ["boiler", ["metal", "steam"]],
  ["sandstone", ["sand", "stone"]],
  ["life", ["energy", "swamp"]],
  ["house", ["wall", "wall"]],
  ["pond", ["garden", "water"]],
  ["bird", ["air", "life"]],
  ["scissors", ["blade", "blade"]],
  ["blender", ["blade", "electricity"]],
  ["scythe", ["blade", "grass"]],
  ["sword", ["blade", "metal"]],
  ["golem", ["clay", "life"]],
  ["pyramid", ["desert", "stone"]],
  ["oasis", ["desert", "water"]],
  ["ring", ["diamond", "metal"]],
  ["human", ["earth", "life"]],
  ["light bulb", ["electricity", "glass"]],
  ["wire", ["electricity", "metal"]],
  ["pottery", ["fire", "clay"]],
  ["water lily", ["flower", "pond"]],
  ["sunflower", ["flower", "sun"]],
  ["glasses", ["glass", "glass"]],
  ["mirror", ["glass", "metal"]],
  ["telescope", ["glass", "sky"]],
];

var allRecipes = recipes.reduce((comb, [first, second]) => {
  if (!comb.hasOwnProperty(second)) comb[second] = [];
  comb[second].push(first);
  console.log(comb[second]);
  return comb;
}, {});



function combine(el1, el2) {
    let recipe = [el1, el2].sort().join(",");
    newElement = allRecipes[recipe];
  
    if (newElement && !initial.includes(newElement[0])) {
      initial.push(newElement[0]);
  
      // Criar o primeiro elemento de imagem
      const newImage1 = createNewElementImage(newElement);
      elementsContainer.appendChild(newImage1);
  
      // Criar o segundo elemento de imagem
      const newImage2 = createNewElementImage(newElement);
      document.getElementById("droppableContainer").appendChild(newImage2);
  
      // Remover os elementos originais
      const originalElement1 = document.getElementById(el1);
      const originalElement2 = document.getElementById(el2);
  
      if (originalElement1) {
        originalElement1.parentNode.removeChild(originalElement1);
      }
  
      if (originalElement2) {
        originalElement2.parentNode.removeChild(originalElement2);
      }
    }
  }
  

function createNewElementImage(newElement) {
  const newImage = document.createElement("img");
  newImage.src = `public/img/${newElement}.png`;
  newImage.id = newElement;
  newImage.alt = newElement;
  newImage.classList.add("dropped");
  newImage.setAttribute("draggable", true);
  newImage.ondragstart = function (event) {
    drag(event, false);
  };
  newImage.style.gridArea = `auto / auto / span 1 / span 1`;
  return newImage;
}

function areImagesClose(img1, img2, threshold) {
  var rect1 = img1.getBoundingClientRect();
  var rect2 = img2.getBoundingClientRect();

  return !(
    rect1.right < rect2.left - threshold ||
    rect1.left > rect2.right + threshold ||
    rect1.bottom < rect2.top - threshold ||
    rect1.top > rect2.bottom + threshold
  );
}

// Função para ser chamada quando duas imagens estiverem próximas
function onImagesClose(img1, img2) {
  combine(img1.id, img2.id);
  // Coloque sua lógica aqui
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text/plain");
  var isRedrag = ev.dataTransfer.getData("isRedrag") === "true";
  var draggedElement = document.getElementById(data);

  // Obtemos as coordenadas relativas ao contêiner de destino
  var droppableRect = ev.target.getBoundingClientRect();
  var x = ev.clientX - droppableRect.left - draggedElement.offsetWidth / 2;
  var y = ev.clientY - droppableRect.top - draggedElement.offsetHeight / 2;

  if (!isRedrag) {
    // Se não é um re-arraste, cria uma nova imagem
    var newImage = document.createElement("img");
    newImage.src = draggedElement.src;
    newImage.alt = draggedElement.alt;
    newImage.classList.add("draggable", "dropped");
    newImage.style.position = "absolute";
    newImage.style.left = x + "px";
    newImage.style.top = y + "px";
    newImage.id = data; // Atribuir o mesmo ID da imagem original
    newImage.setAttribute("draggable", true);
    newImage.ondragstart = drag;

    // Adiciona a nova imagem ao contêiner de destino
    ev.target.appendChild(newImage);
  } else {
    // Se é um re-arraste, move a imagem
    draggedElement.style.position = "absolute";
    draggedElement.style.left = x + "px";
    draggedElement.style.top = y + "px";
  }

  var droppedImage = document.getElementById(data);
  var images = document.querySelectorAll("#droppableContainer .draggable");

  images.forEach((img) => {
    if (img.id !== droppedImage.id && areImagesClose(droppedImage, img, 10)) {
      onImagesClose(droppedImage, img);
    }
  });
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

// Loop para criar as divs com imagens
function elementsContainerLoop() {
  for (const filename of initial) {
    const div = document.createElement("div");
    div.classList.add("divImage");
    div.id = filename;
    div.setAttribute("draggable", true);
    div.ondragstart = drag;

    const img = document.createElement("img");
    img.src = `public/img/${filename}.png`;
    img.alt = `${filename}`;
    img.id = filename;
    img.setAttribute("draggable", true);
    img.ondragstart = drag;
    img.ondragstart = function (event) {
      drag(event, false);
    };

    elementsContainer.appendChild(img);
  }
}
