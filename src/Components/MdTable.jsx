import React from "react";
import { MDBDataTableV5 } from "mdbreact";

const MdTable = () => {
  const column_val = [
    {
      label: "User ID",
      field: "user_id",
    },
    {
      label: "Name",
      field: "name",
    },
    {
      label: "Review Count",
      field: "review_count",
    },

    {
      label: "Yelping Since",
      field: "yelping_since",
    },
    {
      label: "Average Stars",
      field: "average_stars",
    },
  ];
  const [lastKey, setLastKey] = React.useState("");
  const [datatable, setDatatable] = React.useState({
    columns: column_val,
    rows: [],
  });

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(
      `https://utom3tufmh.execute-api.us-east-2.amazonaws.com/scan?last=${lastKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setLastKey(data.LastEvaluatedKey.user_id);
    setDatatable({
      columns: column_val,
      rows: datatable.rows.concat(data.Items),
    });
  };

  return (
    <>
      <button onClick={()=>getData()}>Load More</button>
      <MDBDataTableV5
        maxHeight="400px"
        striped
        bordered
        data={datatable}
        
      />
    </>
  );
};

export default MdTable;
