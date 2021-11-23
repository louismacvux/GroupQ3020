import { HiHome, HiUser, HiCog } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = (props) => {
     let { ...rest } = props;
     return (
          <div {...rest}>
               <div className="flex justify-between p-8 shadow-xl">
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
          </div>
     )
}

export default Navbar
