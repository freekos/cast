import { get } from 'svelte/store';

import { src, duration, currentTime, seek, move, play, pause, paused } from '$lib/entities/audio';

describe('Audio playback API', () => {
  const defaultSrc = 'http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg';
  const defaultDuration = 6.452245;
  const playDefault = () => {
    play(defaultSrc);
    duration.set(defaultDuration);
  };

  it('loads audio', () => {
    playDefault();
    expect(get(src)).toEqual(defaultSrc);
    expect(get(paused)).toBeFalsy();
    pause();
  });

  it('pauses playback', () => {
    playDefault();
    pause();
    play();
    expect(get(paused)).toBeFalsy();
    pause();
    expect(get(paused)).toBeTruthy();
  });

  it('controls playback current time', () => {
    playDefault();
    seek(0.5);
    move(2);
    expect(get(currentTime)).toEqual(2.5);
    pause();
  });

  it('sets invalid playback time', () => {
    playDefault();
    seek(-1);
    expect(get(currentTime)).toEqual(0);
    move(100);
    expect(get(currentTime)).toEqual(get(duration));
    pause();
  });
});
