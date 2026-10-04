import { render } from '@testing-library/react';
import Analytics from '../src/components/Analytics';

describe('Analytics', () => {
  test('does not load without permission or with an invalid measurement ID', () => {
    const { rerender } = render(<Analytics enabled={false} measurementId="G-TEST123" />);
    expect(document.querySelector('script[data-analytics="domgo"]')).not.toBeInTheDocument();

    rerender(<Analytics enabled measurementId="not-valid" />);
    expect(document.querySelector('script[data-analytics="domgo"]')).not.toBeInTheDocument();
  });

  test('loads once after permission and cleans up on unmount', () => {
    const { unmount } = render(<Analytics enabled measurementId="G-TEST123" />);
    const script = document.querySelector<HTMLScriptElement>('script[data-analytics="domgo"]');

    expect(script).toHaveAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-TEST123');
    expect(window.gtag).toBeTypeOf('function');
    expect(window.dataLayer).toHaveLength(2);

    unmount();
    expect(document.querySelector('script[data-analytics="domgo"]')).not.toBeInTheDocument();
    expect(window.gtag).toBeUndefined();
  });
});
