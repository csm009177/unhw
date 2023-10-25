function togColor(doc ,tagetId, before, after) {
  `<Script>
  let targetElement = ${doc}.getElementById(${tagetId})
  let togHandle = true;
  targetElement.style.color = '${after}'
  targetElement.addEventListener('click', ()=> {
    if (togHandle === true) {
      togHandle = false;
      targetElement.style.color = ${before};
      console.log(togHandle);
      // 핸들러가 참이라면 핸들러를 거짓으로 바꿔줘
    } else {
      togHandle = true; // 아니라면 핸들러를 참으로 바꿔줘
      targetElement.style.color = ${after};
      console.log(togHandle);
    }
  })
    // 초기 상태 설정
    targetElement.style.color = togHandle ? before : after;
  </Script>`
}



function togColor(tagetId, before, after){
  let toggle = document.getElementById('tog');
  toggle.innerHTML = "User";
  toggle.style.color = "green";
  // targetElement.style.color = togHandle ? before : after;
  // let togHandle = true;
    toggle.addEventListener('click', (eventTarget)=> {
      if (toggle.innerHTML==="User") {
        toggle.style.color = "red";
        toggle.innerHTML = "Expert"
        console.log(togHandle);
        // 핸들러가 참이라면 핸들러를 거짓으로 바꿔줘
      } else {
        togHandle = true; // 아니라면 핸들러를 참으로 바꿔줘
        toggle.style.color = "green";
        toggle.innerHTML = "User";
        console.log(togHandle);
      }
    })  
}




