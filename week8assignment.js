// create menu app that manage attendance for employees that accept name and idnumber as argument.
class Employee {
  constructor(name, idnumber) {
    this.name = name;
    this.idnumber = idnumber;
  }
}

// below are 2 classes with array.
class Attendance {
  constructor(name) {
    this.name = name;
    this.record = [];
  }

  addRecord(record) {
    if (record instanceof Employee) {
      this.record.push(record);
    } else {
      throw new Error("you can only add current record ");
    }
  }

  describe() {
    return `This ${this.name} has ${this.record.length} recorded attendance`;
  }
}

// below is setting up the menu itself with possible options
class Menu {
  constructor() {
    this.attendanceList = [];
    this.selectedattendance = null;
  }

  // showing possible options for the menu you can pick up
  start() {
    let selection = this.menuAttendanceOptions();
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createAttendance();
          break;
        case "2":
          this.viewAttendance();
          break;
        case "3":
          this.deleteAttendance();
          break;
        case "4":
          this.viewAllAttendances();
          break;
        default:
          selection = 0;
      }

      selection = this.menuAttendanceOptions();
    }

    alert("Good bye.");
  }

  menuAttendanceOptions() {
    return prompt(`
        0) exit
        1) create attendance
        2) view attendance
        3) delete attendance
        4) view all attendance
        `);
  }

  showSupervisorMenuOptions(attendanceInfo) {
    return prompt(`
        0)Back
        1)create new attendance record
        2)delete existing attendance record
        ---------------
        ${attendanceInfo}
        `);
  }

  // options of viewing all the attendances. it has a for loop and have a string

  viewAllAttendances() {
    let attendanceString = " ";
    for (let i = 0; i < this.attendanceList.length; i++) {
      attendanceString += i + ") " + this.attendanceList[i].name + "\n";
    }
    alert(attendanceString);
  }

  // option of creating new attendance using name that is in the class of Employee. use push method to array.
  createAttendance() {
    let name = prompt("Enter name of new employee");
    this.attendanceList.push(new Attendance(name));
  }

  //option of viewing attendance with a for loop. this is viewing a specific attendance record
  viewAttendance() {
    let index = prompt("Enter the index of the attendance name to view");
    if (index > -1 && index < this.attendanceList.length) {
      this.selectedattendance = this.attendanceList[index];
      let description =
        " Attendance name : " + this.selectedattendance.name + "\n";

      //description of all employees to the attendance using the created record array.
      for (let i = 0; i < this.selectedattendance.record.length; i++) {
        description +=
          i +
          " ) " +
          this.selectedattendance.record[i].name +
          " - " +
          this.selectedattendance.record[i].idnumber +
          "\n";
      }

      //// Show additional menu for managing records within the selected attendance

      let selection = this.showSupervisorMenuOptions(description);
      switch (selection) {
        case "1":
          this.createNewAttendanceRecord();
          break;
        case "2":
          this.deleteExistingAttendanceRecord();
          break;
      }
    }
  }

  // option of deleting in case you want to delete one or more attendance
  deleteAttendance() {
    let index = prompt("enter the index of the record you want to delete");
    if (index > -1 && index < this.attendanceList.length) {
      this.attendanceList.splice(index, 1);
    }
  }

  createNewAttendanceRecord() {
    let name = prompt(" enter the name for new attendance");
    let idnumber = prompt("enter id number for new attendance");
    this.selectedattendance.record.push(new Employee(name, idnumber));
  }

  deleteExistingAttendanceRecord() {
    let index = prompt(
      "enter the index of attendance record you want to delete"
    );
    if (index > -1 && index < this.attendanceList.record.length) {
      this.attendanceList.record.splice(index, 1);
    }
  }
}
let menu = new Menu();
menu.start();
