import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function InterviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    candidate_name: "",
    position: "",
    status: "pending",
    email: "",
    notes: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchInterview = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`http://localhost:8080/api/interviews?id=${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.success) {
            setFormData(res.data.data[0]);
          }
        } catch (err) {
          setError("Failed to fetch interview");
        }
      };
      fetchInterview();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (id) {
        await axios.put(`http://localhost:8080/api/interviews/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:8080/api/interviews", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/interviews");
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Interview" : "Add Interview"}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Candidate Name</label>
          <input
            type="text"
            name="candidate_name"
            value={formData.candidate_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default InterviewForm;