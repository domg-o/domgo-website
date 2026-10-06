import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import Hobbies from '../src/components/portfolio/Hobbies';
import Testimonials from '../src/components/portfolio/Testimonials';
import YouTube from '../src/components/portfolio/YouTube';
import AudienceDetails from '../src/components/portfolio/AudienceDetails';
import { getHobbies, hobbyVideos } from '../src/components/portfolio/content';

describe('Approved content sections', () => {
  test('sorts only recorded view counts without inventing rankings or mutating data', () => {
    const original = [...hobbyVideos];
    const popular = getHobbies('popular');
    expect(popular.length).toBeLessThanOrEqual(5);
    expect(popular.map(video => video.views)).toEqual([476000, 85000]);
    expect(hobbyVideos).toEqual(original);
    expect(getHobbies('recent')).toHaveLength(4);
  });

  test('hobby controls show selected episodes and popular picks with individual post links', async () => {
    const user = userEvent.setup();
    render(<Hobbies />);
    expect(screen.getByRole('button', { name: 'Episodes' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'Popular picks' }));
    expect(screen.getByRole('link', { name: /Watch Bowls: the clip/i })).toHaveAttribute('href', 'https://vm.tiktok.com/ZN8Lpy9y5/');
    expect(screen.queryByText(/Only two posts have published view counts/i)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Episodes' }));
    expect(screen.getByRole('button', { name: 'Episodes' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('link', { name: /Watch Swimming/i })).toHaveAttribute('href', 'https://vm.tiktok.com/ZN8LpPD2s/');
    expect(screen.queryByText(/Selected episodes, not a live upload feed/i)).not.toBeInTheDocument();
  });

  test('testimonials wrap in both directions and preserve the original quotes', async () => {
    const user = userEvent.setup();
    render(<Testimonials />);
    await user.click(screen.getByRole('button', { name: 'Previous testimonial' }));
    expect(screen.getByText(/Looks good, thank you!/)).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Next testimonial' }));
    expect(screen.getByText(/the pleasure has been ours/)).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Testimonial 02' }));
    expect(screen.getByText(/It's so good/)).toBeVisible();
  });

  test('YouTube is local-only until the visitor loads the player and can be unloaded', async () => {
    const user = userEvent.setup();
    const { container } = render(<YouTube />);
    expect(container.querySelector('iframe')).toBeNull();
    expect(screen.getByAltText(/all-you-can-eat buffet video/i)).toHaveAttribute('src', '/portfolio-assets/youtube-buffet.jpg');
    await user.click(screen.getByRole('button', { name: 'Load YouTube video' }));
    const player = screen.getByTitle('Can I profit from an all-you-can-eat buffet?');
    expect(player).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/FTV8gAQ1dLM?playsinline=1&rel=0');
    expect(player).toHaveAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    fireEvent.load(player);
    expect(screen.queryByText('Loading the YouTube player…')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Unload video' }));
    expect(container.querySelector('iframe')).toBeNull();
  });

  test('thumbnail failure retains playback and external fallback controls', () => {
    render(<YouTube />);
    fireEvent.error(screen.getByAltText(/all-you-can-eat buffet video/i));
    expect(screen.getByRole('button', { name: 'Load YouTube video' })).toBeVisible();
    expect(screen.getByRole('link', { name: /Watch on YouTube/i })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=FTV8gAQ1dLM');
  });

  test('audience detail changes platform through accessible controls', async () => {
    const user = userEvent.setup();
    render(<AudienceDetails />);
    await user.click(screen.getByText('Explore age & location breakdown'));
    await user.click(screen.getByRole('button', { name: 'Instagram' }));
    expect(screen.getByRole('heading', { name: 'Instagram · Age range' })).toBeVisible();
    expect(screen.getByText('54.3%')).toBeVisible();
  });

  test('new sections have no detectable accessibility violations', async () => {
    const { container } = render(<main><Hobbies /><Testimonials /><YouTube /><AudienceDetails /></main>);
    expect((await axe(container, { rules: { 'color-contrast': { enabled: false } } })).violations).toEqual([]);
  });
});
