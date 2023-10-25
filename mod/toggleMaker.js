// toggleStringModule.js
function toggleMaker(tagId, beforeText, beforeColor, afterText, afterColor) {
  return `
    <script>
      let toggle = document.getElementById('${tagId}');
      toggle.innerHTML = '${beforeText}';
      toggle.style.color = '${beforeColor}';
      let togHandle = true;
      toggle.addEventListener('click', (eventTarget) => {
        if (toggle.innerHTML === '${beforeText}') {
          toggle.style.color = '${afterColor}';
          toggle.innerHTML = '${afterText}';
          console.log(togHandle);
        } else {
          togHandle = true;
          toggle.style.color = '${beforeColor}';
          toggle.innerHTML = '${beforeText}';
          console.log(togHandle);
        }
      })
    </script>
  `;
}

module.exports = toggleMaker;


