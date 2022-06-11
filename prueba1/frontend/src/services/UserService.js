export const getAll = async (name) => {
  const response = fetch(`http://127.0.0.1:8000/api/users`);
  const data = (await response).json();
  return data;
};

export const filter = async (json) => {
  const response = fetch(`http://127.0.0.1:8000/api/users/filter`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
  const data = (await response).json();
  return data;
};

export const getUserById = async (id) => {
  const response = fetch(`http://127.0.0.1:8000/api/users/${id}`);
  const data = (await response).json();
  return data;
};


export const deleteUser = async (id) => {
  const response = fetch(`http://127.0.0.1:8000/api/users/${id}`, {
    method: 'DELETE',
  });
  const data = (await response).json();
  return data;
};

