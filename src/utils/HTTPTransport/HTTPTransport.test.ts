import { assert } from 'chai';
import nock from 'nock';
import { HTTPTransport } from './HTTPTransport.ts';
import { UserResponseType } from '../../types/user.ts';

describe('HTTPTransport request', () => {
  const request = new HTTPTransport();

  nock('https://fake.it')
    .get('/auth/user')
    .times(4)
    .reply(200, {
      id: 123,
      first_name: 'Petya',
      second_name: 'Pupkin',
      display_name: 'Petya Pupkin',
      phone: '+79001001100',
      login: 'userLogin',
      avatar: '/path/to/avatar.jpg',
      email: 'string@ya.ru',
    })
    .get('/auth/qqq')
    .reply(400, { reason: 'bad route' });

  const fakeRequest = new HTTPTransport('https://fake.it');

  it('get', async () => {
    const response = await request.get({}, '/chats');

    assert.equal(typeof response.status, 'number');
  });

  it('post', async () => {
    const response = await request.post({}, '/chats');

    assert.equal(typeof response.status, 'number');
  });

  it('put', async () => {
    const response = await request.put({}, '/chats');

    assert.equal(typeof response.status, 'number');
  });

  it('delete', async () => {
    const response = await request.delete({}, '/chats');

    assert.equal(typeof response.status, 'number');
  });

  it('status is 401', async () => {
    const response = await request.get({}, '/chats');

    assert.equal(response.status, 401);
  });

  it('status is ok', async () => {
    const response = await fakeRequest.get({}, '/auth/user');

    assert.equal(response.ok, true);
  });

  it('status is 200', async () => {
    const response = await fakeRequest.get({}, '/auth/user');

    assert.equal(response.status, 200);
  });
  it('response is valid json', async () => {
    const response = await fakeRequest.get({}, '/auth/user');
    const data = <UserResponseType>response.json();

    assert.equal(data.id, 123);
  });

  it('status is 400', async () => {
    const response = await fakeRequest.get({}, '/auth/qqq');

    assert.equal(response.status, 400);
  });
});
