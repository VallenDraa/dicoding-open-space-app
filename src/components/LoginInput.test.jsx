/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */
import React from 'react';
import { expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginInput } from './LoginInput';

describe('LoginInput component', () => {
  it('should handle username typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const usernameInput = await screen.getByPlaceholderText('Username');

    // Action
    await userEvent.type(usernameInput, 'username');

    // Assert
    expect(usernameInput).toHaveValue('username');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'password');

    // Assert
    expect(passwordInput).toHaveValue('password');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLoginFn = vi.fn();
    render(<LoginInput login={mockLoginFn} />);
    const usernameInput = await screen.getByPlaceholderText('Username');
    await userEvent.type(usernameInput, 'usernametest');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLoginFn).toBeCalledTimes(1);
    expect(mockLoginFn).toBeCalledWith({
      id: 'usernametest',
      password: 'passwordtest',
    });
  });
});
