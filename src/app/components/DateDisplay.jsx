"use client";

import React, { useEffect, useState } from "react";

const DateDisplay = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();

    setDate(
      today.toLocaleDateString("bn-BD", {
        dateStyle: "full",
      }),
    );
  }, []);

  return <span className="mt-1 text-xs font-medium text-gray-600">{date}</span>;
};

export default DateDisplay;
