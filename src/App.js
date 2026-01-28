import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { client } from "./apollo/client";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { getToken } from "./utils/auth";
import { ApolloProvider } from '@apollo/client/react';


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={getToken() ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
