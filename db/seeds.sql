USE tracker_db;

INSERT INTO department (name)
VALUES ("Sales"),
       ("HR"),
       ("Corporate"),
       ("Tech"),
       ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Person", 50000, 1),
        ("Sales VP", 100000, 1),
       ("VP of HR", 150000, 2),
       ("HR Associate", 75000, 2),
       ("CEO", 500000, 3),
       ("SVP of Engineering", 180000, 4),
       ("Tech Enginner", 90000, 4),
       ("VP of Accounting", 225000, 5),
       ("Accountant", 75000, 5);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rosie", "Castro", 5, NULL),
        ("Leo", "S", 2, 1),
       ("Jonny", "S", 3, 1),
       ("Sebastian", "S", 4, 3),
       ("John", "Doe", 1, 2),
       ("Kevin", "Castro", 6, 1),
       ("Jorge", "C", 7, 6),
       ("Pedro", "C", 8, 1),
       ("Hilda", "C", 9, 8);