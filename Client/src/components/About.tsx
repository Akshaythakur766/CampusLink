import './About.css';
import PersonIcon from '@mui/icons-material/Person';
const About = () => {
  return (
    <div className="min-h-screen bg-slate-100 w-full text-black mt-16">
      <div className="container">
        <div className="logo-container">
          <div className="logo-wrapper">
            <img src={'/logo.png'} alt="" width={100} />
          </div>
          <div className="logo-wrapper">
            <img src={'/logo12.png'} alt="" width={200} />
          </div>
        </div>
        <p className="About-Heading">CampusLink - Free online Attendance Tracking and Library Management Software</p>
        <p className="About-Heading-3">CampusLink goes beyond mere attendance tracking. It enhances attendance security, imposes time limits for students to mark attendance, and displays library books relevant to their courses. This comprehensive approach enriches the platform's offerings, ensuring a secure and efficient academic experience for both faculty and students.</p>
      
        <div ><PersonIcon className='About-Icon'/></div>
        <div className='About-Content '>
       My name is Akshay Thakur, and my friend's name is Akshay Kumar. We are students who started building CampusLink because we observed that teachers spend a lot of time taking attendance in class, which reduces the time available for teaching. As a result, teachers often struggle to complete topics within the lecture time. To address this issue, we developed CampusLink to provide a simple and easy way for teachers to take and view attendance online. CampusLink allows teachers to generate attendance with a time limit and also provides access to the library books, enabling both students and teachers to check book availability.
        </div>
      </div>
    </div>
  );
};

export default About;
