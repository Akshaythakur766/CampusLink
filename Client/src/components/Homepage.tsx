import Hero from "./Hero";
import Services from "./Services";
import Registration from "./Registration";
import { useState } from "react";

const Homepage = () => {
  const [elementst, setElementst] = useState<any>(null);
  const [focust, setFocust] = useState<any>(null);
  
  // function to get scrollElemet
  function hello(elementst:any) {
    return setElementst(elementst);
  }

  // function for Focus element

  function focus(focust:any) {
    return setFocust(focust);
  }

  console.log(focust);

  //function to scroll and focus
  function scrollToRegistration() {
    
    if (elementst && elementst?.current) {
      elementst?.current.scrollIntoView({ behavior: "smooth" });
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
