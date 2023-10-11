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