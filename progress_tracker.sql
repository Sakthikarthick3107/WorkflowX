CREATE TABLE Todo (
    taskid SERIAL PRIMARY KEY,
    taskname VARCHAR(100) NOT NULL,
    description VARCHAR(200) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Todo' CHECK (status IN ('Todo', 'Progress', 'Completed', 'Withdrawn'))
);

drop table Todo;

SET timezone = 'UTC';
RESET timezone;

SELECT * FROM Todo;

truncate table Todo;

INSERT INTO Todo (taskname, description , status) VALUES ('Just another one', 'This is an example task description.' , 'Todo');

INSERT INTO Todo (taskname, description, status) 
VALUES 
    ('Example Task 2', 'Description for Example Task 2.', 'Progress'),
    ('Example Task 3', 'Description for Example Task 3.', 'Completed'),
    ('Example Task 4', 'Description for Example Task 4.', 'Todo'),
    ('Example Task 5', 'Description for Example Task 5.', 'Progress'),
    ('Example Task 6', 'Description for Example Task 6.', 'Completed'),
    ('Example Task 7', 'Description for Example Task 7.', 'Todo'),
    ('Example Task 8', 'Description for Example Task 8.', 'Progress'),
    ('Example Task 9', 'Description for Example Task 9.', 'Completed'),
    ('Example Task 10', 'Description for Example Task 10.', 'Todo');
INSERT INTO Todo (taskname, description, status) VALUES ('Withhdrawn Task', 'This is an example withdrawn task.', 'Withdrawn');
