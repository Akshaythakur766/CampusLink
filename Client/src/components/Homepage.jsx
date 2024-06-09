import Hero from "../components/Hero";
import Services from "../components/Services";
import Registration from "../components/Registration";
import { useState } from "react";

const Homepage = () => {
  const [elementst, setElementst] = useState(null);
  const [focust, setFocust] = useState(null);
  
  // function to get scrollElemet
  function hello(elementst) {
    return setElementst(elementst);
  }

  // function for Focus element

  function focus(focust) {
    return setFocust(focust);
  }

  console.log(focust);

  //function to scroll and focus
  function scrollToRegistration() {
    
    if (elementst) {
      elementst.current.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => focust.current.focus(), 400);
    }
  }

  return (
    <>
      <Hero scrollToRegistration={scrollToRegistration} />

      <Services />
      <Registration data={hello} focus={focus} />
    </>
  );
};

export default Homepage;
