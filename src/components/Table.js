import React from "react";
import "./table.css";

const Table = props => {
  const {
    isFetching,
    lessThanOneDay,
    lessThanSevenDays,
    moreThanSevenDays,
    errorMessage,
    totalCount,
    hasBeenClicked
  } = props;
  return (
    <>
      {isFetching && <p>Fetching ....</p>}
      {!isFetching && errorMessage && <p>{errorMessage}</p>}
      {!isFetching && !errorMessage && hasBeenClicked && (
        <div className="table-container">
          <div className="row">
            <div className="column column-heading">Total Count</div>
            <div className="column column-data">{totalCount}</div>
          </div>
          <div className="row">
            <div className="column column-heading">
              Opened in less than 1 day
            </div>
            <div className="column column-data">{lessThanOneDay}</div>
          </div>
          <div className="row">
            <div className="column column-heading">
              More than 1 day but less than 7 days
            </div>
            <div className="column column-data">{lessThanSevenDays}</div>
          </div>
          <div className="row">
            <div className="column column-heading">More than 7 days</div>
            <div className="column column-data">{moreThanSevenDays}</div>
          </div>
        </div>
      )}
    </>
  );
};
export default Table;
