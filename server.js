const inquirer = require("inquirer");
const mysql = require("mysql2/promise"); 
const {
  viewAllEmployees,
  viewAllDepartments,
  viewAllRoles,
  addEmployee,
  updateEmployeeRole,
  addRole,
  addDepartment,
} = require("./config/function");

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Chocolate123',
  database: 'employee_db'
});

const promptUser = () => {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "Add employee",
          "Update employee role",
          "View all roles",
          "Add role",
          "View all departments",
          "Add department",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "View all employees":
          viewAllEmployees(db)
            .then(() => {
              promptUser();
            })
            .catch((err) => {
              console.error("Error while viewing employees:", err);
              promptUser();
            });
          break;

        case "Add employee":
          addEmployee(db)
            .then(() => {
              promptUser();
            })
            .catch((err) => {
              console.error("Error in adding an employee.", err);
              promptUser();
            });
          break;

        case "Update employee role":
          updateEmployeeRole(db)
            .then(() => {
              promptUser();
            })
            .catch((err) => {
              console.error("Error in updating employee.", err);
              promptUser();
            });
          break;

        case "View all roles":
          viewAllRoles(db)
            .then(() => {
              promptUser();
            })
            .catch((err) => {
              console.error("Error while viewing roles.", err);
              promptUser();
            });
          break;

        case "Add role":
          addRole(db)
            .then(() => {
              promptUser();
            })
            .catch((err) => {
              console.error("Error while trying to add a new role.", err);
              promptUser();
            });
          break;

        case "View all departments":
          viewAllDepartments(db)
            .then(() => {
              promptUser();
            })
            .catch((err) => {
              console.error("Error while viewing all departments.", err);
              promptUser();
            });
          break;

        case "Add department":
          addDepartment(db)
            .then(() => {
              promptUser();
            })
            .catch((err) => {
              console.error("Error while trying to add a department.", err);
              promptUser();
            });
          break;

        case "Exit":
          console.log("Goodbye!");
          process.exit();
          break;

        default:
          console.log("Invalid choice");
          promptUser();
          break;
      }
    });
};


const appFunctions = {
  viewAllEmployees,
  viewAllDepartments,
  viewAllRoles,
  addEmployee,
  updateEmployeeRole,
  addRole,
  addDepartment,
};

// Call the initial prompt to start the application
promptUser(appFunctions);
