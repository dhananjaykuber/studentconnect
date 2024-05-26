// src/pages/Home.js

import React from "react";
import HeroImage from "../../assets/hero-image.svg";
import Button from "../../components/Button";
import { FaSignInAlt, FaUsers, FaChartBar, FaCode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import FeatureCard from "../../components/FeatureCard";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div>
        <div className="flex flex-col items-center md:flex-row">
          <div className="flex-1">
            <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Student Connect
            </h1>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
              Igniting Connections Among Students
            </h2>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Student Connect is a transformative web application designed to
              enhance student collaboration, communication. By igniting
              connections among students, the platform serves as a centralized
              hub where individuals exchange ideas, and support each other's
              learning journey. Additionally, the platform offers tools for data
              visualization, code editor. With Student Connect, students have
              the opportunity to engage deeply with their peers, share
              knowledge, and thrive in their academic endeavors.
            </p>
            <Button
              label={"Join Student Connect"}
              radius={"full"}
              leftIcon={<FaSignInAlt className="text-lg" />}
              onclick={() => navigate("/signup")}
            />
          </div>
          <img
            src={HeroImage}
            alt="hero-image"
            className="mt-10 w-[80%] md:mt-0 md:w-2/6"
          />
        </div>

        <div className="mt-28 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Features
          </h2>
          <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            Discover the powerful features that make Student Connect the
            ultimate platform for student collaboration and success.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <FeatureCard
            title="Collaboration"
            description="Engage deeply with peers through collaborative tools."
            icon={
              <FaUsers className="text-2xl text-gray-900 dark:text-white" />
            }
          />
          <FeatureCard
            title="Data Visualization"
            description="Utilize advanced data visualization tools."
            icon={
              <FaChartBar className="text-2xl text-gray-900 dark:text-white" />
            }
          />
          <FeatureCard
            title="Code Editor"
            description="Write and share code with an integrated code editor."
            icon={<FaCode className="text-2xl text-gray-900 dark:text-white" />}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
