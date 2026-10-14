// Public-site snapshot, checked 5 October 2026. No live API or invented metrics.
export const playlistUrl = 'https://www.tiktok.com/@domg.o/playlist/Hobbies-7663970335624039190';
export type HobbyVideo = {
  name: string;
  detail: string;
  episode?: number;
  views?: number;
  url: string;
  // Order of the four episodes on Dom's site, not verified upload timestamps.
  seriesOrder?: number;
};
export const hobbyVideos: readonly HobbyVideo[] = [
  { name: 'Football', detail: 'I needed a game. Footy Addicts found me one.', episode: 1, seriesOrder: 1, url: 'https://www.instagram.com/reel/Da5zNLst4eM/' },
  { name: 'Climbing', detail: 'First climb. Meeting Alex Honnold was a bonus.', episode: 2, seriesOrder: 2, url: 'https://vm.tiktok.com/ZN8LpQXEy/' },
  { name: 'Bowls', detail: 'The full episode. Yes, bowls.', views: 85000, seriesOrder: 3, url: 'https://vm.tiktok.com/ZN8LpH8Mc/' },
  { name: 'Swimming', detail: 'Saying I’ll get back to it. Then actually getting in.', seriesOrder: 4, url: 'https://vm.tiktok.com/ZN8LpPD2s/' },
  { name: 'Bowls: the clip', detail: 'One trending sound. A lot more people watching bowls.', views: 476000, url: 'https://vm.tiktok.com/ZN8Lpy9y5/' },
];
export function getHobbies(filter: 'popular' | 'recent'): HobbyVideo[] {
  return filter === 'popular'
    ? hobbyVideos.filter(video => video.views !== undefined).sort((a, b) => b.views! - a.views!).slice(0, 5)
    : hobbyVideos.filter(video => video.seriesOrder !== undefined).sort((a, b) => b.seriesOrder! - a.seriesOrder!);
}
export const featuredVideo = {
  id: 'FTV8gAQ1dLM',
  title: 'Can I profit from an all-you-can-eat buffet?',
  poster: '/portfolio-assets/youtube-buffet.jpg',
  url: 'https://www.youtube.com/watch?v=FTV8gAQ1dLM',
};
