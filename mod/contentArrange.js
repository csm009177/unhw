function arrange(align, justify){
  return `display: flex; flex-wrap: wrap; align-content: ${align}; justify-content: ${justify};`;
}
module.exports = arrange;