function submit() {
  let name = document.getElementById("name").value;
  document.getElementById(
    "app"
  ).innerHTML = `<div class='welcome'><h2>Hi ${name}, Happy new year!! <i class="far fa-laugh-beam"></i></h2></div>`;
  let canvas = document.querySelector("#myCanvas");
  canvas.classList.add("show");
  canvas.classList.remove("off");
}
