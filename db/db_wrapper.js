let connection = require('./config');

class db_wrapper {
    constructor(conn) {
        this.connection = conn;
    }

    getAllDepartments() {
        return this.connection.promise().query(
            'SELECT department.id, department.name FROM department;'
        );
    }
    getAllRoles() {
        return this.connection.promise().query(
            'SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id;'
        );
    }
    getAllEmployees() {
        return this.connection.promise().query(
            'SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name," ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;'
        );
    }
    addDepartment(name) {
        return this.connection.promise().query(
            'INSERT INTO department SET ?', name
        );
    }
    addRole(name) {
        return this.connection.promise().query(
            'INSERT INTO role SET ?', name
        );
    }
    addEmployee(name) {
        return this.connection.promise().query(
            'INSERT INTO employee SET ?', name
        );
    }
    updateEmployeeRole(employee_id, new_role_id) {
        const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
        const values = [new_role_id, employee_id];

        return this.connection.promise().query(sql, values);
    }
}

module.exports = new db_wrapper(connection);

//got a bit lost and confused during the update employee role , used some help from doing research online