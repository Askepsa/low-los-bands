const sections = [
  ...document.querySelectorAll('section'), 
  ...document.querySelectorAll('footer')
];
const circles  = document.querySelectorAll('circle'); 

let index = 0;
let startY = null;

sections.forEach(element => {
  if (element.className !== 'hero') {
    element.style.display = 'none';
  } 
});

window.addEventListener('wheel', (event) => {
  const direction = event.deltaY > 0 ? 'down' : 'up'
  if (direction === 'down') {
    transitionToNextSection();
  } else {
    transitionToPreviousSection();
  }
})

function transitionToNextSection() {
  const lastIndex = sections.length - 1;
  if (index === lastIndex) {
    return;
  }
  sections[index].style.display = 'none'
  sections[index + 1].style.display = 'flex';

  circles[index * 2].classList.add('hidden');
  circles[(index + 1) * 2].classList.remove('hidden');

  index++;
}

function transitionToPreviousSection() {
  const firstIndex = 0;
  if (index === firstIndex) {
    return;
  }
  sections[index].style.display = 'none';
  sections[index - 1].style.display = 'flex';

  circles[index * 2].classList.add('hidden');
  circles[((index - 1) * 2)].classList.remove('hidden');

  index--;
}

// Music
let musicPlaying = null;

function haltAllMusic() {
  const allAudio = document.querySelectorAll('audio');
  allAudio.forEach(element => {
    element.pause(); 
    element.currentTime = 0;;
  });
}

function playButtons(playButton, stopButton) {
  playButton.style.display = 'block';
  stopButton.style.display = 'none';

}

function stopButtons(playButton, stopButton) {
  playButton.style.display = 'none';
  stopButton.style.display = 'block';
}

function toggleMusic(music, disk, stopNPlayButton) {
  const [playButton, stopButton] = stopNPlayButton;
  const isMusicPlaying = musicPlaying === music;

  const startSpin = () => disk.classList.add('rotate')
  const stopSpin  = () => disk.classList.remove('rotate')

  haltAllMusic();

  if (isMusicPlaying) {
    stopSpin();
    playButtons(playButton, stopButton);
    musicPlaying = null;
  } else {
    music.play();
    startSpin();
    stopButtons(playButton, stopButton);
    musicPlaying = music;
  }
}

function handleMusicButtonClick(event) {
  const musicButton      = event.currentTarget;
  const musicId          = musicButton.id;
  const music            = document.querySelector(`audio#${musicId}`);
  const stopNPlayButton  = [document.querySelector('.play-button'), document.querySelector('.pause-button')];
  const disk             = document.getElementById('disk');

  toggleMusic(music, disk, stopNPlayButton);
};


const musicButtons = document.querySelectorAll('.music-button-container');
musicButtons.forEach((musicButton) => {
  musicButton.addEventListener('click', handleMusicButtonClick);
});
