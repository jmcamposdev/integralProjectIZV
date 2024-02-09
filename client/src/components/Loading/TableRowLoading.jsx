const TableRowLoading = ({ columns, rows }) => {
  const rowsHtml = []

  for (let i = 0; i < rows; i++) {
    const columnsHtml = []
    for (let j = 0; j < columns; j++) {
      columnsHtml.push(
        <div key={j} className='p-2.5 xl:p-5'>
          <p className='text-black dark:text-white bg-slate-700 h-5 w-full rounded' />
        </div>
      )
    }
    rowsHtml.push(
      <div key={i} className={`grid grid-cols-2 sm:grid-cols-${columns} animate-pulse`}>
        {columnsHtml}
      </div>
    )
  }

  return (<>{rowsHtml}</>)
}

export default TableRowLoading
