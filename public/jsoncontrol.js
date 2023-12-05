import fs from 'fs'
export function diffLogic(jsonData) {
  if (!jsonData.endsWith(".json")) {
    throw new Error(`${jsonData}는 json 파일이 아닙니다.`);
  }
  // * 1. inputJSONdata, outputJSONdata를 읽어서 JSON 객체로 변환
  const parsedJsonData = JSON.parse(fs.readFileSync(jsonData, "utf8"));
  console.log(parsedJsonData);
  /**
   * ? Q. JSON 파일을 아래의 5, 6번에 해당하는 로직 작성 후 JSON으로 저장
   * ? Q. 저장이 완료되면 초기화된 result에 객체를 리턴
   */
}
  // path
  const JSONPath = "./index.json";
  // json controller
  const resultObject = diffLogic(JSONPath);
  console.log(resultObject);
