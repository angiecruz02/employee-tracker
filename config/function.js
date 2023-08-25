const inquirer = require("inquirer");

// Function to view all employees
const viewAllEmployees = async (db) => {
  try {
    const [employees] = await db.query("SELECT * FROM employee");
    console.table(employees);
  } catch (error) {
    console.error("Error viewing employees:", error);
  }
};

// Function to view all departments
const viewAllDepartments = async (db) => {
  try {
    const [departments] = await db.query("SELECT * FROM department");
    console.table(departments);
  } catch (error) {
    console.error("Error viewing departments:", error);
  }
};

// Function to view all roles
const viewAllRoles = async (db) => {
  try {
    const [roles] = await db.query("SELECT * FROM role");
    console.table(roles);
  } catch (error) {
    console.error("Error viewing roles:", error);
  }
};

// Function to add an employee
const addEmployee = async (db) => {
  try {
    const roles = await db.query("SELECT * FROM role");
    const managers = await db.query("SELECT * FROM employee");

    const employeeData = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the employee's first name:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the employee's last name:",
      },
      {
        type: "list",
        name: "role_id",
        message: "Select the employee's role:",
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
      {
        type: "list",
        name: "manager_id",
        message: "Select the employee's manager:",
        choices: managers.map((manager) => ({
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id,
        })),
      },
    ]);

    await db.query("INSERT INTO employee SET ?", employeeData);

    console.log("Employee added successfully!");
  } catch (error) {
    console.error("Error adding employee:", error);
  }
};

// Function to update an employee's role
const updateEmployeeRole = async (db) => {
  try {
    const employees = await db.query("SELECT * FROM employee");
    const roles = await db.query("SELECT * FROM role");

    const updateData = await inquirer.prompt([
      {
        type: "list",
        name: "employee_id",
        message: "Select the employee to update:",
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
      {
        type: "list",
        name: "role_id",
        message: "Select the employee's new role:",
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
    ]);

    await db.query("UPDATE employee SET role_id = ? WHERE id = ?", [
      updateData.role_id,
      updateData.employee_id,
    ]);

    console.log("Employee role updated successfully!");
  } catch (error) {
    console.error("Error updating employee role:", error);
  }
};

// Function to add a role
const addRole = async (db) => {
  try {
    const departments = await db.query("SELECT * FROM department");

    const roleData = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the new role's title:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the new role's salary:",
      },
      {
        type: "list",
        name: "department_id",
        message: "Select the department for the new role:",
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id,
        })),
      },
    ]);

    await db.query("INSERT INTO role SET ?", roleData);

    console.log("Role added successfully!");
  } catch (error) {
    console.error("Error adding role:", error);
  }
};

// Function to add a department
const addDepartment = async (db) => {
  try {
    const departmentData = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the new department's name:",
      },
    ]);

    await db.query("INSERT INTO department SET ?", departmentData);

    console.log("Department added successfully!");
  } catch (error) {
    console.error("Error adding department:", error);
  }
};

module.exports = {
  viewAllEmployees,
  viewAllDepartments,
  viewAllRoles,
  addEmployee,
  updateEmployeeRole,
  addRole,
  addDepartment,
};
