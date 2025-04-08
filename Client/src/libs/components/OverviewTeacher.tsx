import './OverviewTeache.css'
import HEader from './HEader';
import CardsTeach from './Cards/CardsTeach';
export const OverviewTeacher = () => {
  return (
    <div className='box'>
  <div className='divclassName'>
   <HEader name={"Dashboard"}/>
    <div className='Main'>
      <div className="overview">
      <div className='greet' style={{ backgroundImage: `url(/greeting.svg)`, width:390}}>
            <div className='text'>
            <p className='text-h'>Hello Greetings!</p>
            <p className='text-p'>Welcome User</p>
            <p className='text-p'>Here's what's happening !</p>
            </div>
            
          </div>
      <div className='percent'>
      <p className='percent-p'>ClASS </p>
          <CardsTeach/>
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

export default OverviewTeacher