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
  
  // function sendDataToServer(message) {
  // 서버로 데이터를 전송하는 코드
  //   fetch("/saveData", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ message: message }),
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Data saved on the server:", data);
  //   })
  //   .catch((error) => {
  //     console.error("Error while saving data:", error);
  //   });
  // }
})