function changeImage() {
  const button = document.getElementById("change-button");
  if (button.src.includes("2D-button.png")) {
    button.src = "assets/images/3D-button.png";
  } else {
    button.src = "assets/images/2D-button.png";
  }
}
