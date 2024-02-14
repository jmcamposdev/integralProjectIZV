# Work inter-modules

<p align="center">
  Here will be a gif of the finish project
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
<table>
  <tr>
    <td align="center">
      <img width="441" height="1">
      <p><strong>FRONTEND</strong></p>
    </td>
    <td align="center">
      <img width="441" height="1">
      <p><strong>BACKEND</strong></p>
    </td>
    <td align="center">
      <img width="441" height="1">
      <p><strong>TOOLS</strong></p>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img width="50" src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML" title="HTML"/>
      <img width="50" src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" title="CSS"/>
      <img width="50" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/>
      <img width="50" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"/>
      <img width="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/>
      <img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/62091613/b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35" alt="Vite" title="Vite"/>
      <img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/ecd443af-ebba-4af8-a46e-1bf64d863b5b" alt="Babel" title="Babel"/>
    </td>
    <td align="center">
      <img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>
      <img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/>
      <img width="50" src="https://user-images.githubusercontent.com/25181517/183896128-ec99105a-ec1a-4d85-b08b-1aa1620b2046.png" alt="MySQL" title="MySQL"/>
    </td>
    <td align="center">
      <img width="50" src="https://user-images.githubusercontent.com/25181517/192107858-fe19f043-c502-4009-8c47-476fc89718ad.png" alt="REST" title="REST"/>
      <img width="50" src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" alt="Git" title="Git"/>
      <img width="50" src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png" alt="GitHub" title="GitHub"/>
      <img width="50" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/>
      <img width="50" src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png" alt="Postman" title="Postman"/>
      <img width="50" src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker" title="Docker"/>
    </td>
  </tr>
</table>

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
