function tagMaker(tagName, style, content){
if(typeof(tagName)==='string'&& typeof(style)==='string'){
  return `<${tagName} style ="${style}">${content}</${tagName}>`
  } else { console.log(`${tagName} and ${style} must be string`)}
}

module.exports = tagMaker;