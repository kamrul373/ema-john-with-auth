import './App.css';
import Shop from './Components/Shop/Shop';
import Orders from './Components/Orders/Orders';
import Inventory from './Components/Inventory/Inventory';
import About from './Components/About/About';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Layout/Main';
import productsCartLoader from './productsCartLoader/productsCartLoader';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Shipping from './Components/Shipping/Shipping';
import PrivateRoute from './PrivateRoute/PrivateRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          loader: () => fetch("http://localhost:5000/products"),
          element: <Shop></Shop>
        },
        {
          path: "shop",
          loader: () => fetch("http://localhost:5000/products"),
          element: <Shop></Shop>
        },
        {
          path: "orders",
          loader: productsCartLoader,
          element: <Orders></Orders>
        },
        {
          path: "inventory",
          element: <PrivateRoute><Inventory></Inventory></PrivateRoute>
        },
        {
          path: "/about",
          element: <About></About>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/register",
          element: <Register></Register>
        },
        {
          path: "/shipping",
          element: <PrivateRoute><Shipping></Shipping></PrivateRoute>
        }
      ]
    }
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
