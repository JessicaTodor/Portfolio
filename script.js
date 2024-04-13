//  cursor
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#867fef",
  "#857fd9",
  "#7974c0",
  "#7974c0",
  "#6f6ab7",
  "#645fac",
  "#5b56a1",
  "#524d98",
  "#4a458f",
  "#413c84",
  "#38347a",
  "#2f2c70",
  "#282567",
  "#201d5a",
  "#18164c",
  "#131142",
  "#0f0e3b",
  "#0a0a31",
  "#060624",
  "#03031e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();