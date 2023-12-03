export function createElement(type, props, ...children) {
    return { type, props, children};
  }

export function component(stateData) {
    const menuItems = [];
    for (let i=0; i<stateData.length; i++){
      const item = stateData[i];
      const menuItem = createElement('li', {}, createElement('a', {href:item.hash}, item.text));
      menuItems.push(menuItem);
    }
    const menu = createElement('ul', {}, ...menuItems);
    return createElement('div', {}, menu);
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

  const stateData = [
    {hash : '#home', text:'home'},
    {hash : '#cpu', text:'cpu'},
    {hash : '#mainboard', text:'mainboard'},
    {hash : '#power', text:'power'},
    {hash : '#ram', text:'ram'},
    {hash : '#ssd', text:'ssd'},
    {hash : '#odd', text:'odd'},
    {hash : '#hdd', text:'hdd'},
    {hash : '#gpu', text:'gpu'},
  ];

  const virtualDom = component(stateData);
  const board = document.getElementById('board');
  board.appendChild(render(virtualDom));