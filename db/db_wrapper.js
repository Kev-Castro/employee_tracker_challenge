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
}

module.exports = new db_wrapper(connection);