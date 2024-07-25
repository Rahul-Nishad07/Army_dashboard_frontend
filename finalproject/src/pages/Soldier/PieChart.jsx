import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './piechart.css'; 
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Api = "http://localhost:5164/get_all_missionstatus";

const PieCharts = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to check if component is still mounted

    const fetchMissionStatusData = async () => {
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

        if (!isMounted) return; // If component is unmounted, cancel the state update

        const data = await response.json();
        console.log(data);

        if (data.result.rStatus === 0) {
          let statusMessages = data.result.rData.rMessage || [];

          // Flatten the nested array
          statusMessages = statusMessages.flat();

          // Filter out empty strings
          statusMessages = statusMessages.filter(message => message[0] !== '');

          if (statusMessages.length === 0) {
            setError('No Status');
            return;
          }

          // Count occurrences
          const counts = countStatusMessages(statusMessages);

          const labels = Object.keys(counts);
          const dataCounts = Object.values(counts);

          setChartData({
            labels,
            datasets: [{
              data: dataCounts,
              backgroundColor: labels.map(label => getColor(label)), // Use the custom colors
            }],
          });
        } else {
          setError(data.result.rData.rMessage || 'Unknown error occurred');
        }
      } catch (err) {
        if (isMounted) setError('Error fetching data: ' + err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMissionStatusData();

    // Cleanup function to set isMounted to false
    return () => {
      isMounted = false;
    };
  }, []);

  const countStatusMessages = (messages) => {
    const statusCounts = {};
    messages.forEach(statusArray => {
      const status = statusArray[0]; // Assuming each status is the first item in the array
      if (statusCounts[status]) {
        statusCounts[status] += 1;
      } else {
        statusCounts[status] = 1;
      }
    });
    return statusCounts;
  };

  const getColor = (status) => {
    const colors = {
      'Accepted': '#36eb7f',
      'Submitted': '#36A2EB',
      'Rejected': '#eb3648'
    };
    return colors[status] || '#999999'; // Default color if status is not recognized
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
            {chartData.labels.map((status, index) => (
              <li key={index}>
                {status}: {chartData.datasets[0].data[index]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PieCharts;
