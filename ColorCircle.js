const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomColor(minAlp, maxAlp) {
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * maxAlp + minAlp})`
}

function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.dx = Math.random() * 0.45 + 0.05;
  this.dy = Math.random() * 0.45 + 0.05;
  if (Math.round(Math.random()) < 1) {
    this.dx = -this.dx
  }
  if (Math.round(Math.random()) < 1) {
    this.dy = -this.dy
  }

  this.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }

  this.animate = function() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.draw();
  }
}

function Background(width, height, minAlp, maxAlp) {
  this.width = width;
  this.height = height;
  this.minAlp = minAlp;
  this.maxAlp = maxAlp;
  this.color = 'rgb(255, 255, 255, 1)';

  this.draw = function() {
    let linGrad = ctx.createLinearGradient(0, 0, this.width, 0);
    linGrad.addColorStop(0, "#fff");
    linGrad.addColorStop(1, this.color);

    ctx.fillStyle = linGrad;
    ctx.fillRect(0, 0, this.width, this.height);
  }
  
  this.changeColor = function() {
    this.color = randomColor(this.minAlp, this.maxAlp);
  }
}

let background = new Background(canvas.width, canvas.height, 0.1, 0.15);
background.changeColor();

const objs = []
for (let i = 0; i < Math.floor(Math.random() * 50) + 50; i++) {
  const radius = Math.floor((Math.random() * 50)) + 10;
  const x = Math.random() * (canvas.width - radius * 2) + radius;
  const y = Math.random() * (canvas.height - radius * 2) + radius;
  const color = randomColor(0.3, 0.7);
  objs.push(new Circle(x, y, radius, color));
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  for (let i = 0; i < objs.length; i++) {
    let obj = objs[i];
    obj.animate();
  }
  requestAnimationFrame(update);
}

update();