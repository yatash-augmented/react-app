import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; 
const Dashboard = ({ favorites }) => {
  const navigate = useNavigate();

  return (
    <div  className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/list')}>Go to List</button>
      <div className="favorites">
      <h2>Favorites</h2>
      <ul>
        {favorites.map(item => (
        
             <div key={item.id} className="list-item">
          
            <img src={item.thumbnailUrl} alt={item.title} />
               <p>{item.title}</p>
     
          </div>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Dashboard;
