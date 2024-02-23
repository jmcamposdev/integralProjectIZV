import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'

const TableTemplate = ({ data, columns, onDelete, onEdit, onChangePassword }) => {
  const { isAdmin } = useAuth() // Get the isAdmin value from the useAuth hook

  // Remove the Action column if exists to prevent unexpected actions
  columns = columns.filter(column => column.header !== 'Actions')

  // Add the Action column if the user is an admin and if the action column is not already added to prevent duplication
  if (isAdmin && !columns.some(column => column.header === 'Actions')) {
    columns.push({
      header: 'Actions', // Add the Actions header
      cell: (row) => ( // Add the cell function
        <div className='flex space-x-4'>
          {
            // Only show the edit button if the onEdit function is provided
            onEdit && (
              <button
                className='flex justify-center items-center w-8 h-8 rounded-md bg-primary hover:bg-opacity-70' title='Edit'
                onClick={() => onEdit(row.cell.row.original)}
              >
                <i className='icon-[material-symbols-light--edit] fill-current duration-300 ease-in-out  text-white' />
              </button>
            )
          }

          {
            // Only show the delete button if the onDelete function is provided
            onDelete && (
              <button
                className='flex justify-center items-center w-8 h-8 rounded-md bg-danger hover:bg-opacity-70' title='Delete'
                onClick={() => onDelete(row.cell.row.original.id)}
              >
                <i className='icon-[material-symbols-light--delete] fill-current duration-300 ease-in-out text-white' />
              </button>
            )
          }

          {
            // Only show the change password button if the onChangePassword function is provided
            onChangePassword && (
              <button
                className='flex justify-center items-center w-8 h-8 rounded-md bg-meta-3 hover:bg-opacity-70' title='Change Password'
                onClick={() => onChangePassword(row.cell.row.original)}
              >
                <i className='icon-[material-symbols-light--lock] fill-current duration-300 ease-in-out text-white' />
              </button>
            )
          }
        </div>
      )
    })
  }

  const [sorting, setSorting] = useState([]) // This will be used to store the sorting state
  const [globalFilter, setGlobalFilter] = useState('') // This will be used to store the global filter state

  // Create the table using the useReactTable hook
  const table = useReactTable({
    data, // The data to be displayed
    columns, // The columns to be displayed
    getCoreRowModel: getCoreRowModel(), // The core row model
    getPaginationRowModel: getPaginationRowModel(), // This will enable the pagination
    getSortedRowModel: getSortedRowModel(), // This will enable the sorting
    getFilteredRowModel: getFilteredRowModel(), // This will enable the filtering
    state: { // The initial state of the table
      sorting,
      globalFilter
    },
    onSortingChange: setSorting, // Set the sorting state
    onGlobalFilterChange: setGlobalFilter // Set the global filter state
  })

  return (
    <section className='data-table-common rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
      {/* Start of Search and Entries per page */}
      <div className='flex justify-between border-b border-stroke px-8 pb-4 dark:border-strokedark'>
        <div className='w-100'>
          <input
            type='text'
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            className='w-full rounded-md border border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary'
            placeholder='Search...'
          />
        </div>
        <div className='flex items-center font-medium'>
          <select
            className='bg-transparent pl-2'
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <p className='pl-2 text-black dark:text-white'>Entries Per Page</p>
        </div>
      </div>
      {/* End of Search and Entries per page */}

      {/* Start Table */}
      <table role='table' className='datatable-table w-full table-auto !border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8'>
        <thead>
          {
            table.getHeaderGroups().map(headerGroup => (
              <tr role='row' key={headerGroup.id} className='border-b border-stroke dark:border-strokedark'>
                {
                  headerGroup.headers.map(header => (
                    <th
                      role='columnheader'
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className='cursor-pointer pt-9 pl-8 pr-2.5 pb-6 select-none'
                      colSpan='1'
                    >
                      <div className='flex items-center'>
                        <span>{header.column.columnDef.header}</span>
                        {/* Show the sorting icon */}
                        <div className='ml-2 inline-flex flex-col space-y-[2px]'>
                          <span className='inline-block'>
                            <svg className={`fill-current ${header.column.getIsSorted() === 'asc' ? 'text-white' : ''}`} width='10' height='5' viewBox='0 0 10 5' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5 0L0 5H10L5 0Z' fill='' /></svg>
                          </span>
                          <span className='inline-block'>
                            <svg className={`fill-current ${header.column.getIsSorted() === 'desc' ? 'text-white' : ''}`} width='10' height='5' viewBox='0 0 10 5' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z' fill='' /></svg>
                          </span>
                        </div>
                      </div>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr role='row' key={row.id} className='border-b border-stroke dark:border-strokedark hover:bg-blue-200 hover:bg-opacity-10'>
              {row.getVisibleCells().map(cell => (
                <td
                  className='pl-8 py-5 pr-2'
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* End Table */}

      {/* Pagination Section */}
      <div className='flex justify-between border-t border-stroke px-8 pt-5 dark:border-strokedark'>
        <p className='font-medium'>
          Showing {table.getState().pagination.pageIndex + 1} 0f {table.getPageCount()} pages
        </p>
        <div className='flex'>
          <button
            className={`flex justify-center items-center rounded-md enabled:hover:bg-primary enabled:hover:text-whiter ${table.getCanPreviousPage() ? 'cursor-pointer' : 'cursor-not-allowed '}`}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='icon-[material-symbols-light--keyboard-double-arrow-left-rounded]' style={{ fontSize: '30px' }} />
          </button>
          <button
            className={`flex justify-center items-center rounded-md enabled:hover:bg-primary enabled:hover:text-whiter ${table.getCanPreviousPage() ? 'cursor-pointer' : 'cursor-not-allowed '}`} onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='icon-[iconamoon--arrow-left-2-thin]' style={{ fontSize: '30px' }} />
          </button>
          <button
            className={`flex justify-center items-center rounded-md enabled:hover:bg-primary enabled:hover:text-whiter ${table.getCanNextPage() ? 'cursor-pointer' : 'cursor-not-allowed '}`} onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='icon-[iconamoon--arrow-right-2-thin]' style={{ fontSize: '30px' }} />
          </button>
          <button
            className={`flex justify-center items-center rounded-md enabled:hover:bg-primary enabled:hover:text-whiter ${table.getCanNextPage() ? 'cursor-pointer' : 'cursor-not-allowed '}`} onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='icon-[material-symbols-light--keyboard-double-arrow-right-rounded]' style={{ fontSize: '30px' }} />
          </button>
        </div>
        {/* <div>
          <span>Go to page:</span>
          <input
            type='number'
            min={1}
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
          />
        </div> */}
      </div>
      {/* End Pagination Section */}
    </section>
  )
}

export default TableTemplate
