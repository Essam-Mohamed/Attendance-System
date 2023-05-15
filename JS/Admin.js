import {
  tbodyA1,
  tbodyA2,
  tbodyA3,
  tbodyA4,
  tbodyA5,
  oneDay,
  multiDays,
  fDay,
  lDay,
  eventCalender,
  pending,
  displayOne,
  dsiplayMany,
  findByUserName,
  findByUserNameMany,
  sinOutA,
  thead1,
  tag3,
  tag4,
  user,
  info,
  display1,
  display2,
  display3,
  selectType,
  menu,
} from "./selectors.js";
import { sendEmail } from "./sendEmails.js";
import { getDate } from "./timeFunctions.js";
import {
  deletEmployee,
  getPendingEmployee,
  setUsersNamePass,
  admitEmployee,
  getEmployee,
  get_Employee,
  getEMployeeByEmail,
  deletTypeEmployee,
} from "./EmployeesFunctions.js";
if (sessionStorage.getItem("admin")) {
  let displayLateAbsent = document.getElementById("li7");
  let userName = sessionStorage.getItem("admin");
  async function employeeName() {
    let employee = await getEmployee(userName, "admin");
    empName.innerText = "Admin: " + employee[0].fName + " " + employee[0].lName;
    info.innerText = employee[0].fName + " " + employee[0].lName;
  }
  employeeName();

  async function pendingEmployee(empType) {
    let result = await fetch(`http://localhost:3000/${empType}`);
    let employees = await result.json();
    thead1.innerHTML = `<tr>
<th>Id</th>
<th>First Name</th>
<th>Last Name</th>
<th>Address</th>
<th>Email</th>
<th>Age</th>
<th>Remove</th>
<th>Employee</th>
<th>Security</th>

</tr>`;
    for (let emp of employees) {
      if ($.fn.dataTable.isDataTable("#example1")) {
        $("#example1").DataTable().clear().destroy();
      }
      let tr = document.createElement("tr");

      let tds = `<td>${emp.id}</td>
              <td>${emp.fName}</td>
              <td>${emp.lName}</td>
              <td>${emp.address}</td>
              <td>${emp.email}</td>
              <td>${emp.age}</td>`;

      tr.innerHTML = tds;
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let button1 = document.createElement("button");
      let button2 = document.createElement("button");
      let button3 = document.createElement("button");
      button1.addEventListener("click", function () {
        deletEmployee(emp.id);
      });

      button2.addEventListener("click", function () {
        admitEmployee(emp.id, "employees");
      });

      button3.addEventListener("click", function () {
        admitEmployee(emp.id, "security");
      });

      button1.innerText = "Remove";
      button2.innerText = "Employee";
      button3.innerText = "Security";
      td1.appendChild(button1);
      td2.appendChild(button2);
      td3.appendChild(button3);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);

      tbodyA1.appendChild(tr);
    }

    $("#example1").DataTable({
      paging: true,
      lengthChange: false,
      searching: false,
      ordering: true,
      info: true,
      autoWidth: false,
      responsive: true,
    });
  }

  async function allEmployees(empType) {
    let employees = await get_Employee(empType);
    thead1.innerHTML = `<tr>
<th>Id</th>
<th>First Name</th>
<th>Last Name</th>
<th>Address</th>
<th>Email</th>
<th>Age</th>
<th>User Name</th>
<th>Password</th>
<th>Remove</th>


</tr>`;
    employees.forEach((employee) => {
      if ($.fn.dataTable.isDataTable("#example1")) {
        $("#example1").DataTable().clear().destroy();
      }
      let tr = document.createElement("tr");

      let tds = `<td>${employee.id}</td>
              <td>${employee.fName}</td>
              <td>${employee.lName}</td>
              <td>${employee.address}</td>
              <td>${employee.email}</td>
              <td>${employee.age}</td>
              <td>${employee.userName}</td>
              <td>${employee.password}</td>
              `;

      tr.innerHTML = tds;
      let td1 = document.createElement("td");
      let button1 = document.createElement("button");
      button1.addEventListener("click", function () {
        deletTypeEmployee("employees", employee.id);
      });
      button1.innerText = "Remove";
      td1.appendChild(button1);
      tr.appendChild(td1);

      tbodyA1.appendChild(tr);
    });
    $("#example1").DataTable({
      paging: true,
      lengthChange: false,
      searching: true,
      ordering: true,
      info: true,
      autoWidth: false,
      responsive: true,
    });
  }

  async function todayReport(empType) {
    let now = new Date();
    let today = getDate(now);
    let counter = 0;
    let employees = await get_Employee(empType);
    thead1.innerHTML = `<tr>
<th>Id</th>
<th>First Name</th>
<th>Last Name</th>
<th>Email</th>
<th>Date</th>
<th>Arrival Time</th>
<th>Late</th>
<th>depatureTime</th>
<th>Absent</th>
</tr>`;
    employees.forEach((employee) => {
      let emp = employee.attendance.find((e) => e.date == today);
      if (emp) {
        if ($.fn.dataTable.isDataTable("#example1")) {
          $("#example1").DataTable().destroy();
        }
        let tr = document.createElement("tr");
        let tds = `<td>${employee.id}</td>
              <td>${employee.fName}</td>
              <td>${employee.lName}</td>
              <td>${employee.email}</td>
              <td>${emp.date}</td>
              <td>${emp.arrivalTime}</td>
              <td>${emp.late}</td>
              <td>${emp.depatureTime}</td>
              <td>${emp.absent}</td>`;

        tr.innerHTML = tds;
        tbodyA1.appendChild(tr);

        $("#example1").DataTable({
          paging: true,
          lengthChange: false,
          searching: true,
          ordering: true,
          info: true,
          autoWidth: false,
          responsive: true,
        });
      } else {
        counter++;
        if (counter == employees.length) alert("No one Attend Yet");
      }
    });
  }

  async function lateAndAbsent(empType, userName) {
    let employees = await getEmployee(userName, empType);
    let employeeObj = employees[0];
    thead1.innerHTML = `<tr>
<th>Id</th>
<th>First Name</th>
<th>Last Name</th>
<th>Email</th>
<th>Date</th>
<th>Arrival Time</th>
<th>Late</th>
<th>depatureTime</th>
<th>Absent</th>

</tr>`;

    for (let emp of employeeObj.attendance) {
      if ($.fn.dataTable.isDataTable("#example1")) {
        $("#example1").DataTable().clear().destroy();
      }
      let tr = document.createElement("tr");

      let tds = `<td>${employeeObj.id}</td>
              <td>${employeeObj.fName}</td>
              <td>${employeeObj.lName}</td>
              <td>${employeeObj.email}</td>
              <td>${emp.date}</td>
              <td>${emp.arrivalTime}</td>
              <td>${emp.late}</td>
              <td>${emp.depatureTime}</td>
              <td>${emp.absent}</td>`;

      tr.innerHTML = tds;
      tbodyA1.appendChild(tr);
    }
    $("#example1").DataTable({
      paging: true,
      lengthChange: false,
      searching: true,
      ordering: true,
      info: true,
      autoWidth: false,
      responsive: true,
    });
  }

  async function getLateAndAbsent(empType, userName) {
    let employees = await getEmployee(userName, empType);
    if (employees.length != 0) {
      let employeeObj = employees[0];
      thead1.innerHTML = `<tr>
<th>Id</th>
<th>First Name</th>
<th>Last Name</th>
<th>Email</th>
<th>Late</th>
<th>Absent</th>
<th>Depature</th>
</tr>`;

      let late = 0;
      let absent = 0;
      let depature = 0;

      for (let emp of employeeObj.attendance) {
        if ($.fn.dataTable.isDataTable("#example1")) {
          $("#example1").DataTable().clear().destroy();
        }

        if (emp.late != 0) late++;
        if (emp.absent == true) absent++;
        if (emp.depatureTime < "3") depature++;
      }
      let tr = document.createElement("tr");

      let tds = `<td>${employeeObj.id}</td>
              <td>${employeeObj.fName}</td>
              <td>${employeeObj.lName}</td>
              <td>${employeeObj.email}</td>
              <td>${late}</td>
              <td>${absent}</td>
              <td>${depature}</td>
              `;

      tr.innerHTML = tds;
      tbodyA1.appendChild(tr);

      $("#example1").DataTable({
        paging: true,
        stateSave: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true,
      });
    } else alert("Wrong User Name");
  }

  async function displayDaily(empType, userName) {
    //let userName = await user.value;
    let employee = await getEmployee(userName, empType);
    let employeeObj = employee[0];
    if (employeeObj) {
      thead1.innerHTML = `<tr>
  <th>Id</th>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Email</th>
  <th>Date</th>
  <th>Arrival Time</th>
  <th>Late</th>
  <th>depatureTime</th>
  <th>Absent</th>
</tr>`;

      let matched = employeeObj.attendance.find((e) => e.date == fDay.value);
      if ($.fn.dataTable.isDataTable("#example1")) {
        $("#example1").DataTable().clear().destroy();
      }
      if (matched) {
        let tr = document.createElement("tr");
        let tds = `<td>${employeeObj.id}</td>
                  <td>${employeeObj.fName}</td>
                  <td>${employeeObj.lName}</td>
                  <td>${employeeObj.email}</td>
                  <td>${matched.date}</td>
                  <td>${matched.arrivalTime}</td>
                  <td>${matched.late}</td>
                  <td>${matched.depatureTime}</td>
                  <td>${matched.absent}</td>`;

        tr.innerHTML = tds;
        tbodyA1.appendChild(tr);

        $("#example1").DataTable({
          paging: true,
          lengthChange: false,
          searching: false,
          ordering: true,
          info: true,
          autoWidth: false,
          responsive: true,
        });
      } else alert("Wrong Date");
    } else alert("Wrong Use Name");
  }

  async function displayMonthly(empType, userName) {
    //let userName = await user.value;
    let employee = await getEmployee(userName, empType);
    let employeeObj = employee[0];
    if (employeeObj) {
      thead1.innerHTML = `<tr>
  <th>Id</th>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Address</th>
  <th>Email</th>
  <th>Age</th>
  <th>Date</th>
  <th>Arrival Time</th>
  <th>Late</th>
  <th>DepatureTime</th>
  <th>Absent</th>
</tr>`;

      let matched = employeeObj.attendance.findIndex((e) => e.date == fDay.value);
      let matchedEnd = employeeObj.attendance.findIndex((e) => e.date == lDay.value);
      if ($.fn.dataTable.isDataTable("#example1")) {
        $("#example1").DataTable().clear().destroy();
      }
      if (matched != -1 && matchedEnd != -1) {
        for (let i = matched; i <= matchedEnd; i++) {
          let employeeAttendance = employeeObj.attendance[i];

          let tr = document.createElement("tr");
          let tds = `<td>${employeeObj.id}</td>
                    <td>${employeeObj.fName}</td>
                    <td>${employeeObj.lName}</td>
                    <td>${employeeObj.address}</td>
                    <td>${employeeObj.email}</td>
                    <td>${employeeObj.age}</td>
                    <td>${employeeAttendance.date}</td>
                    <td>${employeeAttendance.arrivalTime}</td>
                    <td>${employeeAttendance.late}</td>
                    <td>${employeeAttendance.depatureTime}</td>
                    <td>${employeeAttendance.absent}</td>`;

          tr.innerHTML = tds;
          tbodyA1.appendChild(tr);
        }

        $("#example1").DataTable({
          paging: true,
          lengthChange: false,
          searching: true,
          ordering: true,
          info: true,
          autoWidth: false,
          responsive: true,
        });
      } else alert("Wrong  Date");
    } else alert("Wrong User Name");
  }

  function pendingEmp() {
    tag1.style.display = "none";
    tag2.style.display = "none";
    tag3.style.display = "none";
    tag4.style.display = "none";

    if ($.fn.dataTable.isDataTable("#example1")) {
      $("#example1").DataTable().clear().destroy();
    }
    pendingEmployee("pendingEmployees");
  }
  function todayReportEmp() {
    tag1.style.display = "none";
    tag2.style.display = "none";
    tag3.style.display = "none";
    tag4.style.display = "none";

    if ($.fn.dataTable.isDataTable("#example1")) {
      $("#example1").DataTable().clear().destroy();
    }
    todayReport("employees");
  }
  function todayReportSec() {
    tag1.style.display = "none";
    tag2.style.display = "none";
    tag3.style.display = "none";
    tag4.style.display = "none";

    if ($.fn.dataTable.isDataTable("#example1")) {
      $("#example1").DataTable().clear().destroy();
    }
    todayReport("security");
  }
  function allEmployeesEmp() {
    tag1.style.display = "none";
    tag2.style.display = "none";
    tag4.style.display = "none";

    if ($.fn.dataTable.isDataTable("#example1")) {
      $("#example1").DataTable().clear().destroy();
    }
    allEmployees("employees");
  }
  function allEmployeesSec() {
    tag1.style.display = "none";
    tag2.style.display = "none";
    tag4.style.display = "none";

    if ($.fn.dataTable.isDataTable("#example1")) {
      $("#example1").DataTable().clear().destroy();
    }
    allEmployees("security");
  }
  function display3Emp() {
    let userNameValue = user.value;
    getLateAndAbsent("employees", userNameValue);
  }
  function display3Sec() {
    let userNameValue = user.value;
    getLateAndAbsent("security", userNameValue);
  }
  function lateAndAbsentEmp() {
    tag1.style.display = "none";
    tag2.style.display = "none";
    tag4.style.display = "block";
    display1.style.display = "none";
    display2.style.display = "none";
    display3.style.display = "block";

    if ($.fn.dataTable.isDataTable("#example1")) {
      $("#example1").DataTable().clear().destroy();
    }

    display3.removeEventListener("click", display3Sec);
    display3.addEventListener("click", display3Emp);
  }
  function lateAndAbsentSec() {
    tag1.style.display = "none";
    tag2.style.display = "none";
    tag4.style.display = "block";
    display1.style.display = "none";
    display2.style.display = "none";
    display3.style.display = "block";
    if ($.fn.dataTable.isDataTable("#example1")) {
      $("#example1").DataTable().clear().destroy();
    }

    display3.removeEventListener("click", display3Emp);
    display3.addEventListener("click", display3Sec);
  }
  function display1Emp() {
    let userNameValue = user.value;
    displayDaily("employees", userNameValue);
  }
  function display1Sec() {
    let userNameValue = user.value;
    displayDaily("security", userNameValue);
  }
  function displayDailyEmp() {
    tag1.style.display = "block";
    tag4.style.display = "block";
    tag2.style.display = "none";
    tag3.style.display = "none";
    display1.style.display = "block";
    display2.style.display = "none";
    display3.style.display = "none";

    if ($.fn.dataTable.isDataTable("#example1")) {
      $("#example1").DataTable().clear().destroy();
    }
    display1.removeEventListener("click", display1Sec);
    display1.addEventListener("click", display1Emp);
  }
  function displayDailySec() {
    tag1.style.display = "block";
    tag4.style.display = "block";
    tag2.style.display = "none";
    tag3.style.display = "none";
    display1.style.display = "block";
    display2.style.display = "none";
    display3.style.display = "none";

    if ($.fn.dataTable.isDataTable("#example1")) {
      $("#example1").DataTable().clear().destroy();
    }
    display1.removeEventListener("click", display1Emp);
    display1.addEventListener("click", display1Sec);
  }
  function display2Emp() {
    let userNameValue = user.value;
    displayMonthly("employees", userNameValue);
  }
  function display2Sec() {
    let userNameValue = user.value;
    displayMonthly("security", userNameValue);
  }
  function displayMonthlyEmp() {
    tag1.style.display = "block";
    tag2.style.display = "block";
    tag4.style.display = "block";
    tag3.style.display = "none";
    display1.style.display = "none";
    display2.style.display = "block";
    display3.style.display = "none";

    if ($.fn.dataTable.isDataTable("#example1")) {
      $("#example1").DataTable().clear().destroy();
    }
    display2.removeEventListener("click", display2Sec);
    display2.addEventListener("click", display2Emp);
  }
  function displayMonthlySec() {
    tag1.style.display = "block";
    tag2.style.display = "block";
    tag4.style.display = "block";
    tag3.style.display = "none";
    display1.style.display = "none";
    display2.style.display = "block";
    display3.style.display = "none";

    if ($.fn.dataTable.isDataTable("#example1")) {
      $("#example1").DataTable().clear().destroy();
    }
    display2.removeEventListener("click", display2Emp);
    display2.addEventListener("click", display2Sec);
  }
  let checkingType = selectType.value;
  selectType.addEventListener("change", function () {
    checkingType = selectType.value;

    if (checkingType == "employees") {
      if ($.fn.dataTable.isDataTable("#example1")) {
        $("#example1").DataTable().clear().destroy();
      }
      displayOne.removeEventListener("click", todayReportSec);
      dsiplayMany.removeEventListener("click", allEmployeesSec);
      displayLateAbsent.removeEventListener("click", lateAndAbsentSec);
      findByUserName.removeEventListener("click", displayDailySec);
      findByUserNameMany.removeEventListener("click", displayMonthlySec);

      pending.addEventListener("click", pendingEmp);
      displayOne.addEventListener("click", todayReportEmp);
      dsiplayMany.addEventListener("click", allEmployeesEmp);
      displayLateAbsent.addEventListener("click", lateAndAbsentEmp);
      findByUserName.addEventListener("click", displayDailyEmp);
      findByUserNameMany.addEventListener("click", displayMonthlyEmp);
    } else if (checkingType == "security") {
      if ($.fn.dataTable.isDataTable("#example1")) {
        $("#example1").DataTable().clear().destroy();
      }
      displayOne.removeEventListener("click", todayReportEmp);
      dsiplayMany.removeEventListener("click", allEmployeesEmp);
      displayLateAbsent.removeEventListener("click", lateAndAbsentEmp);
      findByUserName.removeEventListener("click", displayDailyEmp);
      findByUserNameMany.removeEventListener("click", displayMonthlyEmp);

      pending.addEventListener("click", pendingEmp);
      displayOne.addEventListener("click", todayReportSec);
      dsiplayMany.addEventListener("click", allEmployeesSec);
      displayLateAbsent.addEventListener("click", lateAndAbsentSec);
      findByUserName.addEventListener("click", displayDailySec);
      findByUserNameMany.addEventListener("click", displayMonthlySec);
    } else {
      if ($.fn.dataTable.isDataTable("#example1")) {
        $("#example1").DataTable().clear().destroy();
      }
      pending.removeEventListener("click", pendingEmp);
      displayOne.removeEventListener("click", todayReportEmp);
      displayOne.removeEventListener("click", todayReportSec);
      dsiplayMany.removeEventListener("click", allEmployeesEmp);
      dsiplayMany.removeEventListener("click", allEmployeesSec);
      displayLateAbsent.removeEventListener("click", lateAndAbsentEmp);
      displayLateAbsent.removeEventListener("click", lateAndAbsentSec);
      findByUserName.removeEventListener("click", displayDailyEmp);
      findByUserName.removeEventListener("click", displayDailySec);
      findByUserNameMany.removeEventListener("click", displayMonthlyEmp);
      findByUserNameMany.removeEventListener("click", displayMonthlySec);
    }
  });

  sinOutA.addEventListener("click", function () {
    window.open("", "_self").close();
  });
} else {
  let htmlElement = document.getElementById("html");
  let bodyElement = document.getElementById("body");
  htmlElement.removeChild(bodyElement);
  let bodyTage = document.createElement("body");
  bodyTage.innerHTML = "<p>Can't Access This page</p>";
  htmlElement.appendChild(bodyTage);
  let title = document.getElementsByTagName("title")[0];
  title.innerText = "Error";
  window.location.replace("http://127.0.0.1:5500/HTML/Logn.html");
}
