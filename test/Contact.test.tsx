import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../src/components/portfolio/Contact';

describe('Contact', () => {
  test('copies the public email address and confirms success', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    render(<Contact />);

    await user.click(screen.getByRole('button', { name: 'Copy email address' }));

    expect(writeText).toHaveBeenCalledWith('dom@domgo.co.uk');
    expect(screen.getByRole('link', { name: /Email Dom/ })).toHaveAttribute('href', 'mailto:dom@domgo.co.uk?subject=Let%27s%20work%20together');
    expect(screen.getByRole('status')).toHaveTextContent('Email address copied.');
  });

  test('provides a useful fallback when clipboard access is denied', async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
    });
    render(<Contact />);

    await user.click(screen.getByRole('button', { name: 'Copy email address' }));

    expect(screen.getByRole('status')).toHaveTextContent('Select the email address below');
    expect(screen.getByRole('link', { name: 'dom@domgo.co.uk' })).toHaveAttribute('href', 'mailto:dom@domgo.co.uk');
  });
});
