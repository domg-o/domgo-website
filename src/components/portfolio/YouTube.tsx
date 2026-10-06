import { useRef, useState } from 'react';
import { featuredVideo } from './content';
import { ExternalArrow, PlayIcon } from './Icons';

export default function YouTube() {
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);
  const loadButtonRef = useRef<HTMLButtonElement>(null);
  const loadVideo = () => { setReady(false); setLoaded(true); };

  return <section className="youtube-section" id="youtube" aria-labelledby="youtube-title">
    <div className="wrap"><div className="youtube-intro"><div><span className="mono eyebrow">04 / Longer watch · YouTube</span><h2 id="youtube-title">The story after the scroll.</h2></div><a href="https://www.youtube.com/@domg.o/videos" target="_blank" rel="noopener noreferrer">Explore my channel <ExternalArrow /></a></div>
      <div className="youtube-feature">
        <div className="youtube-player" aria-busy={loaded && !ready}>
          {loaded ? <>
            {!ready && <span className="video-loading" role="status">Loading the YouTube player…</span>}
            <iframe ref={playerRef} src={`https://www.youtube-nocookie.com/embed/${featuredVideo.id}?playsinline=1&rel=0`} title={featuredVideo.title} width="640" height="360" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onLoad={() => { setReady(true); playerRef.current?.focus(); }} />
          </> : <button className="youtube-thumbnail" type="button" aria-label="Load YouTube video" aria-describedby="video-privacy" onClick={loadVideo}>
            {!posterFailed ? <img src={featuredVideo.poster} width="1280" height="720" alt="Dom’s all-you-can-eat buffet video" loading="lazy" onError={() => setPosterFailed(true)} /> : <span className="youtube-fallback">The thumbnail couldn’t load. You can still load the video.</span>}
            <span className="play-button" aria-hidden="true"><PlayIcon /></span>
          </button>}
        </div>
        <div className="youtube-copy"><span className="mono eyebrow">Featured video</span><h3>{featuredVideo.title}</h3><p>All-you-can-eat. A very literal challenge. I had a question, so I went and found out.</p>
          {!loaded ? <button ref={loadButtonRef} className="button primary" type="button" onClick={loadVideo} aria-describedby="video-privacy"><PlayIcon /> Load video here</button> : <button className="video-unload" type="button" onClick={() => { setLoaded(false); setReady(false); requestAnimationFrame(() => loadButtonRef.current?.focus()); }}>Unload video</button>}
          <a className="video-external" href={featuredVideo.url} target="_blank" rel="noopener noreferrer">Watch on YouTube <ExternalArrow /></a>
        </div>
      </div>
      <p className="content-note" id="video-privacy">Loading this video connects to YouTube/Google, which may process device information and use storage.</p>
    </div>
  </section>;
}
