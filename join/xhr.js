    // Create XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      // 상태 체크 readystat==4 : 요청완료 응답받음 xhr.status == 200
      if (xhr.readyState == 4 && xhr.status == 200) {
        // JSON parse response text and put in variation
        let json = JSON.parse(xhr.responseText);
        // Access the 'name' property and create a list
        let ul = document.getElementById('ul');

        // looking for joson text in json length
        for (let i = 0; i < json.length; i++) {
          
          // cre new li tag for each text
          let li = document.createElement('li');
          let p = document.createElement('p'); 
          // json 파일의 i번째 객체에 있는 key name의 정보를 불러온다
          li.textContent = json[i].color;
          // json 파일의 i번째 객체에 있는 key age의 정보를 불러온다
          p.textContent = json[i].color;
          ul.appendChild(li);
          ul.appendChild(p);
        
        }
      }
    };

    xhr.open("GET", "userData.json", true);
    xhr.send();