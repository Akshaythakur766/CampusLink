

const Hero = ({ scrollToRegistration }:{scrollToRegistration:()=>void}) => {

  return (
    <>
      <section
        id="home"
        className="w-full flex max-sm:flex-col h-auto xl:flex-row "
      >
        <div className="relative flex flex-col justify-start items-start sm:flex-col sm:justify-center w-full sm:w-3/5  xl:m-20 sm:m-10 max-xl:p-2 pt-28 max-sm:h-2/3 max-sm:mt-10 ">
          <p className="text-sm font-font1 mb-5 ml-1 text-secondary max-sm:mt-20 ">
            Streamlined. Seamless. Smart.
          </p>
          <h1 className="font-font2 text-5xl max-lg:text-3xl  xl:whitespace-nowrap leading-16 ">
            <span>
              Welcome to the Future
              <br />
            </span>
            of Education with
            <br />
            <span className="font-font3 text-5xl max-lg:text-3xl">
              {" "}
              Campuslink
            </span>
          </h1>
          <p className="text-md text-text opacity-60 mb-5 mt-1 ml-1 ">
            Say goodbye to the hassle of manual attendance and outdated library
            systems. Our project brings you the latest in technology, empowering
            students, faculty, and administrators with tools that are efficient,
            intuitive, and powerful.
          </p>

          <button
            className="rounded-xl buttonCol"
            onClick={() => scrollToRegistration()}
          >
            Get Started
          </button>
        </div>
        <div className=" flex justify-end  sm:w-2/5 max-md:w-full max-sm:h-1/3 max-sm:my-10  sm:flex-col sm:justify-center sm:m-10 ">
          <img src={'/secnd.jpg'} alt="" className="h-auto w-auto rounded-md" />
        </div>
      </section>
    </>
  );
};

export default Hero;
