// const resultValue: string = <h1 id= “ example” class= ” active” style: “ color:salmon;”> 내이름 </h1 >
// 위 최종결과물(resultValue 변수)에 해당하는 문자열을 생성하는 함수를 제작하시오.


function makeCompo(type, attributes, children){
  const elementString = `<${type} ${attributes}> ${children} <${type}>` 
  return elementString; 
}

const resultValue= makeCompo("h1", `id="example" class="active" style: "colcor:salmon;" `, "최성민")
console.log(resultValue)

