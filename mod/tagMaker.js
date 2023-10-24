function tagMaker(tagName, content, type, style){
  if(typeof(tagName)==='string'&& typeof(style)==='string'){
    return `<${tagName} type="${type}" style ="${style}">${content}</${tagName}>`
    } else { console.log(`${tagName} and ${style} must be string`)}
}



function tagMaker2(tagName, content, type, style){
  if(typeof(tagName)==='string'&& typeof(style)==='string'){
    return `<${tagName} ${type} style ="${style}">${content}</${tagName}>`
    } else { console.log(`${tagName} and ${style} must be string`)}
}

console.log(tagMaker2('tagName', 'content', 'type', 'style'))