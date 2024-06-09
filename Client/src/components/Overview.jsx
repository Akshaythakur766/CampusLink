import Cards from '../components/Cards/cards';
import './overview.css';
import greeting from '../assets/greeting.svg';
import Percentcard from './Card/percentcard';
import HEader from './HEader';
const Overview = () => {
  return (
    <div className='divClassName '>
        <HEader name={'DashBoard'}/>
      <div className='Main'>
        <div className="overview">
          <div className='greet' style={{ backgroundImage: `url(${greeting})`, width:390}}>
            <div className='text'>
            <p className='text-h'>Hello Greetings!</p>
            <p className='text-p'>Welcome {name}</p>
            <p className='text-p'>Here's what's happening !</p>
            </div>
            
          </div>
          <div className='percent'>
            <p className='percent-p'>PERCENTAGE </p>
          <Cards/>
          </div>
        </div>
        <div className="Notification">
          <Percentcard/>
        </div>
      </div>
    </div>
  );
};

export default Overview;
