import { forms, f_Name, l_Name, _address, e_mail, _age, submit } from "./selectors.js";
import { fetchEmployee } from "./registerPushingEmployees.js";
import { getMails } from "./registerCheckEmails.js";
import { emails } from "./arrays.js";

getMails("pendingEmployees", emails);
getMails("admin", emails);
getMails("employees", emails);
getMails("security", emails);

forms.forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");
        valid.style.display = "none";
        invalid.style.display = "none";
      } else {
        let fName = f_Name.value;
        let lName = l_Name.value;
        let address = _address.value;
        let email = e_mail.value;
        let age = _age.value;

        let employeeData = { fName, lName, address, email, age };
        let repeatEmail = emails.find((e) => e == email);

        if (!repeatEmail) {
          fetchEmployee(employeeData);
          invalid.style.display = "none";
          valid.style.display = "block";
        } else {
          invalid.style.display = "block";
          valid.style.display = "none";
          event.preventDefault();
        }
      }
    },
    false
  );
});
