import { useRef } from 'react';

const links = [['The work', '#work'], ['The story', '#story'], ['The audience', '#audience']] as const;

export default function Header() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  return (
    <header className="nav">
      <div className="wrap">
        <a className="wordmark" href="#top" aria-label="Domg.o home">domg<span>.o</span></a>
        <nav className="nav-links" aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <details className="mobile-menu" ref={menuRef} onKeyDown={event => {
            if (event.key === 'Escape') {
              closeMenu();
              menuRef.current?.querySelector('summary')?.focus();
            }
          }}>
            <summary>Menu</summary>
            <div>
              {links.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
              <a href="#contact" onClick={closeMenu}>Contact</a>
            </div>
          </details>
          <a className="status" href="#contact" onClick={closeMenu}>Open to Work</a>
        </nav>
      </div>
    </header>
  );
}
