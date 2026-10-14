import type { ReactNode } from 'react';

type LegalPageProps = { page: 'privacy' | 'terms' };

function LegalHeader({ page }: LegalPageProps) {
  return <header className="legal-nav"><div className="legal-wrap legal-nav-inner"><a className="legal-wordmark" href="/" aria-label="Domg.o home">domg<span>.o</span></a><nav aria-label="Legal pages"><a href="/privacy" aria-current={page === 'privacy' ? 'page' : undefined}>Privacy</a><a href="/terms" aria-current={page === 'terms' ? 'page' : undefined}>Terms</a></nav></div></header>;
}

function LegalFooter({ page }: LegalPageProps) {
  return <footer className="legal-footer"><div className="legal-wrap legal-footer-inner"><span>© 2026 Dom · UK-based.</span><nav aria-label="Footer links"><a href="/privacy" aria-current={page === 'privacy' ? 'page' : undefined}>Privacy Policy</a><a href="/terms" aria-current={page === 'terms' ? 'page' : undefined}>Terms of Use</a><a href="/">Back to portfolio</a></nav></div></footer>;
}

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="legal-section"><h2>{title}</h2>{children}</section>;
}

function PrivacyPolicy() {
  return <>
    <PolicySection title="1. Who we are"><p>Domgo is the creator portfolio website of Dominic George-Oppong, trading as JDB Brothers (“we”, “us” or “our”).</p><p>We are the data controller for personal information processed through this website.</p><p>Website: <a href="https://domgo.co.uk">https://domgo.co.uk</a><br />Email: <a href="mailto:dom@domgo.co.uk">dom@domgo.co.uk</a></p></PolicySection>
    <PolicySection title="2. Information we collect"><p>We may collect or receive:</p><ul><li>Contact information and the contents of messages you send to us by email.</li><li>Basic technical information generated when you visit the site, such as IP address, browser and device information, referral source and pages viewed, where supplied by our hosting or security providers.</li><li>If you choose to connect an Instagram or TikTok account through an official authorisation flow, the limited account data and access credentials needed to provide the feature. This may include account identifiers, public profile information, follower statistics and public post metadata. We do not receive or store your social media password.</li></ul></PolicySection>
    <PolicySection title="3. How we use information"><p>We use information to:</p><ul><li>Reply to brand, partnership and media kit enquiries.</li><li>Operate, secure and improve the website.</li><li>Display approved public social media figures and selected public post links when the social media integration is enabled.</li><li>Meet legal obligations and protect our rights.</li></ul><p>We do not sell personal information or use it for automated decision-making.</p></PolicySection>
    <PolicySection title="4. Our legal bases"><p>Depending on the activity, we rely on:</p><ul><li>Legitimate interests to run a secure, reliable portfolio site and respond to genuine business enquiries.</li><li>Steps taken at your request where you contact us about a potential collaboration.</li><li>Consent and/or legitimate interests when an account owner chooses to connect a social media account for the purpose described during the authorisation flow.</li></ul></PolicySection>
    <PolicySection title="5. Cookies and analytics"><p>The site does not use advertising cookies. Optional Google Analytics may be enabled on some deployments. If enabled, it stays off unless you opt in through the privacy choices prompt. After you opt in, Google Analytics may use cookies or similar identifiers to measure site usage. Your choice is saved in your browser’s local storage; the site does not use a cookie to remember that choice. Google may receive usage information after you opt in.</p><p>If analytics are added or changed, we will update this policy before the change goes live. You can change your analytics choice at any time using “Privacy choices” on the home page.</p></PolicySection>
    <PolicySection title="6. Who we share information with"><p>We share personal information only with the providers that help us run the site, and only as far as they need it.</p><ul><li>GitHub hosts the website through GitHub Pages and may log technical information, such as IP addresses, for security and reliability.</li><li>ImprovMX, Google (Gmail) and Brevo handle our email. ImprovMX forwards messages sent to dom@domgo.co.uk, Gmail stores them and Brevo sends our replies.</li><li>Google may provide analytics when optional analytics are enabled and you have opted in.</li><li>TikTok and Meta (Instagram) may supply account data through their official APIs if the account owner connects an account. Their own privacy policies apply to the data they hold.</li><li>If social metrics are enabled, our server provider runs the secure service that stores social media access credentials and refreshes the figures shown on the site.</li><li>Professional advisers, regulators or law enforcement where the law requires it or where we need to protect our rights.</li></ul></PolicySection>
    <PolicySection title="7. International transfers"><p>Some of these providers process information outside the UK, including in the United States. Where they do, the transfer is protected by a safeguard recognised under UK data protection law, such as UK adequacy regulations or the International Data Transfer Agreement or Addendum.</p></PolicySection>
    <PolicySection title="8. How long we keep information"><ul><li>Enquiry emails are kept for up to 2 years after our last contact. Where a collaboration goes ahead, we keep the related records for up to 6 years to meet tax and accounting obligations.</li><li>If a social media connection is enabled, credentials are kept only while the connection is active. We delete them within 30 days of the account owner disconnecting or revoking access.</li><li>Public figures and post links shown on the site are replaced each time the data refreshes.</li></ul></PolicySection>
    <PolicySection title="9. Your rights"><p>Under UK data protection law, you have the right to:</p><ul><li>Access the personal information we hold about you.</li><li>Ask us to correct inaccurate information.</li><li>Ask us to delete your information.</li><li>Ask us to restrict how we use your information.</li><li>Object to processing based on legitimate interests.</li><li>Receive your information in a portable format.</li><li>Withdraw consent at any time, without affecting processing that took place before.</li></ul><p>Email <a href="mailto:dom@domgo.co.uk">dom@domgo.co.uk</a> to use any of these rights. There is no charge, and we will reply within one month.</p><p>An account owner who connected a TikTok or Instagram account can also revoke access at any time from that platform’s app permission settings.</p></PolicySection>
    <PolicySection title="10. Complaints"><p>Please contact us first so we can try to resolve your concern. You also have the right to complain to the Information Commissioner’s Office (ICO), the UK data protection regulator, at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">ico.org.uk/make-a-complaint</a> or on 0303 123 1113.</p></PolicySection>
    <PolicySection title="11. Security"><p>The whole site runs over HTTPS. If a social media integration is enabled, its access credentials are stored on the server only and are never sent to visitors’ browsers. However, no method of transmission or storage is completely secure.</p></PolicySection>
    <PolicySection title="12. Children"><p>This website is intended for brands, partners and general visitors. It is not directed at children under 13, and we do not knowingly collect their personal information.</p></PolicySection>
    <PolicySection title="13. Other websites"><p>The site links to TikTok, Instagram, YouTube, Snapchat and other third-party websites. Their own privacy policies apply once you leave this site.</p></PolicySection>
    <PolicySection title="14. Changes to this policy"><p>We may update this policy from time to time. The latest version will always appear on this page with its “Last updated” date.</p></PolicySection>
    <PolicySection title="15. Contact"><p>For any question about this policy, email <a href="mailto:dom@domgo.co.uk">dom@domgo.co.uk</a>.</p></PolicySection>
  </>;
}

