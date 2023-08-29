import React from 'react';
import HeroImage from '../assets/hero-image.svg';
import Button from '../components/Button';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Student Connect
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Igniting Connections Among Students
          </h2>
          <p className="text-sm mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus iste
            repellendus reprehenderit possimus saepe ex rerum expedita
            praesentium molestias commodi! Lorem ipsum dolor sit amet
            consectetur, adipisicing elit!
          </p>
          <Button
            label={'Join Us'}
            leftIcon={<FaSignInAlt className="text-lg" />}
            onclick={() => navigate('/signup')}
          />
        </div>
        <img
          src={HeroImage}
          alt="hero-image"
          className="mt-10 md:mt-0 w-[80%] md:w-2/6"
        />
      </div>
    </div>
  );
};

export default Home;
