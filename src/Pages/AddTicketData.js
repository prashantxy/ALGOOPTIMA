import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

function AddTicketData() {
  const [destA, setDestA] = useState("");
  const [destB, setDestB] = useState("");
  const [noOfTickets, setNoOfTickets] = useState();
  const [date, setDate] = useState();

  const ticketDataCollectionRef = collection(db, "ticketData");

  const addData = async () => {
    try {
      await addDoc(ticketDataCollectionRef, {
        destA: destA,
        destB: destB,
        noOfTickets: noOfTickets,
        date: date,
      });
      toast.success("Ticket Data Added successfully")
      // Clear the form after successful submission
      setDestA("");
      setDestB("");
      setNoOfTickets();
      setDate("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Ticket Data</h2>
      <label style={styles.label}>
        Destination A: 
        <input
          type="text"
          value={destA}
          style={styles.input}
          onChange={(e) => setDestA(e.target.value)}
        />
      </label>
      <label style={styles.label}>
        Destination B: 
        <input
          type="text"
          value={destB}
          style={styles.input}
          onChange={(e) => setDestB(e.target.value)}
        />
      </label>
      <label style={styles.label}>
        Number of Tickets: 
        <input
          type="number"
          value={noOfTickets}
          style={styles.input}
          onChange={(e) => setNoOfTickets(Number(e.target.value))}
        />
      </label>
      <label style={styles.label}>
        Date: 
        <input
          type="date"
          value={date}
          style={styles.input}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <button style={styles.button} onClick={addData}>
        Add Data
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "auto",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  label: {
    marginBottom: "10px",
    color: "#555",
    fontWeight: "bold",
  },
  input: {
    marginLeft: "10px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    width: "100%",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    borderRadius: "4px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default AddTicketData;
