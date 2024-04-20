import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Comments from './pages/Comments'
import Search from "./pages/Search";
import Userprofile from "./pages/Userprofile";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Messages from "./pages/Messages";
import Conversations from "./pages/Conversations";

function App() {
  return (

    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/comments/:id" element={<Comments />} />
          <Route path="/search" element={<Search />} />
          <Route path="/userprofile/:id" element={<Userprofile />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Following />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:id" element={<Conversations />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
