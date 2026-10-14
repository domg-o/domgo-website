// Fetches engagement stats from TikTok, Instagram, and YouTube at build time.
import { writeFileSync } from 'fs';

function engagementRate(videos) {
  if (!videos.length) return '0.0';
  const rates = videos.map(v => ((v.likes + v.comments + v.shares) / Math.max(v.views, 1)) * 100);
  return (rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(1);
}

function avgLikes(videos) {
  if (!videos.length) return 0;
  return Math.round(videos.reduce((a, v) => a + v.likes, 0) / videos.length);
}

async function fetchTikTok() {
  const token = process.env.TIKTOK_ACCESS_TOKEN;
  if (!token) {
    console.warn('TIKTOK_ACCESS_TOKEN missing — skipping TikTok fetch.');
    return null;
  }

  const profileRes = await fetch(
    'https://open.tiktokapis.com/v2/user/info/?fields=display_name,follower_count,likes_count,video_count',
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!profileRes.ok) throw new Error(`TikTok profile fetch failed: ${profileRes.status}`);
  const profile = (await profileRes.json()).data.user;

  const videosRes = await fetch('https://open.tiktokapis.com/v2/video/list/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      max_count: 20,
      fields: ['id', 'title', 'cover_image_url', 'share_url', 'view_count', 'like_count', 'comment_count', 'share_count', 'create_time'],
    }),
  });
  if (!videosRes.ok) throw new Error(`TikTok video list fetch failed: ${videosRes.status}`);
  const rawVideos = (await videosRes.json()).data.videos ?? [];

  const videos = rawVideos.map(v => ({
    id: v.id,
    title: v.title,
    cover: v.cover_image_url,
    url: v.share_url,
    views: v.view_count,
    likes: v.like_count,
    comments: v.comment_count,
    shares: v.share_count,
    createdAt: v.create_time,
  }));

  const totalInteractions = videos.reduce((a, v) => a + v.likes + v.comments + v.shares, 0);

  return {
    followerCount: profile.follower_count,
    totalLikes: profile.likes_count,
    totalInteractions,
    engagementRate: engagementRate(videos),
    avgLikes: avgLikes(videos),
  };
}

async function fetchInstagram() {
  const token = process.env.IG_ACCESS_TOKEN;
  const userId = process.env.IG_USER_ID;
  if (!token || !userId) {
    console.warn('IG_ACCESS_TOKEN or IG_USER_ID missing — skipping Instagram fetch.');
    return null;
  }

  const profileRes = await fetch(
    `https://graph.facebook.com/v19.0/${userId}?fields=followers_count,media_count&access_token=${token}`
  );
  if (!profileRes.ok) throw new Error(`Instagram profile fetch failed: ${profileRes.status}`);
  const profile = await profileRes.json();

  const mediaRes = await fetch(
    `https://graph.facebook.com/v19.0/${userId}/media?fields=id,like_count,comments_count&limit=20&access_token=${token}`
  );
  if (!mediaRes.ok) throw new Error(`Instagram media fetch failed: ${mediaRes.status}`);
  const media = (await mediaRes.json()).data ?? [];

  const posts = media.map(m => ({
    likes: m.like_count ?? 0,
    comments: m.comments_count ?? 0,
  }));

  const totalLikes = posts.reduce((a, p) => a + p.likes, 0);
  const totalComments = posts.reduce((a, p) => a + p.comments, 0);
  const avgLikes = posts.length ? Math.round(totalLikes / posts.length) : 0;
  const engagementRate = posts.length && profile.followers_count
    ? (((totalLikes + totalComments) / posts.length / profile.followers_count) * 100).toFixed(1)
    : '0.0';

  const insightsRes = await fetch(
    `https://graph.facebook.com/v19.0/${userId}/insights?metric=total_interactions&period=day&access_token=${token}`
  );
  const insightsData = insightsRes.ok ? await insightsRes.json() : null;
  const totalInteractions = insightsData?.data?.[0]?.values?.reduce((a, v) => a + v.value, 0) ?? null;

  return {
    followerCount: profile.followers_count,
    mediaCount: profile.media_count,
    totalInteractions,
    avgLikes,
    engagementRate,
  };
}

async function fetchYouTube() {
  const apiKey = process.env.YT_API_KEY;
  const channelId = process.env.YT_CHANNEL_ID;
  if (!apiKey || !channelId) {
    console.warn('YT_API_KEY or YT_CHANNEL_ID missing — skipping YouTube fetch.');
    return null;
  }

  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
  );
  if (!channelRes.ok) throw new Error(`YouTube channel fetch failed: ${channelRes.status}`);
  const channelData = await channelRes.json();
  const stats = channelData.items?.[0]?.statistics ?? {};

  return {
    subscriberCount: stats.subscriberCount ?? null,
    viewCount: stats.viewCount ?? null,
    videoCount: stats.videoCount ?? null,
  };
}

async function main() {
  const [tiktok, instagram, youtube] = await Promise.all([
    fetchTikTok().catch(err => { console.error(err); return null; }),
    fetchInstagram().catch(err => { console.error(err); return null; }),
    fetchYouTube().catch(err => { console.error(err); return null; }),
  ]);

  writeFileSync(
    'src/data/stats.json',
    JSON.stringify({ tiktok, instagram, youtube, fetchedAt: new Date().toISOString() }, null, 2)
  );
  console.log('src/data/stats.json written.');
}

main();