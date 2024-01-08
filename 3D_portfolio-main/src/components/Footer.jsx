import { Link } from "react-router-dom";

import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className='footer font-poppins'>
      <hr className='border-slate-200' />

      <div className='footer-container'>
        <p>
          © 2023 <strong>Loris Pauwels</strong>. All rights reserved.
        </p>
        <div className='flex gap-3 justify-center items-center'>
          {socialLinks.map((link) => (
            (link.name =="GitHub")?<Link key={link.name} to={link.link} target='_blank'>
            <img
              src={link.iconUrl} 
              alt={link.name}
              className='w-10 h-10 object-contain'
            />
          </Link> :
            <Link key={link.name} to={link.link} target='_blank'>
              <img
                src={link.iconUrl} 
                alt={link.name}
                className='w-6 h-6 object-contain'
              />
            </Link>
          ))}
        </div>
          <p>
            3D modelisation by : silvercrow101, victory_mirosya & me
          </p>
      </div>
    </footer>
  );
};

export default Footer;
