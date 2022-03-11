import svelte from 'svelte-inline-compile';
import { LogoutButton } from '..';
import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import { render } from '@testing-library/svelte';

it('renders the button', async () => {
  const loginButton = useLocalVars(svelte`<LogoutButton />`, [LogoutButton]);

  const { getByRole } = render(loginButton);
  expect(getByRole('button', { name: 'Sign out' })).toBeInTheDocument();
});
