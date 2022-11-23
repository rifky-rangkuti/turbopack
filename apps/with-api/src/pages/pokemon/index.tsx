import React from "react";
import Head from "next/head";
import { useTable, usePagination } from "react-table";
import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "../../services/pokemon";
import Link from "next/link";

export default function Pokemon() {
  const { data } = usePokemon();
  const columns = React.useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "URL",
        accessor: "url",
      },
      {
        Header: "Action",
        Cell: ({ row }: any) => {
          return (
            <Link
              href={`/pokemon/${row.original.name}`}
              className="cursor-pointer text-white hover:text-sky-400"
            >
              Lihat detail
            </Link>
          );
        },
      },
    ],
    []
  );
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Head>
        <title>With API - Turborepo Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Table columns={columns} data={data?.results ?? []} />
      </main>
    </div>
  );
}

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        className="mb-5 border border-solid border-white text-white"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border border-solid border-white px-4  py-2 text-white"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="border border-solid border-white px-4 py-2 text-white"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="text-white">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="h-7 w-7 rounded bg-slate-400"
        >
          {"<<"}
        </button>{" "}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="h-7 w-7 rounded bg-slate-400"
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="h-7 w-7 rounded bg-slate-400"
        >
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="h-7 w-7 rounded bg-slate-400"
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="text-black"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

const usePokemon = () => {
  return useQuery(["pokemons"], getPokemons);
};
