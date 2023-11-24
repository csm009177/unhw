
const addButton =document.getElementById("addButton")
const sideCont = document.getElementById("sideCont")

// cre Li tag with input.value
let count=1;
addButton.addEventListener("click", () => {
  const makeLi = document.createElement("li");
  makeLi.innerHTML = `<a href = "#newestimate${count}" >new estimate${count}</a>`;
  sideCont.appendChild(makeLi);
  count=count+1;
});


