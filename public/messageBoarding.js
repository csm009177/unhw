// public/messageBoarding.js
document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit");
  const boarding = document.getElementById("boarding");
  const inputBox = document.getElementById("inputBox");

  boarding.style.alignContent = "left";

  submit.addEventListener("click", () => {
    const message = inputBox.value.trim();

    if (message !== "") {
      const messageElement = document.createElement("div");
      messageElement.textContent = `user: ${message}`;
      boarding.appendChild(messageElement);
      inputBox.value = "";

      // 서버에 데이터 전송
      sendDataToServer({ message });
    }
  });
});

// 서버에 데이터 전송 함수
function sendDataToServer(data) {
  fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.error('Error:', error));
}