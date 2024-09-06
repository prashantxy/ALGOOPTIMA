import React, { useContext, useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  MdAddChart,
  MdDashboard,
  MdKeyboardArrowRight,
  MdOutlineEmergencyShare,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { AiOutlineProduct } from "react-icons/ai";
import { GiCash } from "react-icons/gi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { RiCustomerService2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { auth, db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import DateTime from "./Date/DateTime";

const SideBar = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  const { user } = useContext(AuthContext);

  const userEmail = user ? user.email : "No user logged in";

  const userData = collection(db, "users");

  
  const navigate=useNavigate();

  const handleLogOut = async () => {
    await signOut(auth);
    toast.info("User logged out successfully !");
    navigate("/")
  };
  const [userName, setUserName] = useState("Manager Name");

  const setUserMail = async () => {
    const data = await getDocs(userData);
    const filteredData = data.docs.find((doc) => {
      return doc.data().email === userEmail;
    });
    setUserName(filteredData.data().name);
    // console.log(userName)
  };

  setUserMail();

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  return (
    <div className={`sidebar-${showSideBar}`}>
      <button
        className={`sidebar-control ${showSideBar}`}
        onClick={handleSideBar}
      >
        <MdKeyboardArrowRight />
      </button>
      <div className="logo">
        <h2>{<FaRegCircleUser />}Manager Dashboard</h2>
      </div>
      <ul className="sidebar-nav">
        <li>
          <MdDashboard />
          <Link
            to="/dashboard"
            onClick={() => {
              setShowSideBar(false);
            }}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <AiOutlineProduct />
          <Link
            to="/product"
            onClick={() => {
              setShowSideBar(false);
            }}
          >
            Product
          </Link>
        </li>
        <li>
          <RiCustomerService2Fill />
          Customers
        </li>
        <li>
          <GiCash />
          <Link
            to="/revenue"
            onClick={() => {
              setShowSideBar(false);
            }}
          >
            Revenue Analysis
          </Link>
        </li>
        <li>
          <MdOutlineEmergencyShare />
          <Link
            to="/Emergency-routing"
            onClick={() => {
              setShowSideBar(false);
            }}
          >
            {" "}
            Emergency Routing{" "}
          </Link>
        </li>
        <li>
          <MdAddChart />
          <Link
            to="/AddTicketData"
            onClick={() => {
              setShowSideBar(false);
            }}
          >
            {" "}
            Add Tickets{" "}
          </Link>
        </li>
        <li>
          <IoMdHelpCircleOutline />
          Help
        </li>
        <li onClick={handleLogOut}>
          <CgLogOut />
          <Link to="/">Log Out</Link>
        </li>
      </ul>
      <DateTime />
      <div className="user-profile">
        <img src="https://picsum.photos/200/300" alt="Profile" />
        <div>
          <h3>{userName}</h3>
          <p>Bus Manager</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
