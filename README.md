# Work inter-modules

<p align="center">
https://github.com/jmcamposdev/integralProjectIZV/assets/108521775/590526cc-5b6a-40e2-9aa6-101ee9f41be3
</p>


## Project Link 🌐
Access to the website here -> [Integral Project IZV](https://zawee.jmcampos.dev)

## Table of Contents
* [General Info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Project Structure](#project-structure)
* [RESTful API](#restful-api)
* [Key Features](#key-features)

## General Info
The Inter-module Project was carried out during the last 2 months of class before the FCT.

The project consists of the **Lesson Assignment to Professors of the Department**. It will also implement roles and we will have 3 types
* Administrator: Can perform any operation on the tables.
* Registered User: Can consult all the data without making modifications.
* Unregistered User: Can consult the group structure of the current course.

### Entity Relationship Diagram
![Integral Project IZV Diagram](https://github.com/jmcamposdev/integralProjectIZV/assets/108521775/d994cb94-a544-4aef-823d-b2aea052a847)

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
    </td>
  </tr>
</table>

## Setup

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
$ npm run dev // On the Client and Server
```

## Project Structure

```bash
integralProjectIZV/
│
├── client/
│ ├── public/
│ │ └── ... (React public files)
│ ├── src/
│ │ ├── components/
│ │ │ └── ... (React components)
│ │ ├── pages/
│ │ │ └── ... (React pages)
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

## RESTful API
Welcome to the Integral Project RESTful API. This API provides access to the management of all available resources.

### Base URL 
The API can be accessed through the following base URL:
[https://api.zawee.jmcampos.dev](https://api.zawee.jmcampos.dev)

### Authentication

To access certain resources, authentication is required. Be sure to include the `x-access-token` header with a valid token in the relevant requests.

### Endpoints

#### Auth 
- `POST /auth/signin`: Sign in a user. Returns a `JSON` object with the user's data and a token. Requires a `JSON` object with the user's data.

#### User
- `GET /users`: Get all users. Returns a `JSON` array of all users. `x-access-token` header required.
- `GET /users/:id`: Get a user by ID. Returns a `JSON` object with the user's data. `x-access-token` header required.
- `POST /users`: Create a new user. Returns a `JSON` object with the new user's data. Requires a `JSON` object with the user's data. `x-access-token` header required.
- `PUT /users/:senecaUser`: Update a user by ID. Returns a `JSON` object with the updated user's data. Requires a `JSON` object with the user's data. `x-access-token` header required.
- `DELETE /users/:id`: Delete a user by ID. Returns a `JSON` object with the deleted user's data. `x-access-token` header required.


#### Professor
- `GET /professors`: Get all professors. Returns a `JSON` array of all professors.
- `GET /professors/:id`: Get a professor by ID. Returns a `JSON` object with the professor's data.
- `GET /professors/:id/lessons`: Get all lessons assigned to a professor by ID. Returns a `JSON` array of all lessons. 
- `POST /professors`: Create a new professor. Returns a `JSON` object with the new professor's data. Requires a `JSON` object with the professor's data. `x-access-token` header required.
- `PUT /professors/:id`: Update a professor by ID. Returns a `JSON` object with the updated professor's data. Requires a `JSON` object with the professor's data. `x-access-token` header required.
- `DELETE /professors/:id`: Delete a professor by ID. Returns a `JSON` object with the deleted professor's data. `x-access-token` header required.

#### Formation
- `GET /formations`: Get all formations. Returns a `JSON` array of all formations.
- `GET /formations/:id`: Get a formation by ID. Returns a `JSON` object with the formation's data.
- `GET /formations/:id/groups`: Get all groups of a formation by ID. Returns a `JSON` array of all groups.
- `GET /formations/:id/modules`: Get all modules of a formation by ID. Returns a `JSON` array of all modules.
- `POST /formations`: Create a new formation. Returns a `JSON` object with the new formation's data. Requires a `JSON` object with the formation's data. `x-access-token` header required.
- `PUT /formations/:id`: Update a formation by ID. Returns a `JSON` object with the updated formation's data. Requires a `JSON` object with the formation's data. `x-access-token` header required.
- `DELETE /formations/:id`: Delete a formation by ID. Returns a `JSON` object with the deleted formation's data. `x-access-token` header required.

#### Module
- `GET /modules`: Get all modules. Returns a `JSON` array of all modules.
- `GET /modules/:id`: Get a module by ID. Returns a `JSON` object with the module's data.
- `GET /modules/:id/lessons`: Get all lessons of a module by ID.  Returns a `JSON` array of all lessons.
- `POST /modules`: Create a new module. Returns a `JSON` object with the new module's data. Requires a `JSON` object with the module's data. `x-access-token` header required.
- `PUT /modules/:id`: Update a module by ID. Returns a `JSON` object with the updated module's data. Requires a `JSON` object with the module's data. `x-access-token` header required.
- `DELETE /modules/:id`: Delete a module by ID. Returns a `JSON` object with the deleted module's data. `x-access-token` header required.

#### Group
- `GET /groups`: Get all groups. Returns a `JSON` array of all groups.
- `GET /groups/:id`: Get a group by ID. Returns a `JSON` object with the group's data.
- `GET /groups/:id/lessons`: Get all lessons of a group by ID.  Returns a `JSON` array of all lessons.
- `POST /groups`: Create a new group. Returns a `JSON` object with the new group's data. Requires a `JSON` object with the group's data. `x-access-token` header required.
- `PUT /groups/:id`: Update a group by ID. Returns a `JSON` object with the updated group's data. Requires a `JSON` object with the group's data. `x-access-token` header required.
- `DELETE /groups/:id`: Delete a group by ID. Returns a `JSON` object with the deleted group's data. `x-access-token` header required.

#### Lesson
- `GET /lessons`: Get all lessons. Returns a `JSON` array of all lessons.
- `GET /lessons/:id`: Get a lesson by ID. Returns a `JSON` object with the lesson's data.
- `GET /lessons-current-year`: Get all lessons of the current year e.g. 2024/2025
- `POST /lessons`: Create a new lesson. Returns a `JSON` object with the new lesson's data. Requires a `JSON` object with the lesson's data. `x-access-token` header required.
- `POST /lessons-generate`: Automatically generates as many lessons as possible with the available groups and modules by assigning the teacher to null.
- `PUT /lessons/:id`: Update a lesson by ID. Returns a `JSON` object with the updated lesson's data. Requires a `JSON` object with the lesson's data. `x-access-token` header required.
- `DELETE /lessons/:id`: Delete a lesson by ID. Returns a `JSON` object with the deleted lesson's data. `x-access-token` header required.

### Example
```bash
# Request
GET /professors/

# Response
[
  {
    "id": 1,
    "senecaUser": "josemariacampos",
    "name": "José María",
    "firstSurname": "Campos",
    "lastSurname": "Trujillo",
    "specialty": "FP",
  },
  {
    "id": 2,
    "senecaUser": "carloshernandez",
    "name": "Carlos",
    "firstSurname": "Hernández",
    "lastSurname": "Palma",
    "specialty": "Secundary",
  },
]

# Request
POST /professors/
Headers: x-access-token: <token>
{
  "seneceUser": "davidluque",
  "name": "David",
  "firstSurname": "Luque",
  "lastSurname": "Vegas",
  "specialty": "FP"
}

# Response - 201 Created
{
  "id": 3,
  "senecaUser": "davidluque",
  "name": "David",
  "firstSurname": "Luque",
  "lastSurname": "Vegas",
  "specialty": "FP"
}
```

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
Campos Trujillo, José María - [jmcamposdev](https://github.com/jmcamposdev)

Carlos Hernandez Palma - [carloshpdev](https://github.com/carloshpdev)

Luque Vegas, David - [Daviiid999](https://github.com/Daviiid999)

Capdevila Rodríguez, Víctor - [vilacprd](https://github.com/vilacprd)

Rodríguez Jareño, Manuel - [Manabimassu](https://github.com/Manabimassu)

## Acknowledgments
We appreciate the collaboration of IES Zaidín-Vergeles in this project.
