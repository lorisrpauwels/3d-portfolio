import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";
import '../pages/Home.jsx';

const HomeInfo = ({ currentStage }) => {

  if (currentStage === 1)
    return (
  
      <h1 id="htest" className='sm:text-xl sm:leading-snug text-center neo-brutalism-black py-0 px-8 font-semibold text-black mx-5'>
        Hi, I'm
        <span className='font-bold mx-2 text-blue-500'>Loris Pauwels</span>
        👋
        <br />
        Click and drag to explore my little universe
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          I've had some awesome work experiences <br /> and picked up many skills along the way
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn'>
          <p className="text-blue-500">Learn more</p> 
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          I've been part of multiple projects over the years. <br /> Curious about my impact ?
        </p>

        <Link to='/projects' className='neo-brutalism-white neo-btn'>
        <p className="text-blue-500">Visit my portfolio</p> 
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
      <p className='font-medium sm:text-xl text-center'>
        Need a new intern ? <br/> I'm just a few keystrokes away
      </p>

      <Link to='/contact' className='neo-brutalism-white neo-btn'>
      <p className="text-blue-500">Let's Talk</p> 
        <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
      </Link>
    </div>
    );
  }

  return null;
};

export default HomeInfo;
