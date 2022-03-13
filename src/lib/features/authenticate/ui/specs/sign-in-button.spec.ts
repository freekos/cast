import SignInButton from '../sign-in-button.svelte';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

jest.mock('../../model/sign-in', () => ({
  signIn: jest.fn(),
}));

import { signIn } from '../../model/sign-in';

it('calls the signIn function on click', async () => {
  const user = userEvent.setup();
  const { getByRole } = render(SignInButton);
  await user.click(getByRole('button', { name: 'Sign in with GitHub' }));
  expect(signIn).toHaveBeenCalled();
});
