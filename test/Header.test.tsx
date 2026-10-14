import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../src/components/portfolio/Header';

describe('Header', () => {
  test('closes the mobile menu after a destination is chosen', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const summary = screen.getByText('Menu');
    const details = summary.closest('details')!;
    details.open = true;

    await user.click(screen.getAllByRole('link', { name: 'The story' })[1]);

    expect(details).not.toHaveAttribute('open');
  });

  test('Escape closes the mobile menu and returns focus to its summary', () => {
    render(<Header />);
    const summary = screen.getByText('Menu');
    const details = summary.closest('details')!;
    details.open = true;

    fireEvent.keyDown(details, { key: 'Escape' });

    expect(details).not.toHaveAttribute('open');
    expect(summary).toHaveFocus();
  });
});
