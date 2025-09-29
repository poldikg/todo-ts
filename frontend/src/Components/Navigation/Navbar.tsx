//Components
import { Link } from "react-router";

//Styling
import "./Navbar.css";

const Navbar = () => {
  //TODO: Add links from react router to the pages
  return (
    <header className="navigation">
      <Link to="/Tasks">Add Tasks</Link>
      <Link to="/List">View Tasks</Link>
    </header>
  );
};

export default Navbar;
