import Cards from './Cards/cards';
import './overview.css';
import Percentcard from './Card/percentcard';
import HEader from './HEader';
const Overview = () => {
  return (
    <div className='divClassName '>
        <HEader name={'DashBoard'}/>
      <div className='Main'>
        <div className="overview">
          <div className='greet' style={{ backgroundImage: `url(/greeting.svg)`, width:390}}>
            <div className='text'>
            <p className='text-h'>Hello Greetings!</p>
            <p className='text-p'>Welcome {"User"}</p>
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
