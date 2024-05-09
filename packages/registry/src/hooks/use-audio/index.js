//@ts-nocheck
import { useRef } from "react";

function useAudio() {
  const ref = useRef(null);

  const audioAction = (action) => {
    if (ref.current) action(ref.current);
  }

  const play = () => audioAction(audio => audio.play());
  const pause = () => audioAction(audio => audio.pause());
  const reset = () => audioAction(audio => audio.currentTime = 0);
  const increaseSpeed = () => audioAction(audio => audio.playbackRate += 0.5);
  const decreaseSpeed = () => audioAction(audio => audio.playbackRate -= 0.5);
  const setVolume = (volume) => audioAction(audio => audio.volume = volume);
  const setSpeed = (speed) => audioAction(audio => audio.playbackRate = speed);

  return {
    ref,
    isPaused: !!ref.current?.paused,
    currentSpeed: ref.current?.playbackRate ?? 1,
    currentVolume: ref.current?.volume ?? 0,
    setVolume,
    setSpeed,
    play,
    pause,
    reset,
    increaseSpeed,
    decreaseSpeed,
  }
}

export default useAudio;