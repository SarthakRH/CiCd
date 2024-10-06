
const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit);

  const onClick = (newPage) => {
    setPage(newPage + 1);
  };

  return (
    <div className=" h-12 flex items-center justify-center my-4 z-50">
      {totalPages > 0 &&
        [...Array(totalPages)].map((_, index) => (
          <button
            onClick={() => onClick(index)}
            className={
              page === index + 1
                ? `text-sm font-medium rounded w-8 h-8 flex items-center justify-center cursor-pointer outline-none border-none my-2 shadow-md text-white bg-orange-400`
                : `text-sm font-medium rounded w-8 h-8 flex items-center justify-center cursor-pointer outline-none border-none my-2 shadow-md bg-white`
            }
            key={index}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
