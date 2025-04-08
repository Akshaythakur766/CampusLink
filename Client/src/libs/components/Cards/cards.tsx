import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './cards.css';


interface CardType{
  Total:number,
  present:number,
  className:string,
  teacherName:string,

}
const Cards = () => {
  const [data, setData] = useState<CardType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/percent');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cards">
      {Array.isArray(data) &&
       data.map((card, id) => (
        <div className="parentContainer" key={id}>
          <Card
            title={'Testing'}
            color={{
              backGround:'Green',
              boxShadow:'0px 10px 20px 0px #e0c6f5',
          }}
            barValue={(card.Total == 0) ? 0 : (Number(card.present) / Number(card.Total)) * 100}
            className={card.className}
            teacher={card.teacherName}
            present={card.present}
            total={card.Total}
            value={'23324'}
            png={'UilClipboardAlt'}
            series={[
              {
                  name:'sales',
                  data:[31,40,28,41,42,109,100],
              },
          ]}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
