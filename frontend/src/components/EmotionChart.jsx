import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import '../styles/EmotionChart.css';

const EmotionChart = ({ data, type = 'line', emotions = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      processChartData();
    }
  }, [data]);

  const processChartData = () => {
    if (type === 'line' || type === 'bar') {
      // For daily trend data with separate emotion lines
      setChartData(Array.isArray(data) ? data : []);
    } else if (type === 'pie') {
      // For emotion frequency
      const processed = Object.entries(data).map(([emotion, count]) => ({
        name: emotion,
        value: count,
      }));
      setChartData(processed);
    }
  };

  const EMOTION_COLORS = {
    calm: '#4CAF50',
    happy: '#FFD700',
    energetic: '#FF6B6B',
    irritated: '#FF9800',
    sad: '#2196F3',
    depressed: '#9C27B0',
    'low energy': '#9E9E9E',
    anxious: '#F44336',
    anger: '#D32F2F',
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {emotions.map((emotion) => (
                <Line
                  key={emotion}
                  type="monotone"
                  dataKey={emotion}
                  stroke={EMOTION_COLORS[emotion] || '#8884d8'}
                  dot={{ fill: EMOTION_COLORS[emotion] || '#8884d8' }}
                  name={emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {emotions.map((emotion) => (
                <Bar key={emotion} dataKey={emotion} fill={EMOTION_COLORS[emotion] || '#8884d8'} name={emotion} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={EMOTION_COLORS[entry.name] || '#8884d8'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <div>No chart type specified</div>;
    }
  };

  return (
    <div className="chart-container">
      {chartData.length > 0 ? renderChart() : <p>No data available</p>}
    </div>
  );
};

export default EmotionChart;
