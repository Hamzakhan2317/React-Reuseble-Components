import NoDataImage from "../../../assets/svgs/NoData.svg";

const NoData = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "22px",
        padding: "5%",
        flex: 1,
        width: "100%",
      }}
    >
      <img
        src={NoDataImage}
        width="200px"
        height={"200px"}
        style={{ border: "none" }}
      />
    </div>
  );
};

export default NoData;
