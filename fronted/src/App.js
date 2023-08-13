import { Route, Routes, } from "react-router-dom";
import Blogs from "./Components/Blogs";
import UserBlogs from "./Components/UserBlogs";
import AddBlog from "./Components/AddBlog"
import Header from "./Components/Header";
import React, { useEffect } from "react";
import Auth from "./Components/Auth"
import { useDispatch, useSelector } from "react-redux"
import BlogDetails from "./Components/BlogDetails";
import { authActions } from "./store";
function App() {
  const dispath = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);
  return <React.Fragment>
    <header>
      <Header />
    </header>
    <main>
      <Routes>
      {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/add" element={<AddBlog />} />
          <Route path="/myBlogs" element={<UserBlogs />} />
          <Route path="/myBlogs/:id" element={<BlogDetails />} /></>
     
      )}</Routes>

    </main>
  </React.Fragment>
}

export default App;
