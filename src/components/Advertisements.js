//import React, { useState, useEffect, useLayoutEffect } from "react";

const Advertisements = (props) => {
  //console.log("PROPS ", props.advertisements);

  function renderTableData() {
    return props.advertisements.map((item, index) => {
      const { _id, title, valid_until, link } = item;
      let date;

      if (valid_until.length > 10) {
        date = valid_until.slice(0, 10);
      } else {
        date = valid_until;
      }

      function myFunction(selecteItem) {
        const { title } = selecteItem;
        return function () {
          //console.log("Row index is: " + title);
          props.itemEdited(selecteItem);
          props.toggleEditPopup();
        };
      }

      return (
        <tr className="Row" key={_id} onClick={myFunction(item)}>
          <td className="RowTitle">{title}</td>
          <td className="RowValid">{date}</td>
          <td className="RowLink">{link}</td>
        </tr>
      );
    });
  }

  return (
    <div className="div3">
      <table className="TableAdds">
        <thead className="TableTitle">
          <tr>
            <th className="thTitle">Title</th>
            <th>Valid Until</th>
            <th className="thLink">Link</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
};

export default Advertisements;
