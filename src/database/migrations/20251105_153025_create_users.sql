-- Migration: create_users
-- Created at: 2025-11-05T18:30:25.484Z

CREATE TABLE IF NOT EXISTS roles(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME,
    deleted_at JSON)
Engine=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO roles (name) VALUES 
    ('Admin'),
    ('Proprietário'),
    ('Operacional'),
    ('Financeiro');

CREATE TABLE IF NOT EXISTS states (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    uf CHAR(2) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME,
    deleted_at JSON) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO states (name, uf) VALUES
('Acre', 'AC'), ('Alagoas', 'AL'), ('Amazonas', 'AM'), ('Amapá', 'AP'), ('Bahia', 'BA'), ('Ceará', 'CE'), ('Distrito Federal', 'DF'), ('Espírito Santo', 'ES'),
('Goiás', 'GO'), ('Maranhão', 'MA'), ('Minas Gerais', 'MG'), ('Mato Grosso do Sul', 'MS'), ('Mato Grosso', 'MT'), ('Pará', 'PA'), ('Paraíba', 'PB'), ('Pernambuco', 'PE'),
('Piauí', 'PI'), ('Paraná', 'PR'), ('Rio de Janeiro', 'RJ'), ('Rio Grande do Norte', 'RN'), ('Rondônia', 'RO'), ('Roraima', 'RR'), ('Rio Grande do Sul', 'RS'),
('Santa Catarina', 'SC'), ('Sergipe', 'SE'), ('São Paulo', 'SP'), ('Tocantins', 'TO');

CREATE TABLE IF NOT EXISTS organizations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    parentId INT,
    name VARCHAR(255) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    address VARCHAR(50) NOT NULL,
    number INT(11) NOT NULL,
    neighborhood VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL,
    complement VARCHAR(30),
    stateId INT NOT NULL,
    zipcode char(8) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME,
    deleted_at JSON,
    UNIQUE KEY organizations_cnpj_key (cnpj),
    FOREIGN KEY (stateId) REFERENCES states(id) ON DELETE RESTRICT) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    roleId INT NOT NULL,
    orgId INT NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone CHAR(11) NOT NULL,
    name VARCHAR(120) NOT NULL,
    preferences JSON,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME,
    deleted_at DATETIME,
    UNIQUE KEY users_email_key (email),
    FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE RESTRICT,
    FOREIGN KEY (orgId) REFERENCES organizations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;