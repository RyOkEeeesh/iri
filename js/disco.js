const sclollItem = document.querySelector('article');
const elements = Array.from(document.querySelectorAll('.disco-content'));
const urlParams = new URLSearchParams(window.location.search);
const s = parseInt(urlParams.get('s'));
if(s){
  sclollItem.scrollTo({top: s});
}


let scrollitem = 0;
elements.forEach(function(e){
  e.addEventListener('click', function(click_e){
    let n = elements.indexOf(click_e.target)
    if(n == -1){n = elements.indexOf(click_e.target.parentNode)}
    window.location.href = `./discomusics.html?value=${n}&s=${scrollitem}`;
  });
});
sclollItem.addEventListener('scroll',scrollitems);
function scrollitems(e) {
  e = e.target;
  scrollitem = parseInt(e.scrollTop);
}