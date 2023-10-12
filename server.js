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
                name: 'View all roles',
                value: 'VIEW_ALL_ROLES'
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
                case 'VIEW_ALL_roles':
                    renderRoles();
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

mainMenu();