// cre Li tag with input.value
const addButton =document.getElementById("addButton")
const sideCont = document.getElementById("sideCont")
addButton.addEventListener("click", ()=>{
  const makeLi = document.createElement("li")
  makeLi.innerHTML = "type your title";
  sideCont.appendChild(makeLi)
})

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