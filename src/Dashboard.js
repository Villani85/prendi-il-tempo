import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Importa il CSS globale

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [timer, setTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, "tasks");
        const snapshot = await getDocs(tasksCollection);
        const tasksList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksList);
      } catch (error) {
        console.error("Errore durante il caricamento dei task:", error);
      }
    };

    fetchTasks();
  }, []);

  const filterTasksByTime = (time) => {
    const filtered = tasks.filter((task) => task.time <= time);
    setFilteredTasks(filtered);
  };

  const startTimer = (task) => {
    setTimer(task);
    setTimeRemaining(task.time * 60);
  };

  const stopTimer = () => {
    setTimer(null);
    setTimeRemaining(0);
  };

  useEffect(() => {
    let timerInterval;
    if (timeRemaining > 0) {
      timerInterval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && timer) {
      alert(`Tempo scaduto per: ${timer.title}`);
      setTimer(null);
    }
    return () => clearInterval(timerInterval);
  }, [timeRemaining, timer]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {/* Pulsanti per tempo */}
      <div className="time-buttons">
        {[10, 15, 20, 25].map((time) => (
          <button key={time} onClick={() => filterTasksByTime(time)}>
            ⏱️ {time} minuti
          </button>
        ))}
      </div>

      {/* Quadranti */}
      <div className="quadrant-container">
        <div className="quadrant">
          <h3>🔴 Importante e urgente</h3>
          {filteredTasks
            .filter((task) => task.quadrant === "Importante e urgente")
            .map((task) => (
              <div key={task.id} className="task-card">
                <strong>{task.title}</strong>
                <button onClick={() => startTimer(task)}>Avvia Timer</button>
              </div>
            ))}
        </div>
        <div className="quadrant">
          <h3>🟡 Importante ma non urgente</h3>
          {filteredTasks
            .filter((task) => task.quadrant === "Importante ma non urgente")
            .map((task) => (
              <div key={task.id} className="task-card">
                <strong>{task.title}</strong>
                <button onClick={() => startTimer(task)}>Avvia Timer</button>
              </div>
            ))}
        </div>
        <div className="quadrant">
          <h3>🔵 Non importante ma urgente</h3>
          {filteredTasks
            .filter((task) => task.quadrant === "Non importante ma urgente")
            .map((task) => (
              <div key={task.id} className="task-card">
                <strong>{task.title}</strong>
                <button onClick={() => startTimer(task)}>Avvia Timer</button>
              </div>
            ))}
        </div>
        <div className="quadrant">
          <h3>⚪ Non importante e non urgente</h3>
          {filteredTasks
            .filter((task) => task.quadrant === "Non importante e non urgente")
            .map((task) => (
              <div key={task.id} className="task-card">
                <strong>{task.title}</strong>
                <button onClick={() => startTimer(task)}>Avvia Timer</button>
              </div>
            ))}
        </div>
      </div>

      {/* Timer Attivo */}
      {timer && (
        <div className="timer-active">
          <h3>Timer Attivo</h3>
          <p>
            Task: <strong>{timer.title}</strong>
          </p>
          <p>
            Tempo rimanente: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60 < 10 ? `0${timeRemaining % 60}` : timeRemaining % 60} minuti
          </p>
          <button onClick={stopTimer} style={{ backgroundColor: "#d9534f" }}>
            Interrompi Timer
          </button>
        </div>
      )}

      {/* Pulsanti di navigazione */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={() => navigate("/add-task")}>Aggiungi Task</button>
        <button onClick={() => setFilteredTasks(tasks)}>Mostra Tutti i Task</button>
      </div>
    </div>
  );
};

export default Dashboard;
