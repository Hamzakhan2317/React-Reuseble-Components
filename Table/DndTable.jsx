import React, { useEffect, useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useTable } from "react-table";
import { updateAppointment } from "../../../redux/features/Appointment/appointmentSlice";
import { convertto24Hours } from "../../../utils/convertto24Hours";
import { getFormattedDate } from "../../../utils/getFormattedDate";
import notify from "../Notify";
import "./ReactTable.css";

function Table({
  columns,
  data = [],
  loading,
  onClick,
  setIsDragged,
  rowsData,
  currentDate,
}) {
  const [tableData, setData] = useState(data);

  useEffect(() => {
    setData(data);
  }, [rowsData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data: tableData,
    initialState: { pageIndex: 0 },
  });

  useEffect(() => {
    setData(data);
  }, []);

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    background: "white",
    boxShadow: isDragging
      ? "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
      : "",

    ...draggableStyle,
  });
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (
      rows[destination.index].original.isPresent === true &&
      destination.index !== source.index
    ) {
      notify("warning", "Slot is already booked!");
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (!destination) return;

    reorderData(source.index, destination.index);
  };

  const reorderData = (startIndex, endIndex) => {
    const newData = [...tableData];

    let tempTime = newData[startIndex].time;
    newData[startIndex].time = newData[endIndex].time;
    newData[endIndex].time = tempTime;

    let temp = newData[startIndex];
    newData[startIndex] = newData[endIndex];
    newData[endIndex] = temp;

    // let newTime = `${getFormattedDate(
    //   newData[endIndex].appt_time
    // )}${convertto24Hours(newData[endIndex].time)}`;

    let newTime = `${getFormattedDate(currentDate)}${convertto24Hours(
      newData[endIndex].time
    )}`;

    const { patient_id, app_id, resource_id, duration, status } =
      newData[endIndex];
    setData(newData);

    dispatch(
      updateAppointment({
        resourceId: resource_id,
        apptId: app_id,
        patientId: patient_id,
        apptTime: newTime,
        duration,
        action: "C",
        status,
      })
    );
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dndTable">
          {(provided, snapshot) => (
            <table
              {...getTableProps()}
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        style={{ padding: "0 1rem", textAlign: "center" }}
                        {...column.getHeaderProps()}
                      >
                        <div style={{ textAlign: "center" }}>
                          {column.render("Header")}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <Draggable
                      key={i}
                      draggableId={i}
                      index={i}
                      isDragDisabled={row.original.isPresent === false}
                    >
                      {(provided, snapshot) => {
                        return (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            isDragging={
                              snapshot.isDragging && !snapshot.isDropAnimating
                            }
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            {...row.getRowProps()}
                          >
                            {row.cells.map((cell, index) => {
                              return (
                                <td
                                  key={index}
                                  {...cell.getCellProps()}
                                  style={{
                                    padding: "0 1rem",
                                    width: "100px",
                                    cursor:
                                      index !== 0 &&
                                      index !== row.cells.length - 1
                                        ? "pointer"
                                        : "auto",
                                  }}
                                  onClick={() => {
                                    onClick && onClick(row);
                                  }}
                                >
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

const DndTable = ({
  columnsData = [],
  rowsData = [],
  urlPath,
  marginTop,
  loading,
  pageCount,
  onClick,
  className = "dailyappointment_grid_table table-responsive",
  filterLess = false,
  setIsDragged,
  currentDate,
}) => {
  const data = React.useMemo(() => rowsData, [rowsData, currentDate]);
  const columns = useMemo(() => columnsData, [currentDate]);

  return (
    <div className={className} style={{ marginTop: marginTop }}>
      <Table
        columns={columns}
        data={data}
        loading={loading}
        onClick={onClick}
        filterLess={filterLess}
        setIsDragged={setIsDragged}
        rowsData={rowsData}
        currentDate={currentDate}
      />
    </div>
  );
};

export default DndTable;
