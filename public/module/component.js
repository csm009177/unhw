
import {component, render} from "./module/component.js"; // component.js 에서 component()와 render() 가져오기
import {memoProcess} from "./module/memoProcess.js";     // memoProcess.js 에서 memoProcess() 가져오기
import {hashChanger} from "./module/hashChanger.js";     // hashChanger.js 에서 hashChanger() 가져오기

const headstateData = [
  {hash: "#home", text: "Home", name: "Home"},           // memo 기능 
  {hash: "#team", text: "Team", name: "Team"},           // team 소개 
  {hash: "#member", text: "Member", name: "Member"},     // member 소개 
  {hash: "#purpose", text: "Purpose", name: "Purpose"},  // purpose 소개 
];
// append
const headvirtualDom = component(headstateData); // 상태데이터로 컴포넌트 만들어서 dom에 넣기
const headcontainer = document.getElementById("head"); // 어펜드할 대상 지정
headcontainer.appendChild(render(headvirtualDom)); // dom을 렌더해서 대상에 어펜드 하기