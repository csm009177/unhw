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

  document.addEventListener("DOMContentLoaded", () => {
    submit.addEventListener("click", async function () {
      const message = inputBox.value;
      if (message.trim() !== "") {
        try {
          const response = await fetch('/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
          });

          const data = await response.json();
          console.log(data.message);
          inputBox.value = "";
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });
  });
})