import React, { useState } from "react";
import TicketsSold from "./TicketsSold";

const styles = {
  container: {
    padding: "20px",
    textAlign: "left",
    width: 'calc(90vw-5vw)',
  },
  label: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "16px",
    marginLeft: "200px",
  },
  input: {
    marginLeft: "10px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    marginLeft: "10px",
    padding: "8px 15px",
    borderRadius: "4px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
};

function Product() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [displayTicketsSold, setDisplayTicketsSold] = useState(false);

  return (
    <div style={styles.container}>
      <label style={styles.label}>
        Date 1 :
        <input
          type="date"
          onChange={(e) => setDate1(e.target.value)}
          style={styles.input}
        />
        {"       "}
        Date 2 :
        <input
          type="date"
          onChange={(e) => setDate2(e.target.value)}
          style={styles.input}
        />
        <br/>
        <button
          onClick={() => setDisplayTicketsSold(true)}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Display Data
        </button>
      </label>
      {displayTicketsSold && <TicketsSold ticketDate1={date1} ticketDate2={date2} />}
    </div>
  );
}

export default Product;
