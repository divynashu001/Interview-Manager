import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function InterviewList() {
  const [interviews, setInterviews] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [nameFilter, setNameFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");


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
      <div className="flex justify-between">
      <Link to="/interview/new" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">
        Add Interview
      </Link>
      <div className="grid grid-cols-3 gap-5">
  <select
    value={nameFilter}
    onChange={(e) => setNameFilter(e.target.value)}
    className="w-28 mb-4 border border-neutral-700 bg-neutral-700 rounded px-2 py-1.5"
  >
    <option value="">All Names</option>
    {[...new Set(interviews.map((i) => i.candidate_name))].map((name, index) => (
      <option key={index} value={name}>{name}</option>
    ))}
  </select>

  <select
    value={positionFilter}
    onChange={(e) => setPositionFilter(e.target.value)}
    className="w-28 mb-4 border border-neutral-700 bg-neutral-700 rounded px-2 py-1.5"
  >
    <option value="">All Positions</option>
    {[...new Set(interviews.map((i) => i.position))].map((position, index) => (
      <option key={index} value={position}>{position}</option>
    ))}
  </select>

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="w-28 mb-4 border border-neutral-700 bg-neutral-700 rounded px-2 py-1.5"
  >
    <option value="">All Statuses</option>
    <option value="Pending">Pending</option>
    <option value="Scheduled">Scheduled</option>
    <option value="Completed">Completed</option>
  </select>
</div>

      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-4 gap-4">
        {interviews.map((interview) => (
          <div key={interview._id} className=" bg-neutral-700 p-4 rounded-md shadow-md shadow-neutral-500 text-white ">
            <h3 className="text-lg font-semibold">{interview.candidate_name}</h3>
            <p>Position: {interview.position}</p>
            <p>Status: {interview.status}</p>
            <p>Email: {interview.email}</p>
            <p>Notes: {interview.notes || "N/A"}</p>
            <div className="mt-2">
              <Link
                to={`/interview/edit/${interview._id}`}
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
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