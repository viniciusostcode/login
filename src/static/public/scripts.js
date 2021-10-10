const API_BASE_URL = '';
const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

const { user: formUser, message: formMessage } = document.forms;
const tbodyUsers = document.querySelector('[data-js="tbody-users"]');
const ulUserMessages = document.querySelector('[data-js="ul-user-messages"]');
const spanUsernameMessage = document.querySelector('[data-js="username-message"]');
const usersSelect = document.querySelector('#user');

function deleteMessage(userId, username, messageId) {
  const url = `${API_BASE_URL}/users/${userId}/messages/${messageId}`;
  
  fetch(url, { method: 'DELETE', headers: DEFAULT_HEADERS })
    .then(() => showMessages(userId, username))
    .catch(error => alert(error.message))
}

function createUlMessages(userId, username, messages) {
  const lis = messages.map(({ id, message }) => (`
    <li>
      <button onclick="deleteMessage(${userId}, '${username}', ${id})">Excluir</button>
      ${message}
    </li>
  `))

  spanUsernameMessage.innerHTML = `"${username}"`;
  ulUserMessages.innerHTML = lis.join('');
}

function showMessages(userId, username) {
  const url = `${API_BASE_URL}/users/${userId}/messages`;

  fetch(url, { headers: DEFAULT_HEADERS })
    .then(response => response.json())
    .then(messages => createUlMessages(userId, username, messages))
    .catch(error => alert(error.message))
}

function createUsersListAndSelect(users) {
  const trs = users.map(({ id, username }) => (`
    <tr>
      <th>${username}</th>
      <th><button onclick="showMessages(${id}, '${username}')">VER MENSAGENS</button></th>
    </tr>  
  `))
  tbodyUsers.innerHTML = trs.join('')

  const options = users.map(({ id, username }) => (`
    <option value="${id}">${username}</option>
  `))
  usersSelect.innerHTML = options.join('')
}

function listAllUsers() {
  const url = `${API_BASE_URL}/users`;
  
  fetch(url, { headers: DEFAULT_HEADERS })
    .then(response => response.json())
    .then(createUsersListAndSelect)
    .catch(error => alert(error.message))
}

function createUser({ username, password }) {
  const url = `${API_BASE_URL}/users`;
  
  fetch(url, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(listAllUsers)
  .catch(error => alert(error.message))
}

function sendMessage({ userId, message }) {
  const url = `${API_BASE_URL}/users/${userId}/messages`;

  fetch(url, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ message })
  })
  .then(() => alert('Message successfully send!'))
  .catch(error => alert(error.message))
}

function loggout() {
  localStorage.clear();
  window.location.href = '/';
}

formUser.addEventListener('submit', function (event) {
  event.preventDefault();

  const { username, password } = this;
  createUser({ username: username.value, password: password.value });
});

formMessage.addEventListener('submit', function (event) {
  event.preventDefault();

  const { message, user } = this;
  sendMessage({ message: message.value, userId: user.value });
});

window.addEventListener('load', () => {
  DEFAULT_HEADERS['x-access-token'] = localStorage.getItem('ACCESS_TOKEN');
  listAllUsers();
});