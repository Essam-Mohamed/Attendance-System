async function getActiveEmployee(typeEmployee, arr1, arr2) {
  let employee = await (await fetch(`http://localhost:3000/${typeEmployee}`)).json();
  employee.forEach((e) => arr1.push(e.userName));
  employee.forEach((e) => arr2.push(e.password));
}
export { getActiveEmployee };
