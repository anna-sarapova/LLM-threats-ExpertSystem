import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={navbarStyles.container}>
    <ul style={navbarStyles.list}>
      <li style={navbarStyles.item}><Link to="/" style={navbarStyles.link}>Questionnaire</Link></li>
      <li style={navbarStyles.item}><Link to="/dictionary" style={navbarStyles.link}>Threat Dictionary</Link></li>
    </ul>
  </nav>
);

const navbarStyles = {
  container: {
    backgroundColor: "#f4f4f4", // Light grey background
    padding: "10px 20px",
    borderBottom: "1px solid #ccc",
  },
  list: {
    display: "flex",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    justifyContent: "center",
    gap: "20px",
  },
  item: {
    display: "inline",
  },
  link: {
    textDecoration: "none",
    color: "#333", // Dark grey text
    fontSize: "18px",
    fontWeight: "bold",
    padding: "5px 10px",
  },
};

export default Navbar;
