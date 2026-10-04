import { useState } from 'react';

const email = 'dominicgoofficial@gmail.com';

export default function Contact() {
  const [feedback, setFeedback] = useState('');
  const [copying, setCopying] = useState(false);

  async function copyEmail() {
    if (copying) return;
    setCopying(true);
    try {
      await navigator.clipboard.writeText(email);
      setFeedback('Email address copied.');
    } catch {
      setFeedback('Couldn’t copy automatically. Select the email address below, or use Email Dom.');
    } finally {
      setCopying(false);
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="wrap contact">
        <div>
          <span className="status">Open to Work</span>
          <h2>Your brief.<br />My next assignment.</h2>
          <p>For brand partnerships, UGC, takeovers or a conversation about representation. Send the brief. I’ll bring the point of view.</p>
          <div className="contact-actions">
            <a className="button" href={`mailto:${email}?subject=Let%27s%20work%20together`}>Email Dom <span className="arrow" aria-hidden="true">↗</span></a>
            <button className="copy-email" type="button" disabled={copying} onClick={copyEmail}>{copying ? 'Copying…' : 'Copy email address'}</button>
          </div>
          <span role="status" className="copy-feedback">{feedback}</span>
        </div>
        <div>
          <span className="mono brief-label">A few things to put in the email</span>
          <div className="brief-list">
            {['Your brand & what you have in mind', 'Deliverables & dates', 'A budget range'].map((item, index) => <div className="brief-item" key={item}><span className="mono">0{index + 1}</span><div>{item}</div></div>)}
          </div>
          <a className="email-address" href={`mailto:${email}`}>{email}</a>
          <p className="small">Media kit and rate card available on request.</p>
        </div>
      </div>
    </section>
  );
}
