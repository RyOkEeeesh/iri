const items = document.querySelectorAll(".shadow-animation");
const cop = 30;
let item,rect,documentWidth,documentHeight,setPositon;
function getItem(e) {
  item = e.target;
  rect = item.getBoundingClientRect();
}
function position(e) {
  documentWidth = `${rect.width}`;
  documentHeight = `${rect.height}`;
  let itemCenter = [documentWidth/2,documentHeight/2];
  let mouseX,mouseY,shadowX,shadowY;
  item.style.transition = 'all 120ms';
  mouseX = e.offsetX;
  mouseY = e.offsetY;
  shadowX = -((mouseX - itemCenter[0]) / (itemCenter[0]/4)) * Math.sqrt(documentWidth/cop);
  shadowY = -((mouseY - itemCenter[1]) / (itemCenter[1]/4)) * Math.sqrt(documentHeight/cop);
  setPositon = shadowX+'px '+shadowY+'px 12px #f5f5f566';
  item.style.boxShadow = setPositon;
}
function resetPosition() {
  item.style.boxShadow = '0 0 6px #f5f5f566';
  item.style.transition = 'all 1000ms';
}
function clicked() {
  item.style.boxShadow = '0 0 6px #f5f5f566';
  item.style.transition = 'all 80ms';
  setTimeout(() => {
    item.style.boxShadow = setPositon;
  }, 80);
}
window.addEventListener('load', function(){
  items.forEach(e => {
    e.style.boxShadow = '0 0 6px #f5f5f566';
    e.addEventListener('mouseenter',getItem);
    e.addEventListener('mousemove',position);
    e.addEventListener('mouseleave',resetPosition);
    e.addEventListener('click',clicked)
  });
});