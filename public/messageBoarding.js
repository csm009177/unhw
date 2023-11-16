document.addEventListener("DOMContentLoaded", () =>{
  const submit = document.getElementById("submit")
  const boarding = document.getElementById("boarding")
  const inputBox = document.getElementById("inputBox")
  boarding.style.alignContent = "left"
  submit.addEventListener("click", function () {
  const message = inputBox.value;
    if (message.trim() !== "") {
      const messageElement = document.createElement("div");
      messageElement.textContent = `user:${message}`;
      boarding.appendChild(messageElement);
      inputBox.value = "";
      // 데이터를 서버에 전송
      // sendDataToServer(message);
    }
  })
})
