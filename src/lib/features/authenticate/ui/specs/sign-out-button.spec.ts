import SignOutButton from '../sign-out-button.svelte';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

jest.mock('../../model/sign-out', () => ({
  signOut: jest.fn(),
}));

import { signOut } from '../../model/sign-out';

it('renders and clicks the sign out button', async () => {
  const user = userEvent.setup();
  const { getByRole } = render(SignOutButton);
  await user.click(getByRole('button', { name: 'Sign out' }));
  expect(signOut).toHaveBeenCalledTimes(1);
});
