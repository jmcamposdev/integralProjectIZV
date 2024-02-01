# Work inter·modules v2

![Project Diagram](insert_your_diagram_path_here.svg)

## Description
The "Work inter·modules v2" project is an application developed for the assignment of lessons to teachers in the Department of Informatics and Communications at IES Zaidín-Vergeles. The application uses an architecture based on React for the frontend, Node.js with Express for the backend, and MySQL as the database.

## Project Structure

```bash
Work-intermodules-v2/
│
├── client/
│ ├── public/
│ │ └── ... (React public files)
│ ├── src/
│ │ ├── components/
│ │ │ └── ... (React components)
│ │ ├── views/
│ │ │ └── ... (React views)
│ │ ├── App.js
│ │ └── index.js
│ │
│ ├── .gitignore
│ ├── package.json
│ └── README.md
│
├── server/
│ ├── controllers/
│ │ └── ... (Node.js controllers)
│ ├── models/
│ │ └── ... (Database models)
│ ├── routes/
│ │ └── ... (Express routes)
│ ├── index.js
│ │
│ ├── .gitignore
│ ├── package.json
│ └── README.md
│
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Usage Instructions

### Prerequisites
1. Node.js and npm installed
2. MySQL installed and configured

### Steps to Start the Application
1. Clone the repository: `git clone https://github.com/your_username/Work-intermodules-v2.git`
2. Install dependencies in both `client` and `server` folders: `npm install`
3. Start the development server for the frontend: `npm start` in the `client` folder
4. Start the Node.js server for the backend: `npm start` in the `server` folder

## Project Diagram
Insert the project diagram image here.

## Key Features
- Management of five tables: Professor, Formation, Module, Group, Lesson.
- Administrators can perform any operation on the tables.
- Registered users can view data without making modifications.
- Unregistered users can view the structure of groups in the current school year.

## Lesson Generation
1. Enter data into the Professor, Formation, and Module tables.
2. Register data in the Group table.
3. Create lessons for the school year, leaving the professor_id field blank (null).

## Important Considerations
1. Multiple lessons can be created for a module, assigned to different professors.
2. Create lessons to ensure no hours are left untaught in any module.

## Interactive Lesson Assignment Web Page
- Administrators can filter and assign professors to lessons.
- Authenticated users can check the progress of lesson assignments.

## License
This project is under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors
Your Name - [Your GitHub Profile](https://github.com/your_username)

## Acknowledgments
We appreciate the collaboration of IES Zaidín-Vergeles in this project.
