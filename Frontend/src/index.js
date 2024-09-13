import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { UserProvider } from './UserContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
