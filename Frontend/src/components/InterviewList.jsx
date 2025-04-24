import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function InterviewList() {
  const [interviews, setInterviews] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await axios.get("http://localhost:8080/api/interviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setInterviews(res.data.data);
        }
      } catch (err) {
        setError("Failed to fetch interviews");
      }
    };
    fetchInterviews();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/interviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInterviews(interviews.filter((interview) => interview._id !== id));
    } catch (err) {
      setError("Failed to delete interview");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Interviews</h2>
      <Link to="/interview/new" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">
        Add Interview
      </Link>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid gap-4">
        {interviews.map((interview) => (
          <div key={interview._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{interview.candidate_name}</h3>
            <p>Position: {interview.position}</p>
            <p>Status: {interview.status}</p>
            <p>Email: {interview.email}</p>
            <p>Notes: {interview.notes || "N/A"}</p>
            <div className="mt-2">
              <Link
                to={`/interview/edit/${interview._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(interview._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterviewList;