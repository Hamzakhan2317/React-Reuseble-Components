/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import {
  useExpanded,
  useFlexLayout,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import FadeIn from "../../animations/FadeIn";
import NoData from "./NoData";
import "./ReactTable.css";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={resolvedRef}
      {...rest}
      style={{ color: "gray" }}
    />
  );
});

function Table({
  columns,
  data,
  loading,
  onClick,
  filterLess,
  showTopFilters,
  minHeight,
  maxHeight,
  tableLoading,
}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    allColumns,
    getToggleHideAllColumnsProps,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter, expanded },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    useExpanded, // Use the useExpanded plugin hook
    usePagination,
    useFlexLayout
  );
  const [currentWidth, setCurrentWidth] = useState();
  useEffect(() => {
    setCurrentWidth(window.innerWidth);
  }, [window.innerWidth]);
  useEffect(() => {
    if (filterLess) {
      setPageSize(rows.length);
    }
  }, []);
  const toggleRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        showDropdown &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <FadeIn>
        {showTopFilters && (
          <div className="tableTopFilters">
            <div>
              <SearchFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
            <div className="pageFilters">
              <span>
                Go to page{" "}
                <input
                  className="gotoPage"
                  type="number"
                  min={1}
                  max={pageOptions.length}
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: "100px" }}
                />
              </span>{" "}
              <select
                className="showFilter"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 30, 50, 70, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className="tableContainer">
          {tableLoading && <div className="tableOverlay" />}
          <div
            className="tableWrapper"
            style={{ minHeight: minHeight, maxHeight: maxHeight }}
          >
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, columnIndex) => (
                      <th
                        key={columnIndex}
                        style={{ padding: "0 1rem" }}
                        {...column.getHeaderProps(
                          columnIndex !== headerGroup.headers.length - 1 &&
                            column.getSortByToggleProps()
                        )}
                        title={column.Header}
                      >
                        <div>
                          {column.render("Header")}
                          {columnIndex !== headerGroup.headers.length - 1 && (
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <i
                                    className="fa fa-angle-down"
                                    aria-hidden="true"
                                    style={{
                                      fontSize: "18px",
                                      marginLeft: "5px",
                                      marginTop: "5px",
                                    }}
                                  />
                                ) : (
                                  <i
                                    className="fa fa-angle-up"
                                    aria-hidden="true"
                                    style={{
                                      fontSize: "18px",
                                      marginLeft: "5px",
                                      marginTop: "7px",
                                    }}
                                  />
                                )
                              ) : (
                                <i
                                  className="fa fa-angle-up"
                                  aria-hidden="true"
                                  style={{
                                    fontSize: "18px",
                                    marginLeft: "5px",
                                    marginTop: "7px",
                                    opacity: 0,
                                  }}
                                />
                              )}
                            </span>
                          )}

                          {columnIndex === headerGroup.headers.length - 1 && (
                            <>
                              <span>
                                <span
                                  id="threeDots"
                                  className="fa fa-ellipsis-v"
                                  aria-hidden="true"
                                  onClick={() => {
                                    setShowDropdown(!showDropdown);
                                  }}
                                />
                                {showDropdown && (
                                  <ul
                                    ref={toggleRef}
                                    id="columnsContainer"
                                    style={{
                                      listStyleType: "none",
                                      display: showDropdown ? "flex" : "none",
                                      position: "absolute",
                                      backgroundColor: "white",
                                    }}
                                    // onMouseLeave={() => {
                                    //   setShowDropdown(false);
                                    // }}
                                  >
                                    {allColumns.length !==
                                      headerGroup.headers.length && (
                                      <div>
                                        <IndeterminateCheckbox
                                          {...getToggleHideAllColumnsProps()}
                                        />{" "}
                                        Toggle All
                                      </div>
                                    )}

                                    {allColumns.map((column) => {
                                      return (
                                        <li key={column.id}>
                                          <label>
                                            <input
                                              disabled={
                                                headerGroup.headers.length === 1
                                              }
                                              type="checkbox"
                                              {...column.getToggleHiddenProps()}
                                            />{" "}
                                            {column.Header}
                                          </label>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </span>
                            </>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr key={i} {...row.getRowProps()} className="rowEffect">
                      {row.cells.map((cell, index) => {
                        return (
                          <td
                            key={index}
                            style={{
                              padding: "0 1rem",
                              cursor:
                                index !== 0 && index !== row.cells.length - 1
                                  ? "pointer"
                                  : "auto",
                            }}
                            {...cell.getCellProps()}
                            onClick={() => {
                              if (
                                index !== 0 &&
                                index !== row.cells.length - 1
                              ) {
                                onClick && onClick(row);
                              }
                            }}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                {!filterLess && !rows.length && (
                  <tr>
                    <td colSpan="10000" style={{ width: "100%" }}>
                      <NoData />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}

          {!filterLess && rows.length >= 10 && (
            <div className="pagination">
              {!filterLess && rows.length >= 10 && (
                <div>
                  <span>
                    Page{" "}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                  </span>
                  <span>
                    | Showing {page.length} of {rows.length} results
                  </span>
                </div>
              )}
              {/* <div /> */}
              <div>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  <i className="fa fa-angle-double-left" aria-hidden="true" />
                </button>{" "}
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <i className="fa fa-angle-left" aria-hidden="true" />
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  <i className="fa fa-angle-right" aria-hidden="true" />
                </button>{" "}
                <button
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  <i className="fa fa-angle-double-right" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>
      </FadeIn>
    </>
  );
}

const SearchFilter = ({ filter, setFilter }) => {
  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <input
        className="search_filter"
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        value={filter}
      />
      <i
        style={{
          position: "absolute",
          right: "10px",
          color: "#cccccc",
          cursor: "pointer",
        }}
        className="fa fa-search"
      />
    </div>
  );
};

const ReactTable = ({
  columnsData = [],
  rowsData = [],
  urlPath,
  marginTop,
  loading,
  pageCount,
  height,
  onClick,
  className = "reactTable table-responsive",
  filterLess = false,
  showTopFilters = false,
  tableLoading = false,
  dependencyArray = [rowsData],
}) => {
  const data = React.useMemo(() => rowsData, dependencyArray);
  const columns = useMemo(() => columnsData, [rowsData, columnsData]);
  return (
    <div className={className} style={{ marginTop: marginTop }}>
      <Table
        columns={columns}
        data={data}
        loading={loading}
        onClick={onClick}
        filterLess={filterLess}
        showTopFilters={showTopFilters}
        tableLoading={tableLoading}
      />
    </div>
  );
};

export default ReactTable;
