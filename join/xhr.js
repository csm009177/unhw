    // Create XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      // 상태 체크 readystat==4 : 요청완료 응답받음 xhr.status == 200
      if (xhr.readyState == 4 && xhr.status == 200) {
        // JSON parse response text and put in variation
        let json = JSON.parse(xhr.responseText);
        // Access the 'name' property and create a list
        let board = document.getElementById('board');

        // looking for joson text in json length
        for (let i = 0; i < json.length; i++) {
          
          // cre new li tag for each text
          let li = document.createElement('li');
          li.textContent = json[i].color;
          board.appendChild(li);       
        }
      }
    };

    xhr.open("GET", "userData.json", true);
    xhr.send();