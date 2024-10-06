import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AddCategory from "./components/AddCategory";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Categories from "./pages/Categories";
import CategoryQuestions from "./pages/admin/CategoryQuestions";
import UsersList from "./pages/admin/UsersList";
import Button from "./components/Button";
import EditUser from "./pages/admin/EditUser";
import AddGyan from "./pages/AddGyan";
import Gyans from "./pages/Gyans";
import Gyan from "./pages/Gyan";
import EditGyan from "./pages/EditGyan";
import User from "./pages/User";
import Error from "./pages/404";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/questions/:id" element={<CategoryQuestions />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/user/edit" element={<EditUser />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/add" element={<AddGyan />} />
        <Route path="/gyan" element={<Gyans/>}/>
        <Route path="/gyan/edit" element={<EditGyan />} />
        <Route path="/gyan/:id" element={<Gyan />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
