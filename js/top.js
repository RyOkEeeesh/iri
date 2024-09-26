const elements = Array.from(document.querySelectorAll('.for-news-content'));
elements.forEach(function(e){
  e.addEventListener('click', function(click_e){
    let n = elements.indexOf(click_e.target)
    if(n == -1){n = elements.indexOf(click_e.target.parentNode)}
    window.location.href = `./news.html?value=${n}`;
  });
});