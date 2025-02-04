// import secnd from "../assets/secnd.jpg";
// import third from "../assets/third.jpg";
import { Link } from "react-router-dom";

function Services() {
  return (
    <>
      <div className=" relative flex flex-col justify-center items-center  bg-violet-500 bg-opacity-4  rounded-lg min-h-screen m-4">
        <h2 className="font-font2 text-4xl m-5 text-center ">
          OUR BEST FEATURES
        </h2>
        <p className="font-font1 text-sm  mb-5 text-light px-2 text-center">
          Unlocking Campus Potential: CampusLink's Core Offerings
        </p>

        {/* main cards  */}
        <div className="flex  max-md:flex-wrap gap-5 max-md:m-20 max-md:h-auto  m-1 ">
          <div className="md:max-w-sm bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-md:w-full">
            <Link
              to="#"
              className="flex items-center rounded-lg border justify-center m-4 max-md:hidden"
            >
              <img className="  rounded-lg " src={'feature1.jpg'} alt="feature-1" />
            </Link>
            <div className="p-5 ml-1">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Online Live Attendance
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Effortlessly monitor student attendance in real-time. Faculty
                can easily track attendance, while students mark their presence
                with a click.
              </p>
            </div>
          </div>

          {/* 2 */}
          <div className="md:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-md:w-full">
            <Link
              to="#"
              className="flex items-center rounded-lg border justify-center m-4 max-md:hidden"
            >
              <img className="rounded-lg" src={'feature2.jpg'} alt="feature-2" />
            </Link>
            <div className="p-5 ml-1">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Student/Faculty Portal
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Access all tools from any device. Students can view class
                schedules and attendance records, while faculty manage class
                rosters and track student engagement.
              </p>
            </div>
          </div>

          {/* 3 */}
          <div className="md:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  max-md:w-full">
            <Link
              to="#"
              className="flex items-center rounded-lg border justify-center m-4 max-md:hidden"
            >
              <img className="rounded-lg" src={'feature3.jpg'} alt="feature-3" />
            </Link>
            <div className="p-5 ml-1">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Mobile Compatibility
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Stay connected on the go. Access our platform seamlessly from
                your smartphone or tablet, ensuring learning never stops.
              </p>
            </div>
          </div>
        </div>

        {/* upper section cards */}
        <div className="sm:flex md:-top-[10%] max-md:-top-[10%] sm:right-20 sm:absolute sm:gap-2 hidden ">
          <div className="max-w-sm p-2 bg-transparent rounded-xl border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              src={'first.jpg'}
              alt="1"
              className="opacity-80 md:size-32 max-md:size-20"
            />
          </div>
          <div className="max-w-sm p-2 bg-transparent rounded-xl border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              src={'first.jpg'}
              alt="1"
              className="opacity-80 md:size-32  max-md:size-20 rounded-xl"
            />
          </div>
          <div className="max-w-sm p-2 bg-transparent rounded-xl border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              src={'first.jpg'}
              alt="1"
              className="opacity-80 md:size-32 max-md:size-20"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
