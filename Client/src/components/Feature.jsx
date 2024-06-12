import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import './Feature.css';

const FeatureCard = ({ name, Icon, data }) => {
  return (
    <div className="Feature-card">
      <Icon className="feature-icon" />
      <p className='Feature-name'>{name}</p>
      {data && <p className="feature-data">{data}</p>}
    </div>
  );
};

const Feature = () => {
  return (
    <div className="min-vh-100 bg-light w-100 text-dark mt-5">
      <div className="Feature-card-1">
        ONLINE ATTENDANCE TRACKING, LIBRARY MANAGEMENT <br />FEATURES
      </div>
      <div className="d-flex flex-wrap justify-content-center gap-3 py-2">
        <FeatureCard 
          Icon={CalendarMonthIcon}
          name="Online Live Attendance"
          data="Effortlessly monitor student attendance in real-time. Faculty can easily track attendance, while students mark their presence with a click."
        />
        <FeatureCard 
          Icon={LibraryBooksIcon}
          name="Library Books"
          data="Easily see the books available in the library based on the courses. Also provides a list of books based on the subjects in which students and teachers are enrolled."
        />
        <FeatureCard 
          Icon={SchoolIcon}
          name="Student/Faculty Portal"
          data="Access all tools from any device. Students can view class schedules and attendance records, while faculty manage class rosters and track student engagement."
        />
        <FeatureCard 
          Icon={SecurityIcon}
          name="Enhanced Security"
          data="Teachers generate an OTP, share it with students present in class, enabling them to mark attendance using the OTP."
        />
        <FeatureCard 
          Icon={AccessTimeFilledIcon}
          name="Time Limit"
          data="When a teacher generates attendance, they can set a time limit within which students must mark their attendance."
        />
        <FeatureCard 
          Icon={MobileFriendlyIcon}
          name="Mobile Compatibility"
          data="Stay connected on the go. Access our platform seamlessly from your smartphone or tablet, ensuring learning never stops."
        />
      </div>
    </div>
  );
};

export default Feature;
