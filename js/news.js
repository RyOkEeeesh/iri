const elements = Array.from(document.querySelectorAll('input[type=checkbox]'));
let targets = document.querySelectorAll('.news-wrap');
let contents = document.querySelectorAll('.news-content');
const urlParams = new URLSearchParams(window.location.search);
const value = urlParams.get('value');
if(elements[value] !== undefined){
  elements[value].checked = true;
  contents[value].scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "center"
  });
  setTimeout(() => {
    targets[value].classList.add('news-wrap-show');
  }, 500);
}
elements.forEach(function(e){
  e.addEventListener('change', function(click_e){
    let n = elements.indexOf(click_e.target)
    if(e.checked == true){
      targets[n].classList.add('news-wrap-show');
    }else{
      targets[n].classList.remove('news-wrap-show');
    }
  });
});