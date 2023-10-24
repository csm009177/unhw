
function tagMaker(tagName, content, tagstyle){
if(typeof(tagName)==='string'&& typeof(style)==='string'){
  return `<${tagName} ${tagstyle}>${content}</${tagName}>`

  } else { console.log(`${tagName} and ${style} must be string`)}
}

module.exports = tagMaker;

