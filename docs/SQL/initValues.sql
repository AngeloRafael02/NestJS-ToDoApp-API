INSERT INTO users(
    "firstName", 
    "middleName",
    "lastName", 
    "email",
    "passwdHash"
) VALUES (
    'Angelo Rafael',
    'Fruto',
    'Recio',
    'recioangelorafael@gmail.com',
    '1'
);

INSERT INTO conditions(stat)
VALUES
    ('Unfinished'),
    ('In Progress'),
    ('Finished'),
    ('Cancelled'),
    ('Delayed'),
    ('Continuous'),
    ('On Hold'),
    ('Speculation');

INSERT INTO categories(cat)
VALUES
    ('Personal'),
    ('Knowledge'),
    ('Career'),
    ('Automotive'),
    ('IT'),
    ('Government'),
    ('Finance'),
    ('Estate'),
    ('Fitness'),
    ('Health'),
    ('Other')
;

INSERT INTO threats("level") VALUES
('Low'),
('Medium'),
('High'),
('Alarming'),
('Inevitable');