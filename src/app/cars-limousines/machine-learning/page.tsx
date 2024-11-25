'use client';

import React, { useState } from 'react';
import Modal from './Modal'; // Assurez-vous de pointer vers le bon chemin de fichier
import { getPredictedTotalPrice } from '@/services/bi-dashboard'; // Importez votre service

const PricePredictionComponent: React.FC = () => {
  const [futureDate, setFutureDate] = useState<string>('');
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handlePredict = async () => {
    try {
      const price = await getPredictedTotalPrice(futureDate);
      setPredictedPrice(price);
      setIsModalOpen(true);
    } catch (err) {
      setPredictedPrice(null);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h2 className="subtitle">Prediction for a future date</h2>
      <p className="description">
        Enter a date below to predict the total price based on historical data. The results will be displayed in a modal window.
      </p>
      <div className="input-container">
        <input
          className="input"
          type="date"
          value={futureDate}
          onChange={(e) => setFutureDate(e.target.value)}
        />
        <button className="button" onClick={handlePredict}>
          Predict
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`Prediction results for ${futureDate}`}
      >
        <p className="description">
          Here is the predicted total price based on the selected date:
        </p>
        {predictedPrice !== null ? (
        <center> <p className="result">{predictedPrice}  CHF</p></center> 
        ) : (
          <p>No prediction available. Please try again.</p>
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
        .result {
          font-size: 1.5rem;
          color: #007bff;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default PricePredictionComponent;
