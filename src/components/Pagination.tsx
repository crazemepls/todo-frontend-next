const Pagination = ({ items, currentPage, pageSize, onPageChange }: any) => {
  const pagesCount = Math.ceil(items / pageSize)

  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1)
  const previousPage = currentPage <= 1 ? 1 : currentPage - 1
  const nextPage = currentPage >= pagesCount ? pagesCount : currentPage + 1

  return (
    <div className="container inline-flex justify-center">
      <ul className="inline-flex mt-2">
        <>
          <li>
            <a onClick={() => onPageChange(previousPage)}
              className="bg-white border border-gray-300 cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Prev</a>
          </li>
          {
            pages.map((page) => (
              <li key={page}>
                <a onClick={() => onPageChange(page)}
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  style={{ background: currentPage === page ? 'gray' : '', cursor: 'pointer' }}>{page}</a>
              </li>
            ))
          }

          <li>
            <a onClick={() => onPageChange(nextPage)}
              className="bg-white border cursor-pointer border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
          </li>
        </>
      </ul>
    </div>
  )
}
export default Pagination