function TermsOfUse() {
  return <>
    <PolicySection title="1. About these terms"><p>These terms apply to your use of <a href="https://domgo.co.uk">domgo.co.uk</a> (the “site”), the creator portfolio and media kit of Dominic George-Oppong, trading as JDB Brothers (“we”, “us” or “our”). By using the site, you agree to these terms. Please do not use the site if you do not agree.</p></PolicySection>
    <PolicySection title="2. Using the site"><p>You may use the site to learn about our content and to consider collaborations with us. You must not:</p><ul><li>Use the site in any unlawful way or for any fraudulent purpose.</li><li>Attempt to gain unauthorised access to the site, its server or any connected service.</li><li>Scrape, copy or harvest content or data from the site by automated means.</li><li>Introduce viruses or other harmful code, or disrupt the operation of the site.</li></ul></PolicySection>
    <PolicySection title="3. Our content"><p>All content on the site, including videos, images, text, logos and the 100 Hobbies branding, belongs to us or our licensors. You may view it and share links to it. However, you may not copy, edit, republish or use it commercially without our written permission.</p></PolicySection>
    <PolicySection title="4. Social media figures"><p>Follower counts, statistics and post links on the site are drawn from TikTok, Instagram and YouTube. These figures may be delayed or differ slightly from those shown on the platforms. They are provided for information only and do not guarantee future reach or performance.</p></PolicySection>
    <PolicySection title="5. Third-party platforms"><p>The site links to TikTok, Instagram, YouTube, Snapchat and other third-party services, and their own terms apply when you use them. TikTok, Instagram, YouTube and Snapchat are trademarks of their respective owners. This site is not endorsed by or affiliated with any of these platforms.</p></PolicySection>
    <PolicySection title="6. Collaborations"><p>Nothing on the site is an offer to enter a contract. Any brand partnership, sponsorship or paid campaign is governed by a separate written agreement.</p></PolicySection>
    <PolicySection title="7. Availability and changes"><p>We aim to keep the site available and accurate. However, we may update, suspend or withdraw any part of it at any time without notice.</p></PolicySection>
    <PolicySection title="8. Our liability"><p>The site is provided free of charge and on an “as is” basis. We are not liable for any indirect or consequential loss arising from your use of the site, or for any business loss such as lost profit or revenue.</p><p>Nothing in these terms limits or excludes our liability for death or personal injury caused by our negligence, for fraud, or for anything else that cannot be limited or excluded under the law of England and Wales.</p></PolicySection>
    <PolicySection title="9. Privacy"><p>Our <a href="/privacy">Privacy Policy</a> explains how we collect, use and protect personal information.</p></PolicySection>
    <PolicySection title="10. Governing law"><p>These terms are governed by the law of England and Wales. The courts of England and Wales have non-exclusive jurisdiction over any dispute.</p></PolicySection>
    <PolicySection title="11. Changes to these terms"><p>We may update these terms from time to time. The latest version will always appear on this page with its “Last updated” date.</p></PolicySection>
    <PolicySection title="12. Contact"><p>For any question about these terms, email <a href="mailto:dom@domgo.co.uk">dom@domgo.co.uk</a>.</p></PolicySection>
  </>;
}

export default function LegalPage({ page }: LegalPageProps) {
  const isPrivacy = page === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Use';
  return <>
    <a className="skip-link" href="#legal-main">Skip to {isPrivacy ? 'policy' : 'terms'}</a>
    <LegalHeader page={page} />
    <main className="legal-main" id="legal-main">
      <p className="mono eyebrow">Domg.o · {isPrivacy ? 'Your information' : 'The details'}</p>
      <h1>{title}</h1>
      <p className="legal-updated">Last updated: 14 October 2026</p>
      <div className="legal-copy">{isPrivacy ? <PrivacyPolicy /> : <TermsOfUse />}</div>
    </main>
    <LegalFooter page={page} />
  </>;
}
