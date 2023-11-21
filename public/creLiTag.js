// cre Li tag with input.value
const addButton =document.getElementById("addButton")
const sideCont = document.getElementById("sideCont")
function createElement(type, props, ...children) {
  return { type, props, children};
}
const testState = [
  { hash: '#home', text: 'Home' }
]
addButton.addEventListener("click", ()=>{
  const makeLi = document.createElement("a", {href:testState.hash}, document.createElement("a"))
  makeLi.innerHTML = "type your title";
  sideCont.appendChild(makeLi)
})


function component(testState) {
  const menuItems = [];
    const menuItem = createElement('a', {href:testState.hash}, testState.text)
    menuItems.push(menuItem);
  }
  return createElement('div', {style:"width:100vw; display:flex; justify-content: space-between; "}, ...menuItems);



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