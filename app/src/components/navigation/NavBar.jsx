import { HiHome, HiUser, HiCog } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
     return (
          <div className="flex justify-between p-8">
               <Link to="/">
                    <HiHome className="w-8 h-8" />
               </Link>
               <Link to="/profile">
                    <HiUser className="w-8 h-8" />
               </Link>
               <Link to="/settings">
                    <HiCog className="w-8 h-8" />
               </Link>
          </div>
     )
}

export default Navbar
