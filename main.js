var mytrack = document.getElementById('mytrack');
var playButton = document.getElementById('playButton');
var muteButton = document.getElementById('muteButton');

var duration = document.getElementById('fullduration'); 
var currentTime = document.getElementById('currentTime'); 

//var minutes = parseInt(mytrack.duration / 60);
//var seconds = parseInt(mytrack.duration % 60);
//duration.innerHTML = minutes + ':' + seconds;
 duration.innerHTML = mytrack.duration;

var barSize = 640;
var bar = document.getElementById('defaultBar');
var progressBar = document.getElementById('progressBar');

playButton.addEventListener('click',playOrPause,false);
function playOrPause(){
    if(!mytrack.paused && !mytrack.ended){
        mytrack.pause();
        playButton.style.backgroundImage = 'url(images/play.svg)';
        window.clearInterval(updateTime);
    }else{
        mytrack.play();
        playButton.style.backgroundImage = 'url(images/pause.svg)';
        updateTime = setInterval(update, 500);
    } 
}


muteButton.addEventListener('click', muteOrUnmute,false);
function muteOrUnmute(){
    if(mytrack.muted == true){
        mytrack.muted = false;
        muteButton.style.backgroundImage = 'url(images/speaker.svg)';
    }else{
        mytrack.muted = true;
        muteButton.style.backgroundImage = 'url(images/mute.svg)';
    }
}

function update(){
    if(!mytrack.ended){
        var playedMinutes = parseInt(mytrack.currentTime / 60);
        var playedSeconds = parseInt(mytrack.currentTime % 60);
        currentTime.innerHTML = playedMinutes + ':' + playedSeconds;
        var size = parseInt(mytrack.currentTime*barSize/mytrack.duration);
        progressBar.style.width = size + "px";
    }else{
        currentTime.innerHTML = "0.00";
        playButton.style.backgroundImage = 'url(images/play.svg)';
        progressBar.style.width = "0px";
        window.clearInterval(updateTime);
    }
}

bar.addEventListener('click', clickedBar, false);
function clickedBar(e){
    if(!mytrack.ended){
        var mouseX = e.pageX - bar.offsetLeft;
        var newtime = mouseX * mytrack.duration / barSize;
        mytrack.currentTime = newtime;
        progressBar.style.width = mouseX + 'px';
    }
}