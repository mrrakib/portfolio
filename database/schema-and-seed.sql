-- Portfolio Database Schema
-- MySQL 8.0+ with utf8mb4

CREATE DATABASE IF NOT EXISTS portfolio_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- Profile (single row)
CREATE TABLE profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(300),
    bio TEXT,
    avatar_url VARCHAR(500),
    tagline VARCHAR(500),
    location VARCHAR(200),
    email VARCHAR(200),
    phone VARCHAR(50),
    resume_url VARCHAR(500),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Experience
CREATE TABLE experience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(200) NOT NULL,
    position VARCHAR(200) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    company_url VARCHAR(500),
    company_logo_url VARCHAR(500),
    location VARCHAR(200),
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Skill Category
CREATE TABLE skill_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    icon VARCHAR(100),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Skill
CREATE TABLE skill (
    id INT AUTO_INCREMENT PRIMARY KEY,
    skill_category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    proficiency_level INT NOT NULL DEFAULT 0,
    icon VARCHAR(100),
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (skill_category_id) REFERENCES skill_category(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Project
CREATE TABLE project (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    short_description VARCHAR(500),
    description TEXT,
    image_url VARCHAR(500),
    live_url VARCHAR(500),
    github_url VARCHAR(500),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Project Technology
CREATE TABLE project_technology (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    technology_name VARCHAR(100) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Education
CREATE TABLE education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    institution VARCHAR(200) NOT NULL,
    degree VARCHAR(200) NOT NULL,
    field_of_study VARCHAR(200),
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    logo_url VARCHAR(500),
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Certification
CREATE TABLE certification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    issuing_organization VARCHAR(200) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    credential_id VARCHAR(200),
    credential_url VARCHAR(500),
    logo_url VARCHAR(500),
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Social Link
CREATE TABLE social_link (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    icon VARCHAR(100),
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Contact Message
CREATE TABLE contact_message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    subject VARCHAR(300),
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- SEED DATA
-- =============================================

INSERT INTO profile (full_name, title, subtitle, bio, avatar_url, tagline, location, email, phone, resume_url) VALUES
('Rakibul Islam', 'Senior Full-Stack Developer', '.NET | Angular | Cloud Architecture',
 'Passionate full-stack developer with extensive experience building scalable web applications using .NET and Angular. Focused on clean architecture, performance optimization, and delivering exceptional user experiences.',
 '/assets/images/avatar.jpg',
 'Building the future, one line of code at a time.',
 'Bangladesh',
 'rakibul@example.com',
 '+880-1700-000000',
 '/assets/resume/resume.pdf');

INSERT INTO skill_category (name, sort_order, icon) VALUES
('Backend', 1, 'server'),
('Frontend', 2, 'layout'),
('Database', 3, 'database'),
('DevOps & Cloud', 4, 'cloud'),
('Tools & Others', 5, 'wrench');

INSERT INTO skill (skill_category_id, name, proficiency_level, icon, sort_order) VALUES
(1, 'C# / .NET', 95, 'dotnet', 1),
(1, 'ASP.NET Core Web API', 93, 'dotnet', 2),
(1, 'Entity Framework Core', 90, 'dotnet', 3),
(1, 'Python', 70, 'python', 4),
(1, 'Node.js', 65, 'nodejs', 5),
(2, 'Angular', 90, 'angular', 1),
(2, 'TypeScript', 88, 'typescript', 2),
(2, 'HTML5 / CSS3', 92, 'html5', 3),
(2, 'JavaScript', 88, 'javascript', 4),
(2, 'Tailwind CSS', 80, 'tailwindcss', 5),
(3, 'MySQL', 88, 'mysql', 1),
(3, 'SQL Server', 85, 'sqlserver', 2),
(3, 'PostgreSQL', 75, 'postgresql', 3),
(3, 'Redis', 70, 'redis', 4),
(4, 'Docker', 78, 'docker', 1),
(4, 'Azure', 72, 'azure', 2),
(4, 'Git / GitHub', 90, 'git', 3),
(4, 'CI/CD', 75, 'cicd', 4),
(5, 'REST API Design', 92, 'api', 1),
(5, 'Clean Architecture', 88, 'architecture', 2),
(5, 'Unit Testing', 82, 'testing', 3),
(5, 'Agile / Scrum', 85, 'agile', 4);

INSERT INTO experience (company_name, position, description, start_date, end_date, is_current, company_url, location, sort_order) VALUES
('Tech Solutions Ltd', 'Senior Full-Stack Developer', 'Led development of enterprise web applications using .NET 8 and Angular. Architected microservices, mentored junior developers, and improved system performance by 40%.', '2022-01-01', NULL, TRUE, 'https://example.com', 'Dhaka, Bangladesh', 1),
('Digital Innovations Inc', 'Full-Stack Developer', 'Built and maintained multiple client-facing web applications. Implemented CI/CD pipelines, integrated third-party APIs, and delivered projects on time.', '2019-06-01', '2021-12-31', FALSE, 'https://example.com', 'Dhaka, Bangladesh', 2),
('StartUp Hub', 'Junior Developer', 'Developed RESTful APIs and responsive front-end interfaces. Participated in code reviews and adopted agile methodologies.', '2017-08-01', '2019-05-31', FALSE, 'https://example.com', 'Dhaka, Bangladesh', 3);

INSERT INTO project (title, slug, short_description, description, image_url, live_url, github_url, is_featured, sort_order) VALUES
('E-Commerce Platform', 'ecommerce-platform', 'Full-featured online shopping platform with payment integration', 'A comprehensive e-commerce solution built with .NET 8 Web API and Angular 18. Features include product catalog, shopping cart, Stripe payment integration, order management, and admin dashboard. Implements clean architecture with CQRS pattern.', '/assets/images/projects/ecommerce.jpg', 'https://example.com', 'https://github.com/user/ecommerce', TRUE, 1),
('Task Management App', 'task-management-app', 'Real-time collaborative task management with SignalR', 'A real-time task management application using .NET SignalR for live updates. Features drag-and-drop Kanban boards, team collaboration, notifications, and activity tracking.', '/assets/images/projects/taskmanager.jpg', 'https://example.com', 'https://github.com/user/taskmanager', TRUE, 2),
('Blog CMS', 'blog-cms', 'Headless CMS with markdown support and SEO optimization', 'A headless blog CMS built with .NET 8 and Angular. Supports markdown editing, image optimization, SEO meta management, and RSS feed generation.', '/assets/images/projects/blogcms.jpg', NULL, 'https://github.com/user/blogcms', FALSE, 3);

INSERT INTO project_technology (project_id, technology_name, sort_order) VALUES
(1, '.NET 8', 1), (1, 'Angular 18', 2), (1, 'MySQL', 3), (1, 'Stripe', 4), (1, 'Docker', 5),
(2, '.NET 8', 1), (2, 'Angular 18', 2), (2, 'SignalR', 3), (2, 'SQL Server', 4), (2, 'Redis', 5),
(3, '.NET 8', 1), (3, 'Angular 18', 2), (3, 'PostgreSQL', 3), (3, 'Markdown', 4);

INSERT INTO education (institution, degree, field_of_study, start_date, end_date, description, sort_order) VALUES
('University of Dhaka', 'Bachelor of Science', 'Computer Science & Engineering', '2013-01-01', '2017-06-30', 'Focused on software engineering, algorithms, and database systems. Graduated with honors.', 1);

INSERT INTO certification (name, issuing_organization, issue_date, credential_id, credential_url, sort_order) VALUES
('Microsoft Certified: Azure Developer Associate', 'Microsoft', '2023-06-15', 'AZ-204-2023', 'https://learn.microsoft.com/certifications/', 1),
('Angular Developer Certification', 'Google', '2023-01-10', 'ANG-2023-001', 'https://angular.io/certification', 2);

INSERT INTO social_link (platform, url, icon, sort_order, is_active) VALUES
('GitHub', 'https://github.com/your-username', 'github', 1, TRUE),
('LinkedIn', 'https://linkedin.com/in/your-username', 'linkedin', 2, TRUE),
('Twitter', 'https://twitter.com/your-username', 'twitter', 3, TRUE),
('Email', 'mailto:rakibul@example.com', 'mail', 4, TRUE);
