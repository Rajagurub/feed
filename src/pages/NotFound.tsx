import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      
      <h1 className="text-6xl font-bold text-blue-600 mb-4">
        404
      </h1>

      <h2 className="text-2xl font-semibold mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600 text-center mb-6 max-w-md">
        The page you are looking for might have been removed,
        had its name changed, or is temporarily unavailable.
      </p>

      <div className="flex gap-4">
        <Button
          variant="contained"
          buttonText="Go Home"
          buttonFunction={() => navigate("/")}
        />

        <Button
          variant="outline"
          buttonText="Go Back"
          buttonFunction={() => navigate(-1)}
        />
      </div>

    </div>
  );
};

export default NotFound;