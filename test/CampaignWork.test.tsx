import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import CampaignWork from '../src/components/portfolio/CampaignWork';

describe('CampaignWork', () => {
  test('selects campaigns through accessible controls and announces the result', async () => {
    const user = userEvent.setup();
    render(<CampaignWork />);

    expect(screen.getByRole('button', { name: /Rains, 11M views/i })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: /UNiDAYS, 2.4M views/i }));

    expect(screen.getByRole('heading', { name: /A student budget. A familiar face./i })).toBeVisible();
    expect(screen.getByRole('button', { name: /UNiDAYS, 2.4M views/i })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Showing UNiDAYS campaign. 2.4M views.')).toBeInTheDocument();
  });

  test('offers the campaign link if its preview image fails', () => {
    render(<CampaignWork />);
    fireEvent.error(screen.getByAltText('Rains campaign video still'));

    expect(screen.getByRole('status')).toHaveTextContent('Use the campaign link beside this preview.');
    expect(screen.getByRole('link', { name: /Watch the Rains post/i })).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('has no detectable accessibility violations', async () => {
    const { container } = render(<CampaignWork />);
    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toEqual([]);
  });
});
