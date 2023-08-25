import { useEffect, useState } from 'react';

const AudioPlayer = ({ isMusicEnabled, musicVolume }) => {
  const [audio] = useState(new Audio("/assets/music/bg1.wav"));

  useEffect(() => {
    audio.volume = musicVolume / 100;

    // Loop the audio when it ends
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener('ended', handleEnded);

    if (isMusicEnabled) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isMusicEnabled, musicVolume, audio]); // Include 'audio' in the dependency array

  return null;
};

export default AudioPlayer;
