let inquirer = require('inquirer');

let db_wrapper = require('./db/db_wrapper');
const { response } = require('express');

let questions = [
    {
        type: 'list',
        name: 'user_choice',
        message: 'What would you like to do?',
        choices: [
            {
                name: 'View all departments',
                value: 'VIEW_ALL_DEPARTMENTS'
            },
            {
                name: 'Add department',
                value: 'ADD_DEPARTMENT'
            },
            {
                name: 'View all roles',
                value: 'VIEW_ALL_ROLES'
            },
            {
                name: 'Add role',
                value: 'ADD_ROLE'
            },
            {
                name: 'View all employees',
                value: 'VIEW_ALL_EMPLOYEES'
            },
            {
                name: 'Add employee',
                value: 'ADD_EMPLOYEE'
            },
            {
                name: 'Exit the program',
                value: 'EXIT'
            }
        ]
    }
]

function mainMenu() {
    inquirer.prompt(questions)
        .then(response => {
            let choice = response.user_choice;

            switch (choice) {
                case 'VIEW_ALL_DEPARTMENTS':
                    renderDepartments();
                    break;
                case 'VIEW_ALL_ROLES':
                    renderRoles();
                    break;
                case 'VIEW_ALL_EMPLOYEES':
                    renderEmployees();
                    break;
                case 'ADD_EMPLOYEE':
                    addEmployee();
                    break;
                case 'ADD_DEPARTMENT':
                    addDepartment();
                    break;
                case 'ADD_ROLE':
                    addRole();
                    break;
                default:
                    process.exit();
            }
        })
}

function renderDepartments() {
    db_wrapper.getAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log('\n');
            console.table(departments);
        })
        .then(() => {
            mainMenu();
        })
}
function renderRoles() {
    db_wrapper.getAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log('\n');
            console.table(roles);
        })
        .then(() => {
            mainMenu();
        })
}
function renderEmployees() {
    db_wrapper.getAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => {
            mainMenu();
        })
}

addDepartmentQuestion = [
    {
        name: 'name',
        message: 'Give your department a name.'
    }
]

function addDepartment() {
    inquirer.prompt(addDepartmentQuestion)
        .then(answer => {
            let name = answer;
            db_wrapper.addDepartment(name)
                .then(() => {
                    console.log('department created successfully')
                })
                .then(() => {
                    mainMenu();
                })
        })
}


function addRole() {
    let departmentNames;
    db_wrapper.getAllDepartments()
        .then(([rows]) => {
            departmentNames = rows;
            let departmentChoices = departmentNames.map(({ id, name }) => ({
                name: name,
                value: id
            }))
            let addRoleQuestion = [
                {
                    name: 'title',
                    message: 'Give your role a title.'
                },
                {
                    name: 'salary',
                    message: 'Add salary for this title.'
                },
                {
                    name: 'department_id',
                    type: 'list',
                    message: 'In what department does this role belong to?',
                    choices: departmentChoices
                },

            ];
            inquirer.prompt(addRoleQuestion)
                .then(role => {
                    db_wrapper.addRole(role)
                        .then(() => console.log('successfully added role!'))
                        .then(() => mainMenu())
                })
        })
}
function addEmployee() {
    let roleNames;
    let employeeNames;
    db_wrapper.getAllRoles()
        .then(([rows]) => {
            roleNames = rows;
            let roleChoices = roleNames.map(({ id, title }) => ({
                name: title,
                value: id
            }))
            db_wrapper.getAllEmployees()
                .then(([rows]) => {
                    employeeNames = rows;
                    let managerList = employeeNames.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    managerList.unshift({ name: 'None', value: null });
                    let addEmployeeQuestion = [
                        {
                            name: 'first_name',
                            message: 'What is their first name?'
                        },
                        {
                            name: 'last_name',
                            message: 'What is their last name?'
                        },
                        {
                            name: 'role_id',
                            type: 'list',
                            message: 'what role are they performing',
                            choices: roleChoices
                        },
                        {
                            name: 'manager_id',
                            type: 'list',
                            message: 'Who is their manager?',
                            choices: managerList
                        },

                    ];
                    inquirer.prompt(addEmployeeQuestion)
                        .then(employee => {
                            db_wrapper.addEmployee(employee)
                                .then(() => console.log('successfully added employee!'))
                                .then(() => mainMenu())
                        })
                });
        })
}

mainMenu();