import { getEmployee } from "./EmployeesFunctions.js";
import {
  fDay,
  lDay,
  eventCalender,
  oneDay,
  multiDays,
  table1,
  table2,
  tag1,
  tag2,
  tbody,
  tbody1,
  containerTable1,
  containerTable2,
  empOut,
  empName,
  info,
  thead1,
  display1,
  display2,
} from "./selectors.js";
if (sessionStorage.getItem("employee")) {
  let userName = sessionStorage.getItem("employee");
  async function employeeName() {
    let employee = await getEmployee(userName, "employees");
    empName.innerText = employee[0].fName + " " + employee[0].lName;
    info.innerText = employee[0].fName + " " + employee[0].lName;
  }
  employeeName();

  async function employeeDailyReport() {
    let employee = await getEmployee(userName, "employees");
    let employeeObj = employee[0];
    thead1.innerHTML = `<tr>
  <th>Id</th>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Date</th>
  <th>Arrival Time</th>
  <th>Late</th>
  <th>Depature Time</th>
  <th>absent</th>
</tr>`;
    display1.addEventListener("click", function () {
      let matched = employeeObj.attendance.find((e) => e.date == fDay.value);

      if ($.fn.dataTable.isDataTable("#example1")) {
        $("#example1").DataTable().clear().destroy();
      }
      if (matched) {
        let tr = document.createElement("tr");
        let tds = `<td>${employeeObj.id}</td>
                  <td>${employeeObj.fName}</td>
                  <td>${employeeObj.lName}</td>
                  <td>${matched.date}</td>
                  <td>${matched.arrivalTime}</td>
                  <td>${matched.late}</td>
                  <td>${matched.depatureTime}</td>
                  <td>${matched.absent}</td>`;

        tr.innerHTML = tds;
        tbody.appendChild(tr);
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
    });
  }

  async function employeeMonthlyReport() {
    let employee = await getEmployee(userName, "employees");
    let employeeObj = employee[0];
    display2.addEventListener("click", function () {
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
                    <td>${employeeAttendance.date}</td>
                    <td>${employeeAttendance.arrivalTime}</td>
                    <td>${employeeAttendance.late}</td>
                    <td>${employeeAttendance.depatureTime}</td>
                    <td>${employeeAttendance.absent}</td>`;

          tr.innerHTML = tds;
          tbody.appendChild(tr);
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
      } else alert("Wrong Date");
    });
  }

  oneDay.addEventListener("click", function () {
    tag1.style.display = "block";
    tag2.style.display = "none";
    display1.style.display = "block";
    display2.style.display = "none";
    lDay.value = "";
    if ($.fn.dataTable.isDataTable("#example1")) {
      $("#example1").DataTable().clear().destroy();
    }
    employeeDailyReport();
  });

  multiDays.addEventListener("click", function () {
    tag1.style.display = "block";
    tag2.style.display = "block";
    display1.style.display = "none";
    display2.style.display = "block";
    if ($.fn.dataTable.isDataTable("#example1")) {
      $("#example1").DataTable().clear().destroy();
    }

    employeeMonthlyReport();
  });

  empOut.addEventListener("click", function () {
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
