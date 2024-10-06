const TableHeader = ({text}) => {
  return (
    <th
      scope="col"
      className=" font-semibold text-gray-900 px-6 py-4 text-left"
    >
      {text}
    </th>
  );
}
export default TableHeader