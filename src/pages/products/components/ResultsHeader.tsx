import React from "react";

interface ResultsHeaderProps {
  currentPage: number;
  itemsPerPage: number;
  totalResults: number;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  currentPage,
  itemsPerPage,
  totalResults,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="bg-[#232F3E] text-white py-2 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm">
          {totalResults > 0
            ? `${startIndex}-${endIndex} of ${totalResults} results`
            : "No results"}
        </p>
      </div>
    </div>
  );
};

export default ResultsHeader;
