// const maxFirework = 10,
//   maxSparks = 60;
// let canvas = document.getElementById('myCanvas');
// let context = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// let fireworks = [];

// for (let i = 0; i < maxFirework; i++) {
//   let firework = {
//     sparks: []
//   };
//   for (let n = 0; n < maxSparks; n++) {
//     let spark = {
//       vx: Math.random() * 5 + .5,
//       vy: Math.random() * 5 + .5,
//       weight: Math.random() * .3 + .03,
//       red: Math.floor(Math.random() * 2),
//       green: Math.floor(Math.random() * 2),
//       blue: Math.floor(Math.random() * 2)
//     };
//     if (Math.random() > .5) spark.vx = -spark.vx;
//     if (Math.random() > .5) spark.vy = -spark.vy;
//     firework.sparks.push(spark);
//   }
//   fireworks.push(firework);
//   resetFirework(firework);
// }
// window.requestAnimationFrame(explode);

// function resetFirework(firework) {
//   firework.x = Math.floor(Math.random() * canvas.width);
//   firework.y = canvas.height;
//   firework.age = 0;
//   firework.phase = 'fly';
// }

// function explode() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   fireworks.forEach((firework,index) => {
//     if (firework.phase == 'explode') {
//         firework.sparks.forEach((spark) => {
//         for (let i = 0; i < 10; i++) {
//           let trailAge = firework.age + i;
//           let x = firework.x + spark.vx * trailAge;
//           let y = firework.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
//           let fade = i * 20 - firework.age * 2;
//           let r = Math.floor(spark.red * fade);
//           let g = Math.floor(spark.green * fade);
//           let b = Math.floor(spark.blue * fade);
//           context.beginPath();
//           context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
//           context.rect(x, y, 4, 4);
//           context.fill();
//         }
//       });
//       firework.age++;
//       if (firework.age > 100 && Math.random() < .05) {
//         resetFirework(firework);
//       }
//     } else {
//       firework.y = firework.y - 10;
//       for (let spark = 0; spark < 15; spark++) {
//         context.beginPath();
//         context.fillStyle = 'rgba(' + index * 50 + ',' + spark * 17 + ',0,1)';
//         context.rect(firework.x + Math.random() * spark - spark / 2, firework.y + spark * 4, 4, 4);
//         context.fill();
//       }
//       if (Math.random() < .001 || firework.y < 200) firework.phase = 'explode';
//     }
//   });
//   window.requestAnimationFrame(explode);
// }

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
// let imageBackground = document.getElementById("image-background");
// console.log(imageBackground);
// ctx.drawImage(imageBackground, 0, 0, 1000, 1030) ;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// init
// ctx.fillStyle = "#000";
// ctx.fillRect(0, 0, canvas.width, canvas.height);
// objects
var listFire = [];
var listFirework = [];
var fireNumber = 12;
var center = { x: canvas.width / 2, y: canvas.height / 3 };
var range = canvas.width / 7;
for (var i = 0; i < fireNumber; i++) {
  var fire = {
    x: (Math.random() * range) / 2 - range / 10 + center.x,
    y: Math.random() * range * 2 + canvas.height,
    size: Math.random() + 0.5,
    fill: "#fd1",
    vx: Math.random() - 0.5,
    vy: -(Math.random() + 4),
    ax: Math.random() * 0.02 - 0.01,
    far: Math.random() * range + (center.y - range),
  };
  fire.base = {
    x: fire.x,
    y: fire.y,
    vx: fire.vx,
  };
  //
  listFire.push(fire);
}

function randColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var color = "rgb($r, $g, $b)";
  color = color.replace("$r", r);
  color = color.replace("$g", g);
  color = color.replace("$b", b);
  return color;
}

(function loop() {
  requestAnimationFrame(loop);
  update();
  draw();
})();

function update() {
  for (var i = 0; i < listFire.length; i++) {
    var fire = listFire[i];
    //
    if (fire.y <= fire.far) {
      // case add firework
      var color = randColor();
      for (var i = 0; i < fireNumber * 5; i++) {
        var firework = {
          x: fire.x,
          y: fire.y,
          size: Math.random() + 1.5,
          fill: color,
          vx: Math.random() * 5 - 2.5,
          vy: Math.random() * -5 + 1.5,
          ay: 0.05,
          alpha: 1,
          life: Math.round((Math.random() * range) / 2) + range / 2,
        };
        firework.base = {
          life: firework.life,
          size: firework.size,
        };
        listFirework.push(firework);
      }
      // reset
      fire.y = fire.base.y;
      fire.x = fire.base.x;
      fire.vx = fire.base.vx;
      fire.ax = Math.random() * 0.02 - 0.01;
    }
    //
    fire.x += fire.vx;
    fire.y += fire.vy;
    fire.vx += fire.ax;
  }

  for (var i = listFirework.length - 1; i >= 0; i--) {
    var firework = listFirework[i];
    if (firework) {
      firework.x += firework.vx;
      firework.y += firework.vy;
      firework.vy += firework.ay;
      firework.alpha = firework.life / firework.base.life;
      firework.size = firework.alpha * firework.base.size;
      firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
      //
      firework.life--;
      if (firework.life <= 0) {
        listFirework.splice(i, 1);
      }
    }
  }
}

function draw() {
  // clear
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // re-draw
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = 1;
  for (var i = 0; i < listFire.length; i++) {
    var fire = listFire[i];
    ctx.beginPath();
    ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = fire.fill;
    ctx.fill();
  }

  for (var i = 0; i < listFirework.length; i++) {
    var firework = listFirework[i];
    ctx.globalAlpha = firework.alpha;
    ctx.beginPath();
    ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = firework.fill;
    ctx.fill();
  }
}
