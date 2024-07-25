
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import './piechart.css'; 
const Api = "http://localhost:5164/get_all_assignstatus";

const PieChartsAssignment = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [statusCounts, setStatusCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPieChartData();
  }, []);

  const fetchPieChartData = async () => {
    try {
      const response = await fetch(Api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventID: '1001',
          addInfo: {},
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.result.rStatus === 0) {
        const statusMessages = data.result.rData.rMessage || [];
        const counts = countStatusMessages(statusMessages);

        setStatusCounts(counts);

        const labels = Object.keys(counts);
        const dataCounts = Object.values(counts);

        setChartData({
          labels,
          datasets: [{
            data: dataCounts,
            backgroundColor: ['#36eb7f', '#36A2EB', '#eb3648'], // Example colors
          }],
        });
      } else {
        setError(data.result.rData.rMessage || 'Unknown error occurred');
      }
    } catch (err) {
      setError('Error fetching data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const countStatusMessages = (messages) => {
    const statusCounts = {};
    messages.forEach(statusArray => {
      statusArray.forEach(status => {
        const statusKey = status.toString();
        if (statusCounts[statusKey]) {
          statusCounts[statusKey] += 1;
        } else {
          statusCounts[statusKey] = 1;
        }
      });
    });
    return statusCounts;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card">
      <div className="chart-container">
        <div className="chart">
          <Pie data={chartData} />
        </div>
        <div className="status-counts">
          <h3>Status Counts</h3>
          <ul>
            {Object.keys(statusCounts).map(status => (
              <li key={status}>
                {status}: {statusCounts[status]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PieChartsAssignment;
