# Work inter-modules

<p align="center">
  <img src="https://github.com/jmcamposdev/integralProjectIZV/assets/108521775/78863401-cce5-4a71-84b8-2c246584cd7e" >
</p>

## Table of Contents
* [General Info](#general-info)
* [Technologies](#technologies)

## General Info
The Inter-module Project was carried out during the last 2 months of class before the FCT.

The project consists of the **Lesson Assignment to Professors of the Department**. It will also implement roles and we will have 3 types
* Administrator: Can perform any operation on the tables.
* Registered User: Can consult all the data without making modifications.
* Unregistered User: Can consult the group structure of the current course.

### Entity Relationship Diagram
![Integral Project IZV Diagram](https://github.com/jmcamposdev/integralProjectIZV/assets/108521775/ed6a807e-af6e-4958-8a23-ecc9de39678a)

## Technologies

Project is created with:
<div>

  <!-- React -->
  <div style="text-align: center;">
    <img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML5" width="50" />
    <br />
    HTML5
  </div>

  <!-- Node.js -->
  <div style="text-align: center;">
    <img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS3" width="50" />
    <br />
    CSS3
  </div>

  <!-- HTML5 -->
  <div style="text-align: center;">
    <img src="path/to/html5-logo.png" alt="HTML5 Logo" width="50" />
    <br />
    HTML5
  </div>

  <!-- CSS3 -->
  <div style="text-align: center;">
    <img src="path/to/css3-logo.png" alt="CSS3 Logo" width="50" />
    <br />
    CSS3
  </div>

  <!-- Add more technologies as needed -->

</div>


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
To clone and run this applicaion, you'll need [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/download) (which comes with [npm](https://www.npmjs.com/)) installed on you computer.

Next you'll need to create the ```eduAssignment``` database created

```
# Clone this repository
$ git clone https://github.com/jmcamposdev/integralProjectIZV.git

# Go into the repository
$ cd integralProjectIZV

# Install dependencies on the Server and Client
$ cd client && npm i
$ cd ../server && npm i

# Run the app
$ npm start
```

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
