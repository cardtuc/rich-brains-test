export const getClients = async () => {
  const response = await fetch(`http://localhost:3333/clients`);

  if (!response.ok) {
    throw new Error(await response.json());
  }
  return response.json();
};

export const loginReq = async (login, password) => {
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login, password })
  };

  const response = await fetch(`http://localhost:3333/user/login`, settings);

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return response.json();
};

export const createClient = async (name, surname, age, dateOfBirth, phone, country) => {
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      user: localStorage.getItem('AUTH_TOKEN')
    },
    body: JSON.stringify({ name, surname, age, dateOfBirth, phone, country })
  };

  const response = await fetch(`http://localhost:3333/clients/add`, settings);

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return response.json();
};

export const getClient = async (id) => {
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      user: localStorage.getItem('AUTH_TOKEN')
    },
    body: JSON.stringify({ id })
  };

  const response = await fetch(`http://localhost:3333/clients/get`, settings);

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return response.json();
};

export const deleteClient = async (id) => {
  const settings = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      user: localStorage.getItem('AUTH_TOKEN')
    },
    body: JSON.stringify({ id })
  };

  const response = await fetch(`http://localhost:3333/clients/remove?id=${id}`, settings);

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return response.json();
};

export const editClient = async (id, name, surname, age, dateOfBirth, phone, country) => {
  const settings = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      user: localStorage.getItem('AUTH_TOKEN')
    },
    body: JSON.stringify({ id, name, surname, age, dateOfBirth, phone, country })
  };

  const response = await fetch(`http://localhost:3333/clients/edit`, settings);

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return response.json();
};
