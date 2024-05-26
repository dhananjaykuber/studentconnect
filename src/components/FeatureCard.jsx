// src/components/FeatureCard.js

import React from "react";

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="rounded-lg border border-gray-300 p-10 shadow-md dark:border-gray-700">
      <div className="mb-2 flex items-center">
        {icon}
        <h3 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
