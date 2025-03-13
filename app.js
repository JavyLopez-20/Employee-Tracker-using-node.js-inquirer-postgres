const inquirer = require('inquirer');
const db = require('./db/data.js');
//AI assisted me with this async function
async function deleteDepartment() {
    const departments = await db.getAllDepartments();
    const choices = departments.map(dept => ({ name: dept.name, value: dept.id }));
    const { departmentId } = await inquirer.prompt({
      type: 'list',
      name: 'departmentId',
      message: 'Select a department to delete:',
      choices
    });
    await db.deleteDepartment(departmentId);
    console.log('Department deleted successfully.');
  }
  
  async function deleteRole() {
    const roles = await db.getAllRoles();
    const choices = roles.map(role => ({ name: role.title, value: role.id }));
    const { roleId } = await inquirer.prompt({
      type: 'list',
      name: 'roleId',
      message: 'Select a role to delete:',
      choices
    });
    await db.deleteRole(roleId);
    console.log('Role deleted successfully.');
  }
  //AI assisted me with this async function
  async function deleteEmployee() {
    const employees = await db.getAllEmployees();
    const choices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
    const { employeeId } = await inquirer.prompt({
      type: 'list',
      name: 'employeeId',
      message: 'Select an employee to delete:',
      choices
    });
    await db.deleteEmployee(employeeId);
    console.log('Employee deleted successfully.');
  }

async function viewEmployeesByDepartment() {
    const departments = await db.getAllDepartments();
    const departmentChoices = departments.map(dept => ({
      name: dept.name,
      value: dept.id
    }));
  
    const { departmentId } = await inquirer.prompt({
      type: 'list',
      name: 'departmentId',
      message: 'Select a department to view its employees:',
      choices: departmentChoices
    });
  
    const employees = await db.getEmployeesByDepartment(departmentId);
    console.table(employees);
  }

async function viewEmployeesByManager() {
    const managers = await db.getAllEmployees(); // Managers are employees too
    const managerChoices = managers.map(mgr => ({
      name: `${mgr.first_name} ${mgr.last_name}`,
      value: mgr.id
    }));
  
    const { managerId } = await inquirer.prompt({
      type: 'list',
      name: 'managerId',
      message: 'Select a manager to view their employees:',
      choices: managerChoices
    });
  
    const employees = await db.getEmployeesByManager(managerId);
    console.table(employees);
  }

async function updateEmployeeManager () {
    const employees = await db.getAllEmployees();
    const employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));
    const { employeeId, managerId } = await inquirer.prompt([
        {
        type: 'list',
        name: 'employeeId',
        message: 'Select an employee to update:',
        choices: employeeChoices,
        },
        {
            type: "list",
            name: "managerId",
            message: "Select the new manager:",
            choices: employeeChoices.concat({ name: "None", value: null }),
        }
    ]);
    await db.updateEmployeeManager(employeeId, managerId);
    console.log(`Updated employee's manager successfully.`);
}

async function mainMenu() {
    const { choice } = await inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'Update employee manager',
        'View employees by manager',
        'View employees by department',
        'Delete department',
        'Delete role',
        'Delete employee',
        'View department budget',
        'Exit'
      ]
    });
  
    switch (choice) {
      case 'Update employee manager': await updateEmployeeManager(); break;
      case 'View employees by manager': await viewEmployeesByManager(); break;
      case 'View employees by department': await viewEmployeesByDepartment(); break;
      case 'Delete department': await deleteDepartment(); break;
      case 'Delete role': await deleteRole(); break;
      case 'Delete employee': await deleteEmployee(); break;
      case 'View department budget': await viewDepartmentBudget(); break;
      case 'Exit': console.log('Goodbye!'); process.exit(0);
    }
    mainMenu(); // Loop back to menu
  }
  
  mainMenu();