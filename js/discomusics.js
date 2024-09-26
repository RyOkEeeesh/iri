const musicSrc = ['music (16)','music (22)','music (42)','music (24)','music (21)','music (14)','music (43)','music (27)','music (2)','music (35)','music (33)','music (37)','music (26)','music (1)','music (38)','music (29)','music (25)','music (19)','music (10)','music (31)'];
const musicTitle = ['Swamp','Run','hug','Season','Roll','friends','染','STARLIGHT','摩天楼','渦','はじまりの日','言えない','Sparkle','24-25','東へ西へ','SUMMER END','Shade','Only One','Corner','Watashi'];
const albumImg = ['swamp','run','hug','private','roll','friends','simi','star','maten','uzu','hajimari','ienai','sparkle','24-25','higashi','summer','shade','only','corner','watashi'];
const audio = document.getElementById('audio');
const title = document.querySelector('.main-music-title');
const album = document.querySelector('.album-img');
const background = document.querySelector('.wrap');
const volumeBar = document.querySelector('.volume-bar__input');
const slider = document.querySelector('.play-time__input');
const currentText = document.querySelector('.currentTime__p');
const durationText = document.querySelector('.duration__p');
const playBtn = document.querySelector('.play-btn');
const stopBtn = document.querySelector('.stop-btn');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const sideElements = Array.from(document.querySelectorAll('.side__li'));
let isInited = false;
let isUserPlaying = false;
let count = 0;
let TrackNum;
const urlParams = new URLSearchParams(window.location.search);
const value = parseInt(urlParams.get('value'));
const s = parseInt(urlParams.get('s'));
if(musicSrc[value] !== undefined){
  let k = value+1;
  album.classList.add('img-'+k);
  setTrack(value);
}
sideElements.forEach(function(e){
  e.addEventListener('click', function(click_e){
    let n = sideElements.indexOf(click_e.target);
    if(n == -1){
      n = sideElements.indexOf(click_e.target.parentNode);
      if(n == -1){
      let parent = click_e.target.parentNode;
      n = sideElements.indexOf(parent.parentNode);
      }
    };
    setTrack(n);
  });
});
const back = document.querySelector('.back');
back.addEventListener('click', function(){
  window.location.href = `./disco.html?s=${s}`;
});
setupVolume();
audio.addEventListener('loadedmetadata',durationTime);
audio.addEventListener('timeupdate',function() {
  sliderMove();
  updateSlider();
  btnAnimation();
});
audio.addEventListener('ended',sliderReset);
slider.addEventListener('input',sliderOperation);
playBtn.addEventListener('click',function() {
  isInited = true;
  isUserPlaying = true;
  playSound();
});
stopBtn.addEventListener('click',function() {
  isUserPlaying = false;
  stopSound();
});
prevBtn.addEventListener('click',prevTrack);
nextBtn.addEventListener('click',nextTrack);
volumeBar.addEventListener('input',volumeSet);
document.addEventListener('keypress',keypress_event);
document.addEventListener("visibilitychange", () => {
  if (isInited === false) {
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
function playSound() {
  audio.play();
  playBtn.style.display = "none";
  stopBtn.style.display = "block";
}
function stopSound() {
  audio.pause();
  playBtn.style.display = "block";
  stopBtn.style.display = "none";
}
function setTrack(n){
  TrackNum = n;
  let k = TrackNum + 1;
  album.classList.add('img-'+k);
  stopSound();
  btnAnimation();
  audio.src = './audio/'+musicSrc[n]+'.mp3';
  title.innerText = musicTitle[n];
  let url = './img/audio/'+albumImg[n]+'.jpg';
  album.src = url;
  background.style.backgroundImage = "url('"+url+"')";
}
function keypress_event(e) {
  if(e.code === 'Enter'){
    if(count % 2 == 0){
      isInited = true;
      isUserPlaying = true;
      playSound();
      if (isInited === false) {
        onClickFirstPlay();
      }
      isInited = true;
    }else if(count % 2 == 1){
      isUserPlaying = false;
      stopSound();
    }
  }
  count ++;
}
function durationTime() {
  durationText.innerText = timeFormat(parseInt(audio.duration));
  slider.max = parseInt(audio.duration);
}
function timeFormat(t) {
  let min,second,time;
  second = t % 60;
  min = (t - second)/60;
  if(second < 10){
    time = min+':0'+second;
  }else{
    time = min+':'+second;
  }
  return time;
}
function sliderMove(){
  slider.value = parseInt(audio.currentTime);
  currentText.innerText = timeFormat(slider.value);
}
function sliderOperation(){
  isInited = true;
  isUserPlaying = true;
  audio.currentTime = slider.value;
  currentText.innerText = timeFormat(slider.value);
  playSound();
}
function sliderReset(){
  slider.value = 0;
  currentText.innerText = timeFormat(slider.value);
  stopSound();
}
const baseColor = 'transparent';
const activeColor = '#d3d3d3';
function updateSlider() {
  const progress = (slider.value / slider.max) * 100;
  slider.style.background = `linear-gradient(to right, ${activeColor} ${progress}%, ${baseColor} ${progress}%)`;
}
function btnAnimation(){
  prevBtn.classList.remove('opacityBtn');
  nextBtn.classList.remove('opacityBtn');
  if(TrackNum == 0){
    if(audio.currentTime < 3){
      prevBtn.classList.add('opacityBtn');
    }else{
      prevBtn.classList.remove('opacityBtn');
    }
  }else if(TrackNum == 19){
    nextBtn.classList.add('opacityBtn');
  }else{
    prevBtn.classList.remove('opacityBtn');
    nextBtn.classList.remove('opacityBtn');
  }
}
function prevTrack(){
  if(TrackNum == 0){
    audio.currentTime = 0;
  }else{
    if(audio.currentTime < 3){
      setTrack(TrackNum-1);
    }else{
    audio.currentTime = 0;
    }
  }
}
function nextTrack() {
  setTrack(TrackNum+1);
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
  audio.volume = volumeBar.value;
}