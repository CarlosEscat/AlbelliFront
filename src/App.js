import React, { useEffect, useState } from "react";
import "./App.css";
import Advertisements from "./components/Advertisements";
import AddPopup from "./components/AddPopup";
import EditPopup from "./components/EditPopup";

const apiEndpoint = "http://localhost:8080/advertisements";

function App() {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setAdvertisements(jsonResponse);
      });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const toggleAddPopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditPopup = () => {
    setIsOpenEdit(!isOpenEdit);
  };

  const [itemData, setData] = useState();
  const itemEdited = (SelectedItem) => {
    setData(SelectedItem);
  };

  const refreshState = () => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setAdvertisements(jsonResponse);
      });
  };

  return (
    <div>
      <header>
        <label className="Title">albelli</label>
      </header>
      <div className="App_Body">
        <input
          className="BtnOpen"
          type="button"
          value="Add New Advertisement"
          onClick={toggleAddPopup}
        />
        <Advertisements
          advertisements={advertisements}
          toggleEditPopup={toggleEditPopup}
          itemEdited={itemEdited}
        />
        {isOpen && (
          <AddPopup handleClose={toggleAddPopup} refreshState={refreshState} />
        )}
        {isOpenEdit && (
          <EditPopup
            handleClose={toggleEditPopup}
            itemData={itemData}
            refreshState={refreshState}
          />
        )}
      </div>
    </div>
  );
}

export default App;
