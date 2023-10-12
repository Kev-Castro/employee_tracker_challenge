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
}

module.exports = new db_wrapper(connection);