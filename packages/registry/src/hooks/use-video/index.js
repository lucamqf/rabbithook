//@ts-nocheck
import { useRef } from "react";

function useVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  const videoAction = (action) => {
    if (ref.current) action(ref.current);
  }

  const play = () => videoAction(video => video.play());
  const pause = () => videoAction(video => video.pause());
  const reset = () => videoAction(video => video.currentTime = 0);
  const increaseSpeed = () => videoAction(video => video.playbackRate += 0.5);
  const decreaseSpeed = () => videoAction(video => video.playbackRate -= 0.5);
  const setVolume = (volume) => videoAction(video => video.volume = volume);
  const fullscreen = () => videoAction(video => video.requestFullscreen());
  const setSpeed = (speed) => videoAction(video => video.playbackRate = speed);

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
    toggleFullscreen: fullscreen,
  }
}

export default useVideo;