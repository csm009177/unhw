// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// 요청이 완료되었을 때의 처리 로직
xhr.onreadystatechange = function() {
    // readyState: 4 (요청 완료), status: 200 (OK)
    if (xhr.readyState === 4 && xhr.status === 200) {
        // 서버로부터 받은 JSON 데이터를 파싱
        const jsonData = JSON.parse(xhr.responseText);
        console.log(jsonData); // 파싱된 JSON 데이터 출력 (개발자 도구의 콘솔에서 확인)
    }
};

// POST 요청을 통해 서버에 데이터 전송
xhr.open('POST', 'name.json', true);  // 'save.json'은 실제 저장하려는 경로입니다.
xhr.setRequestHeader('Content-Type', 'application/json');  // 요청 헤더 설정
// JSON 데이터 전송 예시 (실제로는 읽어온 데이터를 이 부분에 넣어서 전송합니다.)
const jsonData = JSON.stringify({ name: 'John', age: 30 });  // 예시 데이터
xhr.send(jsonData);  // 요청 전송