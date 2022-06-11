export const downloadCSV = async (json) => {
  const response = fetch(`http://127.0.0.1:8000/api/csv/convert`, {
    method: "POST",
    responseType: 'blob',
    body: JSON.stringify(json),
  });
  const data = (await response).json();
  return data;
};
