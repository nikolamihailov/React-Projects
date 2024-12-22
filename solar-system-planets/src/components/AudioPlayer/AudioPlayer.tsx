import { useRef, useState } from "react";
import styles from "./audio.module.css";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startStopAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src="/space-audio.mp3" />
        Your browser doesn't support audio.
      </audio>
      <button onClick={startStopAudio} className={styles.btn}>
        <i className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
      </button>
    </div>
  );
};

export default AudioPlayer;
