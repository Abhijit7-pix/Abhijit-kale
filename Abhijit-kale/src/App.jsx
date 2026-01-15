import { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Not Placed");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("students"));
    if (data) setStudents(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = () => {
    if (!name || !company) {
      alert("Please fill all fields");
      return;
    }

    setStudents([...students, { id: Date.now(), name, company, status }]);
    setName("");
    setCompany("");
    setStatus("Not Placed");
  };

  const placedCount = students.filter(s => s.status === "Placed").length;

  return (
    <div className="app">
      <div className="header">
        <h1>🎓 Student Placement Tracker</h1>
        <p>Track students placements easily</p>
      </div>

      <div className="stats">
        <div className="card total">Total Students <span>{students.length}</span></div>
        <div className="card placed">Placed <span>{placedCount}</span></div>
        <div className="card notplaced">Not Placed <span>{students.length - placedCount}</span></div>
      </div>

      <div className="form-card">
        <h2>Add Student</h2>
        <input placeholder="Student Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Company Name" value={company} onChange={e => setCompany(e.target.value)} />

        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>Placed</option>
          <option>Not Placed</option>
        </select>

        <button onClick={addStudent}>➕ Add Student</button>
      </div>

      <div className="table-card">
        <h2>Placement List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.company}</td>
                <td className={s.status === "Placed" ? "green" : "red"}>{s.status}</td>
                <td>
                  <button className="del" onClick={() => setStudents(students.filter(x => x.id !== s.id))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
