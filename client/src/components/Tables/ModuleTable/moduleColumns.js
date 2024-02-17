const moduleColumns = (formations) => {
  const columns = [
    {
      header: 'Denomination',
      accessorKey: 'denomination'
    },
    {
      header: 'Acronym',
      accessorKey: 'acronym'
    },
    {
      header: 'Course',
      accessorKey: 'course'
    },
    {
      header: 'Hours',
      accessorKey: 'hours'
    },
    {
      header: 'Specialty',
      accessorKey: 'specialty'
    },
    {
      header: 'Formation',
      accessorFn: (row) => `${formations.find(formation => formation.id === row.formationId)?.acronym}`
    }
  ]

  return columns
}

export default moduleColumns
