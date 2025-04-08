import { Link } from "react-router-dom";


export const  Footer=() =>{
  const year = new Date().getFullYear();
  return (
    <>
      <>
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4 ">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="space-y-3 ">
              <span className="text-xl font-bold dark:text-white ">
                Get more updates...
              </span>
              <p className="text-gray-500 ">
                Stay informed with the latest news, updates, and insights from
                Cyberlink. Enter your email below to subscribe to our newsletter
                and receive regular updates delivered straight to your inbox.
                Join our community today and stay ahead of the curve with
                Cyberlink.
              </p>
              <div>
                <div className=" w-full mr-3 formkit-field">
                  <div className="flex items-center max-sm:flex-col justify-start mt-4 ">
                    {/* <input
                      id="email"
                      className="formkit-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block max-sm:w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-12 w-1/3"
                      name="email_address"
                      aria-label="Email Address"
                      placeholder="Your email address..."
                      required=""
                      type="email"
                    />
                    <button className="buttonCol ml-4 max-sm:mt-2 rounded-xl">
                      Subscribe
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
              <Link
                to="/"
                className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
              >
                <img src={'/logo.png'} className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  CampusLink
                </span>
              </Link>
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                  <Link to="#" className="hover:underline me-4 md:me-6">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline me-4 md:me-6">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline me-4 md:me-6">
                    Licensing
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © {year}{" "}
              <Link to="/" className="hover:underline">
                CampusLink™
              </Link>
              . All Rights Reserved.
            </span>
          </div>
        </footer>
      </>
    </>
  );
}

export default Footer;
