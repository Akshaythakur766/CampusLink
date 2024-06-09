import { useState } from 'react';
import './Card.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div layout> {/* Use motion.div with layout prop */}
      {expanded ? (
        "Expanded"
      ) : (
        <CompactCard param={props}  />
      )}
    </motion.div>
  );
};

// Compact Card
function CompactCard({ param }) {
  const Png = param.png;

  return (
    <div
      className="CompactCard"
      style={{border:' 1px solid #ccc',
      color:'#000',
        background: 'radial-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%)'
        // background:' linear-gradient(60deg, #abecd6 0%, #fbed96 100%)'
        
      }}
    ><div className='left-custom'>
      
        <div className="radialBar down mt-2  ml-3 ">
          <CircularProgressbar
            value={param.barValue}
            text={`${(param.barValue).toFixed(1)}%`}
          />
        </div>
        <div className="text-start d-flex classname ">
          <span>{param.className}</span>
        </div>
      </div>
      <div className="detail-right">
        <div className='up'>
          <Png />
          {/* <span>${param.value}</span> */}
          <span className='mb-2'>Present:{param.present}</span><br />
          <span className='mt-2'>Total:{param.total}</span><br />
        </div>
        <div className='down mb-2'>
          <span>{param.teacher}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
