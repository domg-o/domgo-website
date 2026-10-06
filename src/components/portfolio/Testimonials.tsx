import { useState } from 'react';
import { DirectionArrow } from './Icons';

const quotes = ['Thank you for taking part, the pleasure has been ours.', "Hi Dom, thank you! It's so good.", 'Looks good, thank you!'];

export default function Testimonials() {
  const [selected, setSelected] = useState(0);
  const move = (direction: number) => setSelected(current => (current + direction + quotes.length) % quotes.length);
  return <section className="references-section" id="testimonials" aria-labelledby="references-title">
    <div className="wrap references-layout">
      <div className="references-intro"><span className="mono eyebrow">Client testimonials</span><h2 id="references-title">A few words from<br />the other side.</h2><p>The results show the reach.<br />The feedback shows the experience.</p></div>
      <div><div className="quote-tabs" role="group" aria-label="Choose a client testimonial">
        {quotes.map((_, index) => <button key={index} type="button" aria-pressed={selected === index} aria-controls="client-quote" onClick={() => setSelected(index)}>Testimonial {String(index + 1).padStart(2, '0')}</button>)}
      </div><article className="quote-panel" id="client-quote">
        <div aria-live="polite" aria-atomic="true"><blockquote key={selected}>“{quotes[selected]}”</blockquote></div>
        <div className="quote-footer"><p className="mono" aria-label={`Testimonial ${selected + 1} of ${quotes.length}`}>{String(selected + 1).padStart(2, '0')} / {String(quotes.length).padStart(2, '0')}</p><div className="quote-controls"><button type="button" aria-label="Previous testimonial" onClick={() => move(-1)}><DirectionArrow back /></button><button type="button" aria-label="Next testimonial" onClick={() => move(1)}><DirectionArrow /></button></div></div>
      </article></div>
    </div>
  </section>;
}
