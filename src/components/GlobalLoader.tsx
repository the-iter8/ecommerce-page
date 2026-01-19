import React from "react";
import { useAppSelector } from "@/hooks/redux";

const GlobalLoader: React.FC = () => {
  const isLoading = useAppSelector((state) => state.global.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-40">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        {/* <p className="text-lg font-medium text-white">Loading...</p> */}
      </div>
    </div>
  );
};

export default GlobalLoader;
