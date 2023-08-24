const inquirer = require('inquirer');
const mysql = require("mysql2");

function mainMenu() {
    const choices = [
        "View all employees",
        "Add employee",
        "Update employee role",
        "View all roles",
        "Add role",
        "View all departments",
        "Add department",
        "Quit"
    ];

    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: choices
        }
    ]).then(function (answers) {
        switch (answers.action) {
            case "View all employees":
                // Call the function to view all employees
                break;
            case "Add employee":
                // Call the function to add an employee
                break;
            case "Update employee role":
                // Call the function to update an employee's role
                break;
            case "View all roles":
                // Call the function to view all roles
                break;
            case "Add role":
                // Call the function to add a role
                break;
            case "View all departments":
                // Call the function to view all departments
                break;
            case "Add department":
                // Call the function to add a department
                break;
            case "Quit":
                console.log("Exiting the application. Goodbye!");
                process.exit(0); // Exit the application
                break;
        }
    });
}

mainMenu();