
document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.getElementById("chat-container");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  
  sendButton.addEventListener("click", function () {
    const message = messageInput.value;
    if (message.trim() !== "") {
      const messageElement = document.createElement("div");
      messageElement.textContent = message;
      chatContainer.appendChild(messageElement);
      messageInput.value = "";
      // 데이터를 서버에 전송
      sendDataToServer(message);
    }
  });

  function sendDataToServer(message) {
    // 서버로 데이터를 전송하는 코드
    fetch("/save-json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data saved on the server:", data);
      })
      .catch((error) => {
        console.error("Error while saving data:", error);
      });
  }
});

