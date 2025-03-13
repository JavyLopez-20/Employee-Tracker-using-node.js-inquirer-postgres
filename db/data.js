const { Pool } = require('pg');
require('dotenv').config();

class Database {
  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
  }

  // Example method to test connection
  async testConnection() {
    try {
      const res = await this.pool.query('SELECT NOW()');
      console.log('Database connected successfully:', res.rows[0]);
    } catch (err) {
      console.error('Database connection error:', err.stack);
    }
  }

  // Placeholder methods (to be expanded later)
  async getAllDepartments() {
    const res = await this.pool.query('SELECT * FROM departments');
    return res.rows;
  }

  async getAllRoles() {
    const res = await this.pool.query('SELECT * FROM roles');
    return res.rows;
  }

  async getAllEmployees() {
    const res = await this.pool.query('SELECT * FROM employees');
    return res.rows;
  }
    async addDepartment(name) {
        const res = await this.pool.query('INSERT INTO departments (name) VALUES ($1)', [name]);
        return res.rows;
    }
    async addRole(title, salary, departmentId) {
        const res = await this.pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
        return res.rows;
    }
    async addEmployee(firstName, lastName, roleId, managerId) {
        const res = await this.pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
        return res.rows;
    }
    async updateEmployeeRole(employeeId, roleId) {
        const res = await this.pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
        return res.rows;
    }
}

module.exports = new Database();