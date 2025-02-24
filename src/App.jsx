import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
  useNavigation,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/slices/authSlice';
import Users from './pages/Users/Users';
import Products from './pages/Products/Products';
import Login from './pages/Login/Login';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to='/login' />;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div className='min-h-screen bg-gray-100 font-default'>
        {isAuthenticated && (
          <nav className='bg-white shadow-md'>
            <div className='max-w-7xl mx-auto px-4'>
              <div className='flex justify-between h-16 p-2'>
                <div className='flex space-x-8'>
                  <NavLink
                    to='/users'
                    style={({ isActive }) => ({
                      color: isActive ? '#fdc936' : '#000000',
                    })}
                    className='inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600'
                  >
                    Users
                  </NavLink>
                  <NavLink
                    to='/products'
                    style={({ isActive }) => ({
                      color: isActive ? '#fdc936' : '#000000',
                    })}
                    className='inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600'
                  >
                    Products
                  </NavLink>
                </div>
                <button
                  onClick={handleLogout}
                  className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        )}

        <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route
              path='/users'
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path='/products'
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
