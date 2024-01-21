document.addEventListener("DOMContentLoaded", function () {
  interact(".draggable").draggable({
    onmove: function (event) {
      var target = event.target;

      // Mantém o elemento no mesmo lugar
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      // Atualiza a posição do elemento
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";

      // Atualiza os dados-x e dados-y para a próxima vez
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    onend: function (event) {
      var target = event.target;

      // Limpa os dados-x e dados-y
      // target.removeAttribute('data-x');
      // target.removeAttribute('data-y');
    },
  });
});
$(document).ready(function () {
    $.get('/list-images', function (data) {
      const elementsContainer = $('#elements-container');
      
      data.forEach(function (filename) {
        const div = $('<div class="draggable"></div>');
        const img = $('<img>').attr('src', 'img/' + filename).attr('alt', '');
  
        div.append(img);
        elementsContainer.append(div);
      });
    });
  });
