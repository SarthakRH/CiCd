
const Branch = ({ branches, filterBranch, setFilterBranch }) => {
  const onChange = ({ currentTarget: input }) => {
    if (input.checked) {
      const state = [...filterBranch, input.value];
      setFilterBranch(state);
    } else {
      const state = filterBranch.filter((val) => val !== input.value);
      setFilterBranch(state);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="m-2 text-md text-center text-orange-500">Filter By Branch</h1>
      <div className="flex flex-row flex-wrap space-x-6 justify-center">
        {branches.map((branch) => (
          <div className="flex items-center min-w-min mx-2" key={branch}>
            <input type="checkbox" value={branch} onChange={onChange} checked={filterBranch.includes(branch)} />
            <p className="m-0 ml-1">{branch}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Branch;
