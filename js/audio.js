const musics = [];
const title = {"24-25":"24-25","摩天楼":"maten","breaking dawn":"groove","Keepin'":"juice","CAKE":"shade","Clear Color":"sparkle","Coaster":"sparkle","Come Away":"only","COME BACK TO MY CITY":"sparkle","Corner":"corner","DRAMA":"private","Flashlight":"shade","For life":"life","friends":"friends","fruits":"life","Swamp":"swamp","Keep on trying":"shade","miracle":"sparkle","Only One":"only","rhythm":"groove","Roll":"roll","Run":"run","Runaway":"sparkle","Season":"private","Shade":"shade","Sparkle":"sparkle","STARLIGHT":"star","stroll":"only","SUMMER END":"summer","Sway":"shade","Watashi":"watashi","Wonderland":"shade","はじまりの日":"hajimari","フェイバリット女子":"groove","渦":"uzu","会いたいわ":"life","言えない":"ienai","東へ西へ":"higashi","半端じゃない":"groove","飛行":"shade","Slowly Drive":"juice","hug":"hug","染":"simi","room":"hajimari"};
const firstWrap = document.getElementById('first-wrap');
const albumContainer = document.querySelector('.album-container');
const filter = document.querySelector('.filter');
const main = document.querySelector("main")
const textWrap = document.querySelector(".text-wrap");
const headerWrap = document.querySelector('nav');
const audio = document.querySelector('audio');
const album = document.querySelector('#album');
const background = document.querySelector('.wrap');
const musicTitle = document.querySelectorAll('.music-title');
const volumeBar = document.querySelector('.volume-bar__input');
const toTop = document.querySelector('.toTop');
const article = document.querySelector('article');
let visited = sessionStorage.getItem('visited');
let rand_music = [];
let j = 0;
let count = 0;
let calc;
let action = false;
let noOperation = 0;
let userOperation = 0;
let isUserPlaying = true;
let userPlay = false;
let noOperationVolume = 0.2;
let userOperationVolume = 0.1;

