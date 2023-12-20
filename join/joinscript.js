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

  // 서버에 POST 요청을 보내기 위한 설정
  fetch('/userData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
    // 응답을 받으면 가입 성공 메시지 출력
    alert('회원가입이 완료되었습니다.');
    
    // 양식 초기화 (선택 사항)
    document.getElementById('signup-form').reset();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
  });
});
