document.querySelectorAll('.box1, .box2, .box3').forEach(box => {
  box.addEventListener('touchstart', () => {
    box.classList.add('hovered');
    setTimeout(() => {
      box.classList.remove('hovered');
    }, 800); // lasts 0.8s
  });
});

document.querySelectorAll('.box1, .box2, .box3').forEach(box => {
  box.addEventListener('touchstart', () => {
    box.classList.add('hovered');
    setTimeout(() => {
      box.classList.remove('hovered');
    }, 800); // lasts 0.8s
  });
});
