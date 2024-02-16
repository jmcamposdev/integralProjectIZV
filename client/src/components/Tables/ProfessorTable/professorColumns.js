const professorColumns = [
  {
    header: 'Name',
    accessorFn: (row) => `${row.name} ${row.firstSurname} ${row.lastSurname}`
  },
  {
    header: 'Seneca User',
    accessorKey: 'senecaUser'
  },
  {
    header: 'Specialty',
    accessorKey: 'specialty'
  }
]

export default professorColumns
