import React, { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import ComboBox from "../../Components/StopAutoComplete/ComboBox";
import "./AddBus.css";
import { toast } from "react-toastify";

const AddRoute = () => {
  const [Start_stop, setStartValue] = useState({});
  const [End_Stop, setDestValue] = useState({});
  const [Route_id, setId] = useState("");
  const [Stop_num, setNum] = useState(0);
  const [Stop_list, setStop] = useState([]);

  const AddStop = () => {
    const stopId = document.getElementById("stop_id").value;
    if (stopId) {
      setStop((prevList) => [...prevList, stopId]);
      document.getElementById("stop_id").value = ""; // Clear input after adding
    }
  };

  const SubmitRoute = async () => {
    try {
      const start_stop = Start_stop.stop_id;
      const end_stop = End_Stop.stop_id;
      const docRef = await addDoc(collection(db, "Bus_Route"), {
        start_stop,
        end_stop,
        Route_id,
        Stop_num: parseInt(Stop_num, 10),
        Stop_list,
      });
      toast.success("Route added successfully !")
      console.log("Document written with ID: ", docRef.id);
      console.log("temp_stop");
      console.log(start_stop + " " + end_stop);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const ResetForm = () => {
    setStartValue({});
    setDestValue({});
    setId("");
    setNum(0);
    setStop([]);
  };

  return (
    <div className="add-bus-container">
      <h1>Set Route</h1>
      <section>
        <div className="add-bus form">
          <div>
            <div className="combobox-container">
              <ComboBox className='stop_input' stopUpdate={setStartValue} label={"Start_Stop"} />
            
              <ComboBox className='stop_input' stopUpdate={setDestValue} label={"End_Stop"} />
            </div>
            <div className="busdata-container">
              <div className="input-container">
                <label htmlFor="rout-id">Route Id</label>
                <input
                  type="text"
                  id="rout-id"
                  value={Route_id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="input-container">
                <label htmlFor="stop-count">Number of Stops</label>
                <input
                  type="number"
                  value={Stop_num}
                  id="stop-count"
                  onChange={(e) => setNum(e.target.value)}
                />
              </div>
              <div className="stop-container">
                <label htmlFor="stop_id">Add Stop Id</label>
                <input id="stop_id" type="text" />
                <button onClick={AddStop}>Add</button>
              </div>
            </div>
            <div className="submit-button">
              <button onClick={SubmitRoute}>Submit</button>
              <button onClick={ResetForm}>Reset</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddRoute;
