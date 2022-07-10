import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const savedTime = Number(localStorage.getItem('videoplayer-current-time'));
if (savedTime) {
  player.setCurrentTime(savedTime);
}

const onTimeUpdate = function (event) {
  const currentTime = event.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
};

player.on('timeupdate', throttle(onTimeUpdate, 1000));
