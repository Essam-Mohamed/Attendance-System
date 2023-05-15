function checkUserName(typeEmployee, user_Name) {
  return typeEmployee.find((a) => a == user_Name);
}
function checkPassword(password, pass) {
  return password.find((p) => p == pass);
}

export { checkUserName, checkPassword };
