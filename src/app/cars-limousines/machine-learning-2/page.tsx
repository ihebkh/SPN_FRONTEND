'use client';

import React, { useState } from 'react';
import { optimizeFleet } from '@/services/bi-dashboard'; // Assurez-vous de pointer vers le bon chemin de fichier
import Modal from './Modal'; // Assurez-vous de pointer vers le bon chemin de fichier

const FleetOptimizationComponent: React.FC = () => {
  const [futureDate, setFutureDate] = useState<string>('');
  const [optimizationResults, setOptimizationResults] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async () => {
    try {
      const results = await optimizeFleet(futureDate);
      setOptimizationResults(results);
      setIsModalOpen(true);
      setError(null);
    } catch (err) {
      setError('Failed to optimize fleet');
      setIsModalOpen(true);
      setOptimizationResults(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h2 className="subtitle">Prediction for a future date</h2>
      <p className="description">
        Select a date below to predict the total price and optimize fleet usage based on the projected demand.
      </p>
      <div className="input-container">
        <label className="label">Select a date:</label>
        <input
          className="input"
          type="date"
          value={futureDate}
          onChange={(e) => setFutureDate(e.target.value)}
        />
        <button className="button" onClick={handleOptimize}>
          Predict
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`Optimization results for ${futureDate}`}
      >
        <p className="description">
          Here is the recommended fleet size based on the predicted demand:
        </p>
        {optimizationResults ? (
          <ul className="result-list">
            <li>
              <strong>Predicted Passenger Count:</strong> {optimizationResults.predicted_passenger_count}
            </li>
            <li>
              <strong>Recommended Fleet Size:</strong> {optimizationResults.recommended_fleet_size}
            </li>
            <li>
              <strong>Adjusted Fleet Size (85% efficiency):</strong> {optimizationResults.adjusted_fleet_size}
            </li>
          </ul>
        ) : (
          <p>{error}</p>
        )}
      </Modal>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          height: 100vh;
          background-color: #f4f4f9;
          padding: 20px;
        }
        .subtitle {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 10px;
          text-align: center;
        }
        .description {
          font-size: 1rem;
          color: #555;
          margin-bottom: 20px;
          text-align: center;
          max-width: 600px;
        }
        .input-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 30px;
        }
        .label {
          font-size: 1rem;
          color: #333;
          margin-bottom: 5px;
          text-align: left;
          width: 100%;
          max-width: 300px;
        }
        .input {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 16px;
          width: 100%;
          max-width: 300px;
          margin-bottom: 10px;
        }
        .button {
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 5px;
          border: none;
          background-color: #555;
          color: white;
          cursor: pointer;
        }
        .button:hover {
          background-color: #333;
        }
        .result-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .result-list li {
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
};

export default FleetOptimizationComponent;
