import { render, screen, waitFor } from '@testing-library/react';
import { Audience } from '../src/components/portfolio/StaticSections';

describe('Live audience figures', () => {
  test('keeps the approved snapshot when no public stats service is configured', () => {
    render(<Audience statsUrl="" />);

    expect(screen.getByText('82,187')).toBeVisible();
    expect(screen.getByText('21,788')).toBeVisible();
    expect(screen.getByText('Recorded audience figures')).toBeVisible();
  });

  test('uses only the safe public follower totals returned by the stats service', async () => {
    const fetchStats = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      updatedAt: '2026-10-11T09:00:00.000Z',
      instagram: { followers: 25001 },
      tiktok: { followers: 90123 },
    })));

    render(<Audience statsUrl="https://social.example.test/v1/public/stats" fetchStats={fetchStats} />);

    await waitFor(() => expect(screen.getByText('90,123')).toBeVisible());
    expect(screen.getByText('25,001')).toBeVisible();
    expect(screen.getByText('Live follower figures · updated 11 Oct 2026')).toBeVisible();
    expect(fetchStats).toHaveBeenCalledWith(
      'https://social.example.test/v1/public/stats',
      expect.objectContaining({ credentials: 'omit' }),
    );
  });

  test('does not replace approved figures with a malformed response', async () => {
    const fetchStats = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      updatedAt: 'not a date',
      instagram: { followers: 'a lot' },
    })));

    render(<Audience statsUrl="https://social.example.test/v1/public/stats" fetchStats={fetchStats} />);

    await waitFor(() => expect(fetchStats).toHaveBeenCalled());
    expect(screen.getByText('82,187')).toBeVisible();
    expect(screen.getByText('21,788')).toBeVisible();
    expect(screen.getByText('Recorded audience figures')).toBeVisible();
  });
});
