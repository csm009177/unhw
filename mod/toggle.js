function toggleMaker(tagetId, ) {
  return
  let dclareTarget =tagetId+'tog'
  let tagetId+'tog' = document.getElementById(tagetId)
  let togHandle = true;
  toggle.addEventListener('click', ()=> {
    if (togHandle === true) {
      togHandle = false;
      (tagetId+'tog').style.color = "red";
      console.log(togHandle);
      // 핸들러가 참이라면 핸들러를 거짓으로 바꿔줘
    } else {
      togHandle = true; // 아니라면 핸들러를 참으로 바꿔줘
      toggle.style.color = "green";
      console.log(togHandle);
    }
  })`
}