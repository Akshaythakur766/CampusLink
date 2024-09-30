import axios from 'axios';
import { useEffect, useState } from 'react';
import CardTeach from '../Card/CardTeach';
import './cards.css';

const CardsTeach = () => {
  const [data, setData] = useState([]);
  const [expandedId, setExpandedId] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/percentteach');
        setData(response.data.list); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const formatDates = (dates) => {
    return dates.map(date => new Date(date).toLocaleString('default', {
      day: '2-digit',
      month: 'short',
      // year:'2-digit',
      // hour: '2-digit',
      // minute: '2-digit'
    }));
  };

  return (
    <div className="cards">
      {Array.isArray(data) && data.map((card, id) => (
        <div key={id} className="parentContainer">
          <CardTeach
            id={id}
            // title={card.name}
            className={card.name}
            otp={card.otp || 'N/A'} 
            Semester={card.semester}
            Course={card.course}
            value={card.otp || 'N/A'} 
            total={card.numberOfStudents}
            series={[
              {
                data: card.studentsPresent, 
              },
            ]}
            timeCategories={formatDates(card.dates)}
            expanded={expandedId === id}
            setExpanded={() => setExpandedId(expandedId === id ? null : id)}
          />
        </div>
      ))}
    </div>
  );
};

export default CardsTeach;
