function makecomponent(){
  function createElement(type, props, ...children) {
    return { type, props, children};
  }
  function component(stateData) {
    const menuItems = [];
    for (let i=0; i<stateData.length; i++){
      const item = stateData[i];
      const menuItem = createElement('li', {}, createElement('a', {href:item.hash}, item.text));
      menuItems.push(menuItem);
    }
    const menu = createElement('ul', {}, ...menuItems);
    const content = createElement('div', {}, 'Hello React');
    return createElement('div', {}, menu, content);
  }
  function render(virtualDom) {
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

  const stateData = [
    {hash : '#home', text:'Home'},
    {hash : '#about', text:'About'},
    {hash : '#services', text:'Services'},
    {hash : '#portfolio', text:'Portfolio'},
    {hash : '#contract', text:'Contract'},
  ];

  const virtualDom = component(stateData);
  const container = document.getElementById('root');
  container.appendChild(render(virtualDom));

}