
import {Link} from 'react-router-dom'


function Header() {
  return (
      <nav className="bg-blue-600 p-4 sticky w-full">
        <div className="container mx-auto flex items-center">

          <Link to="/" className="text-white text-xl font-bold hover:text-gray-200">AppName</Link>

          <div className="space-x-6 ml-4">
            <Link to="/orders" className="text-white hover:text-gray-200">
              Orders
            </Link>
            <Link to="/products" className="text-white hover:text-gray-200">
              Products
            </Link>
          </div>
        </div>
      </nav>
  );
}

export default Header;