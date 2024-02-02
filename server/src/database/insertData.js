import { Formation } from '../models/Formation.js'
import { Group } from '../models/Group.js'
import { Module } from '../models/Module.js'
import { Professor } from '../models/Professor.js'
// Create Formations
export const createFormationsData = () => {
  Formation.create({ denomination: 'Desarrollo de Aplicaciones Web', acronym: 'DAW' })
  Formation.create({ denomination: 'Curso Especialización de Ciberseguridad', acronym: 'CIBER' })
  Formation.create({ denomination: 'Educación Secundaria Obligatoria', acronym: 'ESO' })
  Formation.create({ denomination: 'Bachillerato', acronym: 'BACH' })
}

// Create Groups
export const createGroupsData = () => {
  Group.create({ schoolYear: '2021-2022', course: 1, denomination: '1º DAW', isMorning: true, formationId: 1 })
  Group.create({ schoolYear: '2021-2022', course: 2, denomination: '2º DAW', isMorning: true, formationId: 1 })
  Group.create({ schoolYear: '2021-2022', course: 1, denomination: '1º CIBER', isMorning: true, formationId: 2 })
  Group.create({ schoolYear: '2021-2022', course: 2, denomination: '2º CIBER', isMorning: true, formationId: 2 })
  Group.create({ schoolYear: '2021-2022', course: 1, denomination: '1º ESO', isMorning: true, formationId: 3 })
  Group.create({ schoolYear: '2021-2022', course: 2, denomination: '2º ESO', isMorning: true, formationId: 3 })
  Group.create({ schoolYear: '2021-2022', course: 3, denomination: '3º ESO', isMorning: true, formationId: 3 })
  Group.create({ schoolYear: '2021-2022', course: 4, denomination: '4º ESO', isMorning: true, formationId: 3 })
  Group.create({ schoolYear: '2021-2022', course: 1, denomination: '1º BACH', isMorning: true, formationId: 4 })
  Group.create({ schoolYear: '2021-2022', course: 2, denomination: '2º BACH', isMorning: true, formationId: 4 })
}

// Create Modules
export const createModulesData = () => {
  Module.create({ denomination: 'Desarrollo Web en Entorno Cliente', acronym: 'DWEC', course: 1, hours: 6, specialty: 'FP', formationId: 1 })
  Module.create({ denomination: 'Desarrollo Web en Entorno Servidor', acronym: 'DWES', course: 1, hours: 6, specialty: 'FP', formationId: 1 })
  Module.create({ denomination: 'Diseño de Interfaces Web', acronym: 'DIW', course: 1, hours: 3, specialty: 'FP', formationId: 1 })
  Module.create({ denomination: 'Despliegue de Aplicaciones Web', acronym: 'DEAW', course: 1, hours: 3, specialty: 'FP', formationId: 1 })
  Module.create({ denomination: 'Empresa e Iniciativa Emprendedora', acronym: 'EIE', course: 1, hours: 3, specialty: 'FP', formationId: 1 })
  Module.create({ denomination: 'Inglés Técnico', acronym: 'ING', course: 1, hours: 3, specialty: 'FP', formationId: 1 })
  Module.create({ denomination: 'Seguridad y Alta Disponibilidad', acronym: 'SAD', course: 2, hours: 6, specialty: 'FP', formationId: 2 })
  Module.create({ denomination: 'Servicios en la Red', acronym: 'SR', course: 2, hours: 6, specialty: 'FP', formationId: 2 })
  Module.create({ denomination: 'Implantación de Aplicaciones Web', acronym: 'IAW', course: 2, hours: 6, specialty: 'FP', formationId: 2 })
  Module.create({ denomination: 'Administración de Sistemas Gestores de Bases de Datos', acronym: 'ASGBD', course: 2, hours: 6, specialty: 'FP', formationId: 2 })
  Module.create({ denomination: 'Administración de Sistemas Operativos', acronym: 'ASO', course: 2, hours: 6, specialty: 'FP', formationId: 2 })
  // Formation 3
  Module.create({ denomination: 'Matemáticas', acronym: 'MAT', course: 1, hours: 6, specialty: 'Secundaria', formationId: 3 })
  Module.create({ denomination: 'Lengua', acronym: 'LEN', course: 1, hours: 6, specialty: 'Secundaria', formationId: 3 })
  Module.create({ denomination: 'Inglés', acronym: 'ING', course: 1, hours: 6, specialty: 'Secundaria', formationId: 3 })
}

// Create Professors
export const createProfessorsData = () => {
  Professor.create({ name: 'Daniel Fuentes', senecaUser: 'dfuebre452', firstSurname: 'Bretones', lastSurname: 'Bretones', specialty: 'FP' })
  Professor.create({ name: 'Paco López', senecaUser: 'pfrolop854', firstSurname: 'López', lastSurname: 'López', specialty: 'Secundaria' })
  Professor.create({ name: 'María Pérez', senecaUser: 'mperezm123', firstSurname: 'Pérez', lastSurname: 'Pérez', specialty: 'FP' })
  Professor.create({ name: 'Juan Martínez', senecaUser: 'jmartinez789', firstSurname: 'Martínez', lastSurname: 'Martínez', specialty: 'FP' })
  Professor.create({ name: 'Ana García', senecaUser: 'agarci123', firstSurname: 'García', lastSurname: 'García', specialty: 'Secundaria' })
  Professor.create({ name: 'Pedro Rodríguez', senecaUser: 'prodriguez456', firstSurname: 'Rodríguez', lastSurname: 'Rodríguez', specialty: 'FP' })
  Professor.create({ name: 'Laura Sánchez', senecaUser: 'lsanchez789', firstSurname: 'Sánchez', lastSurname: 'Sánchez', specialty: 'Secundaria' })
  Professor.create({ name: 'Carlos Fernández', senecaUser: 'cfernandez123', firstSurname: 'Fernández', lastSurname: 'Fernández', specialty: 'FP' })
  Professor.create({ name: 'Sara López', senecaUser: 'slopez456', firstSurname: 'López', lastSurname: 'López', specialty: 'Secundaria' })
  Professor.create({ name: 'Javier Torres', senecaUser: 'jtorres789', firstSurname: 'Torres', lastSurname: 'Torres', specialty: 'FP' })
  Professor.create({ name: 'María Rodríguez', senecaUser: 'mrodriguez123', firstSurname: 'Rodríguez', lastSurname: 'Rodríguez', specialty: 'Secundaria' })
  Professor.create({ name: 'Luisa Gómez', senecaUser: 'lgomez456', firstSurname: 'Gómez', lastSurname: 'Gómez', specialty: 'FP' })
  Professor.create({ name: 'Jorge Sánchez', senecaUser: 'jsanchez789', firstSurname: 'Sánchez', lastSurname: 'Sánchez', specialty: 'Secundaria' })
}
