import HEader from "./HEader";
import { useLocation } from "react-router-dom";

const OtpAttendance = () => {
  const location = useLocation();
  const { otp } = location.state || {};

  return (
    <div>
      <HEader name="Take Attendance" />
      <div className="percent">
        <div className="percent-p">otp: {otp}</div>
      </div>
    </div>
  );
};

export default OtpAttendance;
