import { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";

function SimpleTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/allPosts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      //👆 id is property name of the actual data
      header: () => "data Id", //table cell name
    }),
    columnHelper.accessor("title", {
      header: () => "title",
    }),
    columnHelper.accessor((row) => row.status, {
      //👆 status is the property name of the actual data
      id: " ", //here id is required
      header: () => "Status",
    }),
    columnHelper.accessor("updatedAt", {
      header: () => "updatedAt",
    }),
  ];
  //id, category, slug, status,title, updatedAt
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>loading</div>;
  //   console.log(data);
  return (
    <div>
      <table border={1}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {/* {header.column.columnDef.header()} */}
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SimpleTable;
