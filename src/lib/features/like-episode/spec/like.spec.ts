import { likesStore, addLike, removeLike, toggleLike } from '../model/like';
import { get } from 'svelte/store';
import type { Episode } from '$lib/shared/api';

describe('Episodes like feature', () => {
  const exampleEpisode: Episode = {
    id: 1,
    title: 'Episode 1',
    audioUrl: 'http://example.com',
    duration: 5,
  };

  const expectedLikes: Map<Episode['id'], Episode> = new Map([[exampleEpisode.id, exampleEpisode]]);

  it('registers a like', () => {
    addLike(exampleEpisode);
    expect(get(likesStore)).toEqual(expectedLikes);
  });

  it('remove the registered like', () => {
    removeLike(exampleEpisode);
    expect(get(likesStore)).toEqual(new Map());
  });

  it('toggles the like', () => {
    toggleLike(exampleEpisode);
    expect(get(likesStore)).toEqual(expectedLikes);
  });

  it('toggles twice to remove like', () => {
    toggleLike(exampleEpisode);
    toggleLike(exampleEpisode);
    expect(get(likesStore)).toEqual(expectedLikes);
  });
});
