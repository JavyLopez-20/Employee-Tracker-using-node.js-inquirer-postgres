const inquirer = require('inquirer');
const db = require('./db/data.js');

async function main() {
  await db.testConnection();

  let exit = false;
  while (!exit) {
    const { choice } = await inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    });

    switch (choice) {
      case 'View all departments':
        const departments = await db.getAllDepartments();
        console.table(departments);
        break;
      case 'View all roles':
        const roles = await db.getAllRoles();
        console.table(roles);
        break;
      case 'View all employees':
        const employees = await db.getAllEmployees();
        console.table(employees);
        break;
      case 'Add a department':
        console.log('Add department functionality to be implemented');
        break;
      case 'Add a role':
        console.log('Add role functionality to be implemented');
        break;
      case 'Add an employee':
        console.log('Add employee functionality to be implemented');
        break;
      case 'Update an employee role':
        console.log('Update employee role functionality to be implemented');
        break;
      case 'Exit':
        console.log('Goodbye!');
        exit = true;
        break;
    }
  }
}

main();