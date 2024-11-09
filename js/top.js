document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myCanvas").style.display = "none";
});

function changeImage() {
  const top2D = document.querySelector(".top-2D");
  const canvas = document.getElementById("myCanvas");
  const button = document.getElementById("change-button");
  if (button.src.includes("2D-button.png")) {
    button.src = "assets/images/3D-button.png";
  } else {
    button.src = "assets/images/2D-button.png";
  }
  if (top2D.style.display === "none") {
    // 2Dセクションを表示し、キャンバスを非表示にする
    top2D.style.display = "block";
    canvas.style.display = "none";
  } else {
    // 2Dセクションを非表示にし、キャンバスを表示する
    top2D.style.display = "none";
    canvas.style.display = "block";
  }
}
