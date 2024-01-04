function createElement(type, props, ...children) {
  return { type, props, children };
}

function component(stateData) {
  const menuItems = stateData.map((item, i) => {
    return createElement("li", {
      id: `LiTag${i}`,
      style: `list-style: none;`
    }, createElement("a", { class: "stateDataClass", href: item.hash }, item.text));
  });
  return createElement("div", { id: "stateCont" }, ...menuItems);
}

function render(virtualDom) {
  if (typeof virtualDom === "string") {
    return document.createTextNode(virtualDom);
  }

  const element = document.createElement(virtualDom.type);

  if (virtualDom.props) {
    for (const [key, value] of Object.entries(virtualDom.props)) {
      element.setAttribute(key, value);
    }
  }

  for (let i = 0; i < virtualDom.children.length; i++) {
    const child = virtualDom.children[i];
    element.appendChild(render(child));
  }
  return element;
}