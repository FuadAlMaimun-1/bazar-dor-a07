import React from "react";

const loading = () => {
  return (
    <div>
      <div className="flex items-center justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>
      </div>
    </div>
  );
};

export default loading;
