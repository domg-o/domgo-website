import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Portfolio from '../src/components/portfolio/Portfolio';
import PrivacyPreferences from '../src/components/PrivacyPreferences';

const internalNotes = /website snapshot|only two posts|not a live upload feed|upload dates still need|year (?:isn’t|isn't) specified|year unspecified|published on Dom’s website|original client feedback|exact post link to follow/i;

describe('Visitor-facing portfolio copy', () => {
  test('presents finished portfolio content without internal handoff notes', async () => {
    const user = userEvent.setup();
    render(<Portfolio />);
    expect(screen.queryAllByText(internalNotes)).toEqual([]);
    expect(screen.getByText('Client testimonials')).toBeVisible();
    expect(screen.getByText('Recorded audience figures')).toBeVisible();
    expect(screen.getByRole('link', { name: /Request the full media kit/ })).toHaveAttribute('href', 'mailto:dom@domgo.co.uk?subject=Media%20kit%20request');
    await user.click(screen.getByText('Explore age & location breakdown'));
    expect(screen.queryAllByText(internalNotes)).toEqual([]);
    expect(screen.getByRole('heading', { name: 'TikTok · Age range' })).toBeVisible();
  });

  test('uses accurate filter labels and keeps individual hobby links', async () => {
    const user = userEvent.setup();
    render(<Portfolio />);
    expect(screen.getByRole('button', { name: 'Episodes', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'Popular picks' }));
    expect(screen.getByRole('link', { name: /Watch Bowls: the clip/i })).toHaveAttribute('href', 'https://vm.tiktok.com/ZN8Lpy9y5/');
    expect(screen.queryAllByText(internalNotes)).toEqual([]);
    await user.click(screen.getByRole('button', { name: 'Episodes', exact: true }));
    expect(screen.getByRole('link', { name: /Watch Swimming/i })).toHaveAttribute('href', 'https://vm.tiktok.com/ZN8LpPD2s/');
    expect(screen.queryAllByText(internalNotes)).toEqual([]);
  });

  test('campaign links describe their actual destinations without unfinished promises', async () => {
    const user = userEvent.setup();
    render(<Portfolio />);
    await user.click(screen.getByRole('button', { name: /TOCA Social 13.5K views/i }));
    expect(screen.getByRole('link', { name: 'Visit my TikTok', exact: true })).toHaveAttribute('href', 'https://www.tiktok.com/@domg.o');
    await user.click(screen.getByRole('button', { name: /Currys × Acer Partnership/i }));
    expect(screen.getByRole('link', { name: 'Visit my Instagram', exact: true })).toHaveAttribute('href', 'https://www.instagram.com/domg.0/');
    expect(screen.queryAllByText(internalNotes)).toEqual([]);
  });

  test('retains clear analytics choices and the video privacy disclosure', () => {
    render(<><Portfolio /><PrivacyPreferences currentPreference={null} open onChoose={vi.fn()} onClose={vi.fn()} /></>);
    expect(screen.getByRole('heading', { name: 'Your privacy choices' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Use necessary only' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Allow analytics' })).toBeVisible();
    expect(screen.getByText('Loading this video connects to YouTube/Google, which may process device information and use storage.')).toBeVisible();
    expect(screen.queryByTitle('Can I profit from an all-you-can-eat buffet?')).not.toBeInTheDocument();
  });
});
