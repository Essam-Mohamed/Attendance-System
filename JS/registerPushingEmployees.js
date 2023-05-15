async function fetchEmployee(data) {
  await fetch(" http://localhost:3000/pendingEmployees", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(data),
  });
}

export { fetchEmployee };
