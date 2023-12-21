// const resultValue: string = <h1 id= “ example” class= ” active” style: “ color:salmon;”> 내이름 </h1 >
// 위 최종결과물(resultValue 변수)에 해당하는 문자열을 생성하는 함수를 제작하시오.


function makeCompo(type, attributes, children){
  const elementString = `<${type} ${attributes}> ${children} <${type}>` 
  return elementString; 
}

// const resultValue= makeCompo("h1", `id="example" class="active" style: "colcor:salmon;" `, "최성민")
// console.log(resultValue)

function makeCompo2(type, attributes, children){
  const elementString = `<${type}`
  for(let key in attributes) {
    elementString = elementString + ` ${key} = '${attributes[key]}'`;
    elementString = elementString +'>';
  }
  elementString += `</${type}>`;
  return elementString; 
}
const resultValue= makeCompo2("h1", {style:'color:blue'}, "최성민")
const parsedresult = parseInt(resultValue)
console.log(parsedresult)
