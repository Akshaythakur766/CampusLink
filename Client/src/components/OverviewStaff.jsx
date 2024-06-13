import './OverviewTeache.css'
import greeting from '../assets/greeting.svg';
import HEader from './HEader';
const OverviewStaff = () => {
  return (
    <div className='box'>
  <div className='divclassName'>
   <HEader name={"Dashboard"}/>
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
      <p className='percent-p'>Teacher </p>
          
          </div>
      </div>
      <div className="Notification">
         Notification
      </div>
    </div>
    </div>
    </div>
  )
}

export default OverviewStaff