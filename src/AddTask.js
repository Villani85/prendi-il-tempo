import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [newTask, setNewTask] = useState({ title: '', category: '', time: '', quadrant: '' });
  const [selectedCategory, setSelectedCategory] = useState(''); // Stato per il pulsante categoria selezionato
  const [selectedTime, setSelectedTime] = useState(''); // Stato per il pulsante durata selezionato
  const [selectedQuadrant, setSelectedQuadrant] = useState(''); // Stato per il pulsante quadrante selezionato
  const navigate = useNavigate();

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.category || !newTask.time || !newTask.quadrant) {
      alert("Completa tutti i campi!");
      return;
    }

    try {
      const tasksCollection = collection(db, "tasks");
      await addDoc(tasksCollection, {
        ...newTask,
        time: parseInt(newTask.time, 10)
      });
      alert("✅ Task aggiunto con successo!");
      navigate('/'); // Torna alla Dashboard
    } catch (error) {
      console.error("Errore durante l'aggiunta del task:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Aggiungi Task</h1>

      {/* Campo per il titolo */}
      <div>
        <label>Nome del Task:</label>
        <input
          type="text"
          placeholder="Es. Scrivere un report"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
      </div>

      {/* Selezione della categoria */}
      <h3>Seleziona Categoria</h3>
      <div>
        {['Lavoro', 'Casa', 'Studio', 'Altro'].map((category) => (
          <button
            key={category}
            onClick={() => {
              setNewTask({ ...newTask, category });
              setSelectedCategory(category); // Stato del pulsante selezionato
            }}
            style={{
              backgroundColor: selectedCategory === category ? '#4caf50' : '#e0e0e0',
              color: selectedCategory === category ? '#fff' : '#000',
              margin: '5px',
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {category === 'Lavoro' ? '🖋️ Lavoro' : ''}
            {category === 'Casa' ? '🏠 Casa' : ''}
            {category === 'Studio' ? '📚 Studio' : ''}
            {category === 'Altro' ? '✈️ Altro' : ''}
          </button>
        ))}
      </div>

      {/* Selezione della durata */}
      <h3>Seleziona Durata</h3>
      <div>
        {[10, 15, 20, 25].map((time) => (
          <button
            key={time}
            onClick={() => {
              setNewTask({ ...newTask, time });
              setSelectedTime(time); // Stato del pulsante selezionato
            }}
            style={{
              backgroundColor: selectedTime === time ? '#4caf50' : '#e0e0e0',
              color: selectedTime === time ? '#fff' : '#000',
              margin: '5px',
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ⏱️ {time} min
          </button>
        ))}
      </div>

      {/* Selezione del Quadrante */}
      <h3>Seleziona Quadrante</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {[
          { label: '🔴 Importante e urgente', value: 'Importante e urgente' },
          { label: '🟡 Importante ma non urgente', value: 'Importante ma non urgente' },
          { label: '🔵 Non importante ma urgente', value: 'Non importante ma urgente' },
          { label: '⚪ Non importante e non urgente', value: 'Non importante e non urgente' }
        ].map((quadrant) => (
          <button
            key={quadrant.value}
            onClick={() => {
              setNewTask({ ...newTask, quadrant: quadrant.value });
              setSelectedQuadrant(quadrant.value); // Stato del pulsante selezionato
            }}
            style={{
              backgroundColor: selectedQuadrant === quadrant.value ? '#4caf50' : '#e0e0e0',
              color: selectedQuadrant === quadrant.value ? '#fff' : '#000',
              margin: '5px',
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {quadrant.label}
          </button>
        ))}
      </div>

      {/* Pulsante per aggiungere il task */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleAddTask}
          style={{
            backgroundColor: '#4caf50',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          + Aggiungi Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
