import { forms, userName, password } from "./selectors.js";
import { emp, emp_Pass, admins, admin_Pass, security, security_pass } from "./arrays.js";
import { getActiveEmployee } from "./getLoginInformation.js";
import { checkUserName, checkPassword } from "./checkLogin.js";

getActiveEmployee("employees", emp, emp_Pass);
getActiveEmployee("admin", admins, admin_Pass);
getActiveEmployee("security", security, security_pass);

forms.forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");
      } else {
        let user_Name = userName.value;
        let pass = password.value;

        let checkAdmin = checkUserName(admins, user_Name);
        let checkAdminPass = checkPassword(admin_Pass, pass);
        let checkEmp = checkUserName(emp, user_Name);
        let checkEmpPass = checkPassword(emp_Pass, pass);
        let checkSecurity = checkUserName(security, user_Name);
        let checkSecurityPass = checkPassword(security_pass, pass);

        if (checkAdmin && checkAdminPass) {
          invalid.style.display = "none";
          sessionStorage.setItem("admin", user_Name);

          window.open("./../HTML/Admin.html");
        } else if (checkEmp && checkEmpPass) {
          invalid.style.display = "none";
          sessionStorage.setItem("employee", user_Name);
          window.open("./../HTML/employee.html");
        } else if (checkSecurity && checkSecurityPass) {
          sessionStorage.setItem("sec", user_Name);
          sessionStorage.setItem("secAccess", true);
          invalid.style.display = "none";
          window.open("./../HTML/ConfirmAttendance.html");
        } else {
          invalid.style.display = "block";
          event.preventDefault();
        }
      }
    },
    false
  );
});
