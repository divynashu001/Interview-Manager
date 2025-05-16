import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import InterviewList from "./components/InterviewList";
import InterviewForm from "./components/InterviewForm";

function App() {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="min-h-screen bg-neutral-900">
        <nav className="bg-blue-600 p-4">
          <div className="container mx-auto flex justify-between">
            <Link to="/" className="text-lg font-bold">Interview Tracker App</Link>
            <div>
              {token ? (
                <>
                  {/* <Link to="/interviews" className="mr-4">Interviews</Link> */}
                  <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="mr-4">Login</Link>
                  <Link to="/signup">Signup</Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<InterviewList />} />
            <Route path="/interview/new" element={<InterviewForm />} />
            <Route path="/interview/edit/:id" element={<InterviewForm />} />
            {/* <Route path="/" element={<h1 className="text-2xl">Welcome to Interview Manager</h1>} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;