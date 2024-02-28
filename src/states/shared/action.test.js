import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import { asyncPopulateUsersAndTalks } from './action';
import { receiveTalksActionCreator } from '../talks/action';
import { receiveUsersActionCreator } from '../users/action';

/**
 * skenario test
 *
 * - asyncPopulateUsersAndTalks thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

describe('asyncPopulateUsersAndTalks thunk', () => {
  // Fake responses
  const fakeTalksResponse = [
    {
      id: 'talk-1',
      text: 'Talk Test 1',
      user: 'user-1',
      replyTo: '',
      likes: [],
      createdAt: '2022-09-22T10:06:55.588Z',
    },
  ];

  const fakeUsersResponse = [
    {
      id: 'user-1',
      name: 'User Test 1',
      photo: 'https://generated-image-url.jpg',
    },
  ];

  const fakeErrorResponse = new Error('Ups, something went wrong');

  // Test lifecycle
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllTalks = api.getAllTalks;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllTalks = api._getAllTalks;

    // delete backup data
    delete api._getAllUsers;
    delete api._getAllTalks;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Setup stub functions
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllTalks = () => Promise.resolve(fakeTalksResponse);

    // Mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncPopulateUsersAndTalks()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(
      receiveTalksActionCreator(fakeTalksResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse),
    );
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // Arrange
    // Setup stub functions
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllTalks = () => Promise.reject(fakeErrorResponse);

    // Mock dispatch
    const dispatch = vi.fn();

    // Mock alert
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndTalks()(dispatch);

    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
