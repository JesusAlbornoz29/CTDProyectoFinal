import { useState, useEffect } from "react";

export const Alerts = ({ text, bgColorClass, duration, onDismiss }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      if (onDismiss) {
        onDismiss();
      }
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onDismiss]);

  return visible ? (
    <div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 alert ${bgColorClass} p-4 rounded shadow-md z-[10000] sm:w-1/2 w-3/4 text-white flex justify-center`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{text}</span>
    </div>
  ) : null;
};
