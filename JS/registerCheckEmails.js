async function getMails(emp, arr) {
  let getEmployee = await (await fetch(` http://localhost:3000/${emp}`)).json();
  getEmployee.forEach((employee) => arr.push(employee.email));
}

export { getMails };
