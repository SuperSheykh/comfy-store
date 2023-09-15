import { useLocation, useNavigate, useLoaderData } from 'react-router-dom'

const ComplexPaginationContainer = () => {
   const {
      meta: {
         pagination: { page, pageCount },
      },
   } = useLoaderData()
   console.log(page)
   console.log(pageCount)

   const { pathname, search } = useLocation()
   const navigate = useNavigate()

   const handlePageChange = (pageNumber) => {
      console.log('I was clicked!')
      const newSearch = new URLSearchParams(search)
      newSearch.set('page', pageNumber)
      const newUrl = `${pathname}?${newSearch.toString()}`
      navigate(newUrl)
   }

   const addPageButton = (val) => {
      return (
         <button
            className={`join-item btn btn-xs sm:btn-md border-none ${
               val === page && 'btn-active'
            }`}
            onClick={() => handlePageChange(val)}
         >
            {val}
         </button>
      )
   }

   const renderPageButtons = () => {
      const pageButtons = []
      // first Button
      pageButtons.push(addPageButton(1))

      // Dots
      if (page > 2)
         pageButtons.push(<button className='join-item btn'>...</button>)

      // Active, Current button
      if (page !== 1 && page !== pageCount)
         pageButtons.push(addPageButton(page))

      // Dots
      if (page < pageCount - 1)
         pageButtons.push(<button className='join-item btn'>...</button>)
      // last button
      pageButtons.push(addPageButton(pageCount))

      // return pageButtons
      return (
         <div className='join'>
            <button
               className='join-item btn'
               onClick={() => {
                  let prev = page - 1
                  if (prev < 1) prev = pageCount
                  handlePageChange(prev)
               }}
            >
               Prev
            </button>
            {pageButtons}
            <button
               className='join-item btn'
               onClick={() => {
                  let next = page + 1
                  if (next > pageCount) next = 1
                  handlePageChange(next)
               }}
            >
               Next
            </button>
         </div>
      )
   }

   if (pageCount < 2) {
      return null
   }

   return <div className='mt-16 flex justify-end'>{renderPageButtons()}</div>
}

export default ComplexPaginationContainer
