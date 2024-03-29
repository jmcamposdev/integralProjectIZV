const lessonColumns = (groups, modules, professors) => {
  const columns = [
    {
      header: 'Group',
      accessorFn: (row) => groups.find((group) => group.id === row.groupId)?.denomination
    },
    {
      header: 'Module',
      accessorFn: (row) => modules.find((module) => module.id === row.moduleId)?.acronym
    },
    {
      header: 'Professor',
      accessorFn: (row) => professors.find((professor) => professor.id === row.professorId)?.name || 'No Professor assigned'
    },
    {
      header: 'Hours',
      accessorKey: 'hours'
    }
  ]
  return columns
}

export default lessonColumns
