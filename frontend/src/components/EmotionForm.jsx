import React, { useState } from 'react';
import { emotionAPI } from '../services/api';
import '../styles/EmotionForm.css';

const EmotionForm = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const result = await emotionAPI.submitEmotion(text);
      setResponse(result.data.emotionEntry);
      setText('');
      if (onSubmit) onSubmit();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit emotion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emotion-form-container">
      <h2>How are you feeling today?</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write about your feelings, thoughts, or experiences..."
          rows="6"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !text.trim()}>
          {loading ? 'Analyzing...' : 'Submit'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {response && (
        <div className="response-card">
          <h3>Analysis Result</h3>
          <div className="result-item">
            <strong>Detected Emotion:</strong>
            <span className={`emotion-badge emotion-${response.emotion}`}>
              {response.emotion.toUpperCase()}
            </span>
            <span className="confidence-score">
              Confidence: {Math.round(response.confidence)}%
            </span>
          </div>
          <div className="result-item">
            <strong>Suggested Activities:</strong>
            <div className="suggestions">
              {response.suggestions.map((suggestion, idx) => (
                <span key={idx} className="suggestion-tag">
                  {suggestion}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionForm;
