import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
const PaginationContainer = () => {
   const {
      params: { page: paramPage },
      meta: {
         pagination: { pageCount, page },
      },
   } = useLoaderData()
   const activePage = +paramPage || 1

   const { pathname, search } = useLocation()
   const navigate = useNavigate()

   const pages = Array.from({ length: pageCount }, (_, index) => {
      return index + 1
   })

   const handlePageChange = (pageNumber) => {
      const newSearchParams = new URLSearchParams(search)
      newSearchParams.set('page', pageNumber)
      const newUrl = `${pathname}?${newSearchParams.toString()}`
      navigate(newUrl)
   }

   if (pages.length < 2) {
      return null
   }

   return (
      <div className='mt-16 flex justify-end'>
         <div className='join'>
            <button
               type='button'
               className='btn btn-xs sm:btn-md join-item'
               onClick={() => {
                  let prevPage = activePage - 1
                  if (prevPage < 1) {
                     prevPage = pageCount
                  }
                  handlePageChange(prevPage)
               }}
            >
               Prev
            </button>
            {pages.map((pageNumber) => {
               return (
                  <button
                     type='button'
                     key={pageNumber}
                     className={`btn btn-xs sm:btn-md border-none join-item ${
                        pageNumber === activePage
                           ? 'bg-base-300 border-base-300'
                           : ''
                     }`}
                     onClick={() => handlePageChange(pageNumber)}
                  >
                     {pageNumber}
                  </button>
               )
            })}
            <button
               type='button'
               className='btn btn-xs sm:btn-md join-item'
               onClick={() => {
                  let nextPage = activePage + 1
                  if (nextPage > pageCount) nextPage = 1
                  handlePageChange(nextPage)
               }}
            >
               Next
            </button>
         </div>
      </div>
   )
}

export default PaginationContainer