if(Boolean(visited)){
    setupVolume();
    nomalEvent();
  }else{
    firstWrap.style.display = 'block';
    audio.autoplay = false;
    stopSound();
    noOpreationAnimation();
    setupVolume();
    window.addEventListener('scroll',firstEvent);
}
musicsToTmp();
if(!window.localStorage){
  trackMusic();
}else{
  function saveData(track,num){
    localStorage.setItem('track', JSON.stringify(track));
    localStorage.setItem('trackNum', JSON.stringify(num));
  }
  function removeStorage(){
    localStorage.removeItem("track");
    localStorage.removeItem("trackNum");
    localStorage.removeItem("time");
  }
  function resetTrack(){
    removeStorage();
    trackMusic();
    window.addEventListener('beforeunload', saveData(rand_music,j-1));
  }
  let track = JSON.parse(localStorage.getItem('track'));
  audio.addEventListener('timeupdate', function() {
    localStorage.setItem('time', JSON.stringify(audio.currentTime));
});
  if(Boolean(track) == false){
      removeStorage();
      if(j == false){
      MakeRandMusics();
      playAudio(rand_music,j);
      saveData(rand_music,j)
      j++;
    }
    audio.addEventListener('ended', function() {
      playAudio(rand_music,j);
    localStorage.setItem('trackNum', JSON.stringify(j));
    j++;
    if(j == musics.length){
      j = 0;
      MakeRandMusics();
    }
    });
    }
    else if(Boolean(track)){
      let trackNum = JSON.parse(localStorage.getItem('trackNum'));
      const playbackTime = JSON.parse(localStorage.getItem('time'));
      audio.currentTime = playbackTime;
      localStorage.setItem('trackNum', JSON.stringify(trackNum));
      playAudio(track,trackNum);
      trackNum ++;
      audio.addEventListener('ended', function() {
      if(trackNum >= track.length){
      removeStorage();
      resetTrack();
      }else{
        localStorage.setItem('trackNum', JSON.stringify(trackNum));
      playAudio(track,trackNum);
      trackNum++;
      }
    });
  }
}
this.addEventListener('mousemove',boo);
this.addEventListener('mousedown',boo);
this.addEventListener('wheel',boo);
article.addEventListener('scroll',showToTop);
toTop.addEventListener('click',topToScroll);
volumeBar.addEventListener('input',volumeSet);
document.addEventListener("visibilitychange", () => {
  if (Boolean(visited) === false) {
    return;
  }
  if (document.visibilityState === "visible") {
    if (isUserPlaying === true) {
      playSound();
    }
  } else {
    stopSound();
  }
});
function musicsToTmp(){
  for(let i=1;i<=44;i++){
    const _i = i;
    musics[_i-1] = "./audio/music ("+_i+").mp3";
  }
}
function FirstVisit(){sessionStorage.setItem('visited',true);}
function playAudio(track,num){
  audio.src = track[num];
  let titleName = Object.keys(title);
  let n = musics.indexOf(track[num]);
  musicTitle.forEach(function(e) {
    e.innerText = titleName[n];
  });
  let url = './img/audio/'+title[titleName[n]]+'.jpg';
  album.src = url;
  background.style.backgroundImage = "url('"+url+"')";
}
function MakeRandMusics(){
  let randoms = [];
  let min = 0, max = musics.length-1;
  for(i = min; i <= max; i++){
    while(true){
      let tmp = intRandom(min, max);
      if(!randoms.includes(tmp)){
        randoms.push(tmp);
        rand_music[i] = musics[tmp];
        break;
      }
    }
  }
  function intRandom(min, max){
    return Math.floor( Math.random() * (max - min + 1)) + min;
  }
}
function trackMusic(){
  if(j == false){
    MakeRandMusics();
    playAudio(rand_music,j);
    j++;
  }
  audio.addEventListener('ended', function() {
  audio.autoplay = true;
    playAudio(rand_music,j);
    j++;
  if(j == musics.length){
    j = 0;
    MakeRandMusics();
  }
  });
}
function boo(){
  noOperation = 0;
  action = true;
}
function loop(){
  showhide(action);
  action = false;
}
function noOpreationAnimation(){
  filter.classList.remove('filter-main');
  filter.classList.add('filter-album');
  albumContainer.classList.remove('album-container-fadeout');
  main.classList.add('main-fadeout');
  headerWrap.classList.add('nav-fadeout');
  textWrap.classList.add('text-wrap-fadeout');
  audio.volume = noOperationVolume;
}
function userOperationAnimation(){
  filter.classList.remove('filter-album');
  filter.classList.add('filter-main');
  albumContainer.classList.add('album-container-fadeout');
  main.classList.remove('main-fadeout');
  headerWrap.classList.remove('nav-fadeout');
  textWrap.classList.remove('text-wrap-fadeout');
  audio.volume = userOperationVolume;
}
function showhide(action){
if(action){
  if(Boolean(userOperation)){
}else{
  userOperationAnimation();
  userOperation++;
}
}else{
  userOperation = 0;
  if(Boolean(noOperation)){
    noOperation++;
    if(noOperation == 50){
      noOpreationAnimation();
    }
  }else{
    noOperation++;
  }
}
}
function showToTop(){
  let rect = textWrap.getBoundingClientRect();
    if(`${rect.top}` > 0){
      toTop.classList.remove('toTop-hide');
    }else{
      toTop.classList.add('toTop-hide');
    }
}
function topToScroll(){
  article.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}
function keypress_event(e){
  if(e.code === 'Enter' || e.code === 'Space'){
    if(count % 2 == 0){
      userPlay  = true; 
      playSound();
    }else if(count % 2 == 1){
      userPlay  = false;
      stopSound();
    }
  }
  count ++;
}
function firstEvent(){
  audio.muted = false;
  const rect = background.getBoundingClientRect();
  calc = 1 - (`${rect.top}` / `${rect.height}`);
  if(calc == 0){
  stopSound();
  }else if(calc < 1 && calc > 0){
  playSound();
  audio.volume = 0.2 * calc;
  }else if(calc == 1){
    audio.autoplay = true;
    FirstVisit();
    nomalEvent();
  }
}
function nomalEvent(){
  audio.muted = false;
  firstWrap.style.display = 'none';
  document.addEventListener('keypress',keypress_event);
  setInterval(loop, 200);
}
function setupVolume() {
  let volume = JSON.parse(localStorage.getItem('volume'));
  if(Boolean(volume) || volume == 0){
    volumeBar.value = volume;
    volumeSet();
  }else{
    volumeBar.value = 0.1;
    volumeSet();
  }
}
function volumeSet() {
  localStorage.setItem('volume', JSON.stringify(parseFloat(volumeBar.value)));
  if(parseFloat(volumeBar.value) == 0){
    noOperationVolume = 0;
    userOperationVolume = 0;
  }else{
    userOperationVolume = parseFloat(volumeBar.value);
    noOperationVolume = userOperationVolume + 0.1;
  }
  audio.volume = userOperationVolume;
}
function playSound(){audio.play();}
function stopSound(){audio.pause();}