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

    expect(writeText).toHaveBeenCalledWith('dominicgoofficial@gmail.com');
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
    expect(screen.getByRole('link', { name: 'dominicgoofficial@gmail.com' })).toHaveAttribute('href', 'mailto:dominicgoofficial@gmail.com');
  });
});
