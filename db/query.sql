SELECT 
    e.id,
    e.first_name,
    e.last_name,
    r.title AS roles,
    d.name AS department,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN roles r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;