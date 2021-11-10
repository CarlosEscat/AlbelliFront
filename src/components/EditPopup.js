import React from "react";
import { useForm } from "react-hook-form";
import * as request from "superagent";

const apiEndpoint = "http://localhost:8080";

const EditPopup = (props) => {
  const { _id, title, valid_until, link } = props.itemData;
  //console.log("Item: ", props.itemData);
  let fecha;

  if (valid_until.length > 10) {
    fecha = valid_until.slice(0, 10);
  } else {
    fecha = valid_until;
  }

  const { register, handleSubmit } = useForm();

  const validated = (data) => {
    request
      .put(`${apiEndpoint}/advertisements/${_id}`)
      .send(data)
      .then((response) => {
        console.log(response.body);
      })
      .catch((error) => {
        console.log("Something went wrong adding a comment");
        console.log(error);
      });
    props.refreshState();
    props.handleClose();
  };

  const handleDelete = () => {
    request
      .del(`${apiEndpoint}/advertisements/${_id}`)
      .set("Accept", "application/json")
      .end(function (err, res) {
        console.log(res);
        props.refreshState();
      });
    props.handleClose();
  };

  const onSubmit = (data) => {
    const { title, valid_until, link } = data;
    console.log("VALIDATE: " + _id, title, valid_until, link);
    if (title == "" || valid_until == "" || link == "") {
      alert("Please fill in the empty fields");
      return false;
    }
    if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(fecha)) {
      alert("Enter a valid date YYYY-MM-DD");
      return false;
    }
    var parts = fecha.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
      alert("Enter a valid date YYYY-MM-DD");
      return false;
    }

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      monthLength[1] = 29;
    }

    if (day < 1 || day > monthLength[month - 1]) {
      alert("Enter a valid date YYYY-MM-DD");
      return false;
    }

    validated(data);
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>

        <>
          <b className="PopupHeader">Edit Advertisement</b>
          <br />
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="labelForm">Title</label>
            <input
              className="InputForm"
              {...register("title")}
              placeholder={title}
            />

            <br />
            <label className="labelForm">Valid Until</label>
            <input
              className="InputForm"
              {...register("valid_until")}
              placeholder={fecha}
            />
            <br />
            <label className="labelForm">Link</label>
            <input
              className="InputForm"
              {...register("link")}
              placeholder={link}
            />

            <br />
            <input className="BtnEdit" type="submit" value="Submit changes" />
          </form>
          <button className="BtnDelete" onClick={() => handleDelete()}>
            {" "}
            Delete Advertisement
          </button>
        </>
      </div>
    </div>
  );
};

export default EditPopup;
