import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrivacyPreferences, { getSavedAnalyticsPreference, saveAnalyticsPreference } from '../src/components/PrivacyPreferences';

describe('PrivacyPreferences', () => {
  test('records and reads a visitor preference', () => {
    expect(getSavedAnalyticsPreference()).toBeNull();
    saveAnalyticsPreference('denied');
    expect(getSavedAnalyticsPreference()).toBe('denied');
  });

  test('offers equally clear allow and necessary-only choices', async () => {
    const user = userEvent.setup();
    const onChoose = vi.fn();
    render(<PrivacyPreferences currentPreference={null} open onChoose={onChoose} onClose={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Use necessary only' }));
    expect(onChoose).toHaveBeenCalledWith(false);
  });

  test('is absent when closed', () => {
    render(<PrivacyPreferences currentPreference="denied" open={false} onChoose={vi.fn()} onClose={vi.fn()} />);
    expect(screen.queryByRole('heading', { name: 'Your privacy choices' })).not.toBeInTheDocument();
  });
});
