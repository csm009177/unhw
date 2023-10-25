`  <script>
let toggle = document.getElementById('tog');
toggle.innerHTML = "User";
toggle.style.color = "green";
// targetElement.style.color = togHandle ? before : after;
// let togHandle = true;
  toggle.addEventListener('click', (eventTarget)=> {
    if (toggle.innerHTML==="User") {
      toggle.innerHTML = "Expert"
      toggle.style.color = "red";
      console.log(togHandle);
      // 핸들러가 참이라면 핸들러를 거짓으로 바꿔줘
    } else {
      togHandle = true; // 아니라면 핸들러를 참으로 바꿔줘
      toggle.innerHTML = "User";
      toggle.style.color = "green";
      console.log(togHandle);
    }
  })</script>`




function toggleMaker(tagetId, beforeText, beforeColor, afterText, afterColor ){
return `<Script>
  let toggle = document.getElementById(${tagetId};
  toggle.innerHTML = ${beforeText};
  toggle.style.color = ${beforeColor};
  // targetElement.style.color = togHandle ? before : after;
  // let togHandle = true;
    toggle.addEventListener('click', (eventTarget)=> {
      if (toggle.innerHTML===beforeText) {
        toggle.innerHTML = ${afterText};
        toggle.style.color = ${afterColor};
        console.log(togHandle);
        // 핸들러가 참이라면 핸들러를 거짓으로 바꿔줘
      } else {
        togHandle = true; // 아니라면 핸들러를 참으로 바꿔줘
        toggle.innerHTML = ${beforeText};
        toggle.style.color = ${beforeColor};
        console.log(togHandle);
      }
    })
</Script>`
}


module.exports=toggleMaker;


