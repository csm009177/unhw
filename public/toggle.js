// mode toggle
let toggle = true;
const modeToggle = document.getElementById("modeToggle")
modeToggle.style.color = "green"
modeToggle.addEventListener("click", ()=>{
  if (toggle === true) {
    toggle = false;
    modeToggle.innerHTML = "expert"
    modeToggle.style.color = "red";
    console.log(toggle)
  } else {
    toggle = true; 
    modeToggle.innerHTML = "normal"
    modeToggle.style.color = "green";
    console.log(toggle)
  }
})