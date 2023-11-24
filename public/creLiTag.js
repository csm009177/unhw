
const addButton =document.getElementById("addButton")
const sideCont = document.getElementById("sideCont")

// cre Li tag with input.value
addButton.addEventListener("click", (hashName) => {
  const makeLi = document.createElement("li");
  makeLi.innerHTML = `<a href = "#${hashName}" >Click me</a>`;
  sideCont.appendChild(makeLi);
});


