import "./App.css";
import Layout from "./Components/shared/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import React from "react";
import { AuthContextProvider } from "./Components/shared/AuthContext";
import Movies from "./pages/Movies";
import ProtectedRoute from "./Components/shared/ProtectedRoute";
import Shopping from "./pages/shopping";
import Signup from "./pages/signup";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route
              path="/home"
              element={
                <ProtectedRoute accessBy="authenticated">
                  <Home />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/"
              element={
                <ProtectedRoute accessBy="non-authenticated">
                  <Login />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <ProtectedRoute accessBy="non-authenticated">
                  <Signup />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/movies"
              element={
                <ProtectedRoute accessBy="authenticated">
                  <Movies />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/shopping"
              element={
                <ProtectedRoute accessBy="authenticated">
                  <Shopping />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default App;
