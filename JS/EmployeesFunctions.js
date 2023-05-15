async function deletEmployee(id) {
  await fetch(` http://localhost:3000/pendingEmployees/${id}`, {
    method: "DELETE",
  });
}

async function deletTypeEmployee(empType, id) {
  await fetch(` http://localhost:3000/${empType}/${id}`, {
    method: "DELETE",
  });
}

async function getPendingEmployee(id) {
  let emp = await fetch(` http://localhost:3000/pendingEmployees?id=${id}`);
  let result = await emp.json();
  return result;
}

function setUsersNamePass(employee) {
  let randomNum = Math.trunc(Math.random() * 3000) + 1000;
  employee.id = "";
  console.log(employee);
  let fName = employee.fName;
  let lName = employee.lName;
  let userName = fName + lName + randomNum;
  let password = Math.trunc(Math.random() * 800000000) + 10000000;
  employee.userName = userName;
  employee.password = password;
  return employee;
}
async function addEmployee(position, employee) {
  await fetch(` http://localhost:3000/${position}`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(employee),
  });
}

async function sendEmail(emp) {
  let email = await emailjs.send("service_b6awx5k", "template_b2n00or", {
    from_name: "Essam",
    to_name: emp.fName,
    message: "your  admin admit you",
    userName: emp.userName,
    password: emp.password,
    email_to: emp.email,
  });
  return email;
}

async function admitEmployee(id, role) {
  let arrEmployee = await getPendingEmployee(id);
  let objEmployee = arrEmployee[0];
  let newEmployee = setUsersNamePass(objEmployee);
  await sendEmail(newEmployee);
  addEmployee(role, newEmployee);
  deletEmployee(id);
}

async function get_Employee(employeeType) {
  let emp = await fetch(` http://localhost:3000/${employeeType}`);
  let result = await emp.json();
  return result;
}

async function getEmployee(userName, employeeType) {
  let emp = await fetch(` http://localhost:3000/${employeeType}?userName=${userName}`);
  let result = await emp.json();
  return result;
}

async function updateEmployee(id, employeeObj, employeeType) {
  await fetch(` http://localhost:3000/${employeeType}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(employeeObj),
  });
}

async function getEMployeeByEmail(typeEmp, mail) {
  let employee = await fetch(`http://localhost:3000/${typeEmp}?email=${mail}`);
  let emp = await employee;
  return emp;
}

async function valid(user_Name, _selected) {
  let check = await getEmployee(user_Name, _selected);
  if (check.length) invalid.style.display = "none";
  else invalid.style.display = "block";
}
export {
  deletEmployee,
  getPendingEmployee,
  setUsersNamePass,
  admitEmployee,
  get_Employee,
  updateEmployee,
  getEmployee,
  getEMployeeByEmail,
  deletTypeEmployee,
  valid,
};
