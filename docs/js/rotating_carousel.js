window.addEventListener('load', () => {
  var
    backfaces = document.querySelectorAll('.backface')
  ;

  for (var i = 0; i < backfaces.length; i++) {
    backface(backfaces[i]);
  }
});

function backface(root) {
  var
    figure = root.querySelector('figure'),
    nav = root.querySelector('nav'),
    images = figure.children,
    n = images.length,
    gap = root.dataset.gap || 0,
    bfc = 'bfc' in root.dataset,

    theta =  2 * Math.PI / n,
    currImage = 0
  ;

  setupBackface(n, parseFloat(getComputedStyle(images[0]).width));
  window.addEventListener('resize', () => {
    setupBackface(n, parseFloat(getComputedStyle(images[0]).width))
  });

  setupNavigation();

  function setupBackface(n, s) {
    var
      apothem = s / (2 * Math.tan(Math.PI / n))
    ;

    figure.style.transformOrigin = `50% 50% ${- apothem}px`;

    for (var i = 0; i < n; i++)
      images[i].style.padding = `${gap}px`;
    for (i = 1; i < n; i++) {
      images[i].style.transformOrigin = `50% 50% ${- apothem}px`;
      images[i].style.transform = `rotateY(${i * theta}rad)`;
    }
    if (bfc)
      for (i = 0; i < n; i++)
         images[i].style.backfaceVisibility = 'hidden';

    rotateBackface(currImage);
  }

  function setupNavigation() {
    nav.addEventListener('click', onClick, true);

    function onClick(e) {
      e.stopPropagation();

      var t = e.target;
      if (t.tagName.toUpperCase() != 'BUTTON')
        return;

      if (t.classList.contains('next')) {
        currImage++;
      }
      else {
        currImage--;
      }

      rotateBackface(currImage);
    }

  }

  function rotateBackface(imageIndex) {
    figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
  }

}
