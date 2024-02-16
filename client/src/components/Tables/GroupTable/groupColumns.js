const groupColumns = (formations) => {
  const columns = [
    {
      header: 'Course',
      accessorKey: 'course'
    },
    {
      header: 'Denomination',
      accessorKey: 'denomination'
    },
    {
      header: 'Formation',
      accessorFn: (row) => `${formations.find(formation => formation.id === row.formationId)?.acronym}`
    },
    {
      header: 'School Year',
      accessorKey: 'schoolYear'
    },
    {
      header: 'Shift',
      accessorFn: (row) => `${row.isMorning ? 'Morning' : 'Afternoon'}`
    }
  ]

  return columns
}

export default groupColumns
