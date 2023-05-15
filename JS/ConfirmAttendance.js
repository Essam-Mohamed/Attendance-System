import { button, forms, userName, selected, btnSecurity } from "./selectors.js";
import {
  getDate,
  getArriveTime,
  padTo2Digits,
  convertMsToTime,
  getMilliSeconds,
  getTime,
  deleteAM_PM,
  converMinute,
} from "./timeFunctions.js";
import { getEmployee, get_Employee, updateEmployee, valid } from "./EmployeesFunctions.js";
if (sessionStorage.getItem("secAccess")) {
  function setAbsent(empType, employeeType, currentDay) {
    empType.forEach(async (e) => {
      if (e.attendance[e.attendance.length - 1].date != currentDay) {
        e.attendance.push({
          date: currentDay,
          absent: true,
          arrivalTime: "---",
          late: "---",
          depatureTime: "---",
        });
        let _id = e.id;
        await updateEmployee(_id, e, employeeType);
      }
    });
  }

  async function insertAttendance(userName, employeeType) {
    let today = new Date();
    let currentDay = getDate(today);
    let absent = false;
    let employee = await getEmployee(userName, employeeType);
    let employeeObj = employee[0];
    console.log(employeeObj);
    let _id = employeeObj.id;
    let arrivalTime = getArriveTime(today);
    let arrivalTimeInMilliSeconds = getMilliSeconds(deleteAM_PM(arrivalTime));
    let lateInMillSeconds = arrivalTimeInMilliSeconds - getMilliSeconds("08:30:00");
    let late = converMinute(lateInMillSeconds);
    if (lateInMillSeconds <= 0) late = 0;

    if (employeeObj.startDate == undefined) {
      let firstDay = getDate(today);
      let attendanceTime;
      let now = new Date().getHours();
      if (now > 9) {
        absent = true;
        employeeObj.startDate = firstDay;
        attendanceTime = {
          date: firstDay,
          absent: absent,
          arrivalTime: "---",
          late: "---",
          depatureTime: "---",
        };
      } else {
        employeeObj.startDate = firstDay;
        attendanceTime = { date: firstDay, absent: absent, arrivalTime: arrivalTime, late: late };
      }

      employeeObj.attendance = [attendanceTime];
      await updateEmployee(_id, employeeObj, employeeType);
    } else {
      let lastIndex = employeeObj.attendance.length - 1;
      let lastAttendance = employeeObj.attendance[lastIndex];

      if (lastAttendance.date == currentDay) {
        if (lastAttendance.depatureTime == undefined && lastAttendance.absent == false) {
          let depatureTime = getArriveTime(today);
          lastAttendance.depatureTime = depatureTime;
          await updateEmployee(_id, employeeObj, employeeType);
        } else if (lastAttendance.depatureTime != undefined) {
          return;
        }
      } else if (lastAttendance.date != currentDay) {
        let now = new Date().getHours();
        if (now > 9) {
          let emp = await get_Employee(selected.value);
          setAbsent(emp, selected.value, currentDay);
        } else {
          let attendanceTime = {
            date: currentDay,
            absent: absent,
            arrivalTime: arrivalTime,
            late: late,
          };
          employeeObj.attendance.push(attendanceTime);
          await updateEmployee(_id, employeeObj, employeeType);
        }
      }
    }
  }

  forms.forEach(function (form) {
    button.addEventListener(
      "click",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          let user_Name = userName.value;
          let _selected = selected.value;

          if (_selected == "employees") {
            valid(user_Name, _selected);
            insertAttendance(user_Name, _selected);
          } else if (_selected == "security") {
            valid(user_Name, _selected);
            insertAttendance(user_Name, _selected);
          }
        }
      },
      false
    );
  });
  btnSecurity.addEventListener("click", function () {
    window.open("./../HTML/security.html");
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
  let bodySelected = document.getElementsByTagName("body")[0];
  bodySelected.style.backgroundImage = "none";
  window.location.replace("http://127.0.0.1:5500/HTML/Logn.html");
}
