/**
Must added to disconnect session to this database execempt this one.. 
Note: This script is ONLY for psql
**/

SELECT 'Database rebuild started...';
DROP DATABASE IF EXISTS temp;
CREATE DATABASE temp;

\c temp;

SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'course_db'
  AND pid <> pg_backend_pid();

/****/
DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

\c employeeTracker_db;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT REFERENCES departments(id)
);
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role_id INT REFERENCES roles(id),
    manager_id INT REFERENCES employees(id)
);
CREATE TABLE employees_roles (
    employee_id INT REFERENCES employees(id),
    role_id INT REFERENCES roles(id),
    PRIMARY KEY (employee_id, role_id)
);
CREATE TABLE employees_departments (
    employee_id INT REFERENCES employees(id),
    department_id INT REFERENCES departments(id),
    PRIMARY KEY (employee_id, department_id)
);
CREATE TABLE employees_managers (
    employee_id INT REFERENCES employees(id),
    manager_id INT REFERENCES employees(id),
    PRIMARY KEY (employee_id, manager_id)
);