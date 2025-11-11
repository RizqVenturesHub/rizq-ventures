// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignUpPage";
// // import Dashboard from "./pages/Dashboard";   // add if exists

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
// import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ Toast container must be here */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
