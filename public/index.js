import fs from 'fs'

export function createElement(type, props, ...children) {
    return { type, props, children};
  }

export function component(stateData, direction) {
    const menuItems = [];
    for (let i=0; i<stateData.length; i++){
      const item = stateData[i];
      const menuItem = createElement('li', {style:"list-style: none; width:100%;"}, createElement('a', {href:item.hash}, item.text));
      menuItems.push(menuItem);
    }
    return createElement('div', { 
      style:`display: flex; text-align: center; flex-direction: ${direction}; align-items: center;`}, 
      ...menuItems);
  }
  
export function render(virtualDom) {
    if(typeof virtualDom === 'string') {
      return document.createTextNode(virtualDom);
    }
    const element = document.createElement(virtualDom.type);
    if(virtualDom.props) {
      for( const [key,value] of Object.entries(virtualDom.props)) {
        element.setAttribute(key,value);
      }
    }
    for(let i=0; i<virtualDom.children.length; i++) {
      const child = virtualDom.children[i];
      element.appendChild(render(child));
    }
    return element;
  }


  
  export function diffLogic(jsonData) {
    if (!jsonData.endsWith('.json')) {
      throw new Error(`${jsonData}는 json 파일이 아닙니다.`);
  }
  // * 1. inputJSONdata, outputJSONdata를 읽어서 JSON 객체로 변환
  const parsedJsonData = JSON.parse( fs.readFileSync(jsonData, 'utf8') )
  console.log(parsedJsonData);
  // let result = outData;
  /**
   * ? Q. JSON 파일을 아래의 5, 6번에 해당하는 로직 작성 후 JSON으로 저장
   * ? Q. 저장이 완료되면 초기화된 result에 객체를 리턴
  */
 // return result;
}

// path
const JSONPath  = './index.json';
// json controller
const resultObject = diffLogic(JSONPath);
console.log(resultObject);