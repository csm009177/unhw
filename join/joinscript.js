// script.js

document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault(); // 기본 동작(페이지 새로고침) 방지

  // 입력값 가져오기
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // JSON 형식으로 변환
  const userData = {
      username: username,
      email: email,
      password: password
  };

  // JSON 데이터를 로컬 스토리지에 저장 (여기서는 로컬 스토리지를 사용하지만 실제로는 서버에 전송해야 합니다.)
  localStorage.setItem('userData', JSON.stringify(userData));

  // 가입 성공 메시지 출력 (여기서는 간단하게 alert를 사용하였습니다.)
  alert('회원가입이 완료되었습니다.');
  
  // 양식 초기화 (선택 사항)
  document.getElementById('signup-form').reset();
});