import React, { useState, useEffect } from 'react';
import { emotionAPI } from '../services/api';
import EmotionForm from './EmotionForm';
import EmotionChart from './EmotionChart';
import '../styles/Dashboard.css';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState(null);
  const [trendData, setTrendData] = useState(null);
  const [history, setHistory] = useState([]);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, [days]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');

    try {
      const [statsRes, trendRes, historyRes] = await Promise.all([
        emotionAPI.getStats(days),
        emotionAPI.getTrends(days),
        emotionAPI.getHistory(days),
      ]);

      setStats(statsRes.data.stats);
      setTrendData(trendRes.data.trendData);
      setHistory(historyRes.data.entries);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmotion = async (emotionId) => {
    if (window.confirm('Are you sure you want to delete this emotion entry?')) {
      try {
        await emotionAPI.deleteEmotion(emotionId);
        setHistory(history.filter(h => h._id !== emotionId));
        setError('');
      } catch (err) {
        setError('Failed to delete emotion entry');
      }
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <p>Track and understand your emotional patterns</p>
      </header>

      <div className="dashboard-content">
        {/* Emotion Form Section */}
        <section className="form-section">
          <EmotionForm onSubmit={() => fetchDashboardData()} />
        </section>

        {/* Controls */}
        <section className="controls">
          <label>
            View last:
            <select value={days} onChange={(e) => setDays(parseInt(e.target.value))}>
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
              <option value={365}>1 year</option>
            </select>
          </label>
        </section>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading data...</div>
        ) : (
          <>
            {/* Statistics Cards */}
            {stats && (
              <section className="stats-section">
                <h2>Your Emotional Statistics</h2>
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>Total Entries</h3>
                    <p className="stat-value">{stats.totalEntries}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Most Common Emotion</h3>
                    <p className={`stat-value emotion-${stats.mostCommonEmotion}`}>
                      {stats.mostCommonEmotion}
                    </p>
                  </div>
                  <div className="stat-card">
                    <h3>Time Period</h3>
                    <p className="stat-value">{stats.period}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Emotion Distribution */}
            {stats && Object.keys(stats.emotionFrequency).length > 0 && (
              <section className="chart-section">
                <h2>Emotion Distribution</h2>
                <div className="emotion-frequency">
                  {Object.entries(stats.emotionFrequency).map(([emotion, count]) => (
                    <div key={emotion} className={`emotion-bar emotion-${emotion}`}>
                      <span className="emotion-label">{emotion}</span>
                      <div className="bar">
                        <div
                          className="fill"
                          style={{
                            width: `${(count / Math.max(...Object.values(stats.emotionFrequency))) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="count">{count}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Emotion Trend Chart */}
            {trendData && trendData.length > 0 && (
              <section className="chart-section">
                <h2>Emotion Trends Over Time</h2>
                <EmotionChart 
                  data={trendData} 
                  type="line" 
                  emotions={trendData[0] ? Object.keys(trendData[0]).filter(k => k !== 'date') : []} 
                />
              </section>
            )}

            {/* Recent Entries */}
            {history.length > 0 && (
              <section className="history-section">
                <h2>Recent Entries</h2>
                <div className="entries-list">
                  {history.slice(0, 10).map((entry) => (
                    <div key={entry._id} className="entry-card">
                      <div className="entry-header">
                        <div className="emotions-container">
                          <span className={`emotion-badge emotion-${entry.emotion}`}>
                            {entry.emotion}
                          </span>
                          {entry.emotions && entry.emotions.length > 1 && (
                            <div className="other-emotions">
                              {entry.emotions.slice(1).map((em, idx) => (
                                <span key={idx} className={`emotion-badge-small emotion-${em.emotion}`}>
                                  {em.emotion} ({Math.round(em.confidence)}%)
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="entry-date">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </span>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteEmotion(entry._id)}
                          title="Delete this emotion entry"
                        >
                          ✕
                        </button>
                      </div>
                      {entry.confidence && (
                        <div className="confidence-info">
                          Detection Confidence: {Math.round(entry.confidence)}%
                        </div>
                      )}
                      <p className="entry-text">{entry.text.substring(0, 150)}...</p>
                      <div className="suggestions">
                        <strong>Suggestions:</strong>
                        {entry.suggestions.map((sugg, idx) => (
                          <span key={idx} className="suggestion-tag">
                            {sugg}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
