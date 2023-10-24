<<<<<<< HEAD
function tagMaker(tagName, content, type, style){
if(typeof(tagName)==='string'&& typeof(style)==='string'){
  return `<${tagName} type="${type}" style ="${style}">${content}</${tagName}>`
=======
function tagMaker(tagName, content, tagstyle){
if(typeof(tagName)==='string'&& typeof(style)==='string'){
  return `<${tagName} ${tagstyle}>${content}</${tagName}>`
>>>>>>> 159d0a13517da0c71a1f95e6f3f8cc0313069447
  } else { console.log(`${tagName} and ${style} must be string`)}
}

module.exports = tagMaker;

