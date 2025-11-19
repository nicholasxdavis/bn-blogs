(function () {
  const path = window.location.pathname;

  const colorMap = { // special cases
    '/chefos/': '#1eb854',
    '/withstella/': '#9c7ead'
  };

  let color = '#e2742f'; // default

  for (const key in colorMap) {
    if (path.includes(key)) {
      color = colorMap[key];
      break;
    }
  }
// element creation
  const wrapper = document.createElement('div');
  wrapper.className = 'fixed top-[120px] left-0 z-50 overflow-hidden';

  const button = document.createElement('button');
  button.setAttribute('aria-label', 'Previous Page');

  button.onclick = () => {
    if (document.referrer && document.referrer !== location.href) {
      history.back();
    } else {
      location.href = '../../index.html';
    }
  };

  button.className = `
    group ml-[-4px] h-[48px] pl-2 pr-4 py-3
    text-white border-l-0 rounded-r-lg shadow-md
    transform transition-all duration-200 ease-out
    hover:ml-0 hover:shadow-lg focus:outline-none
    flex items-center font-medium border border-white/10 border-l-0 whitespace-nowrap
  `.replace(/\s+/g, ' ') + ` bg-[${color}] hover:bg-[${color}]`;

  const flexDiv = document.createElement('div');
  flexDiv.className = 'flex items-center';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'h-5 w-5 transition-transform duration-200 group-hover:translate-x-1');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('stroke', 'currentColor');

  const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svgPath.setAttribute('stroke-linecap', 'round');
  svgPath.setAttribute('stroke-linejoin', 'round');
  svgPath.setAttribute('stroke-width', '2');
  svgPath.setAttribute('d', 'M10 19l-7-7m0 0l7-7m-7 7h18');

  svg.appendChild(svgPath);

  const span = document.createElement('span');
  span.className = 'max-w-0 overflow-hidden transition-all duration-200 group-hover:max-w-[120px] group-hover:ml-2';
  span.textContent = 'Previous Page';

  flexDiv.appendChild(svg);
  flexDiv.appendChild(span);
  button.appendChild(flexDiv);
  wrapper.appendChild(button);
  document.body.appendChild(wrapper);
})();
