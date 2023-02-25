// hooks
import { useState } from "react";
import BarWrapper from "@src/features/editor/containers/BarWrapper";
import { ScrollContainer } from "@src/common/components";
import { PAGES, PageWidth, Pages } from "./data";

interface IRightBar {
  isOpen: boolean;
}

function RightBar({ isOpen }: IRightBar) {
  const [currentPage, setCurrentPage] = useState<Pages>(PAGES[0]);

  return (
    <BarWrapper
      bar="right"
      className={`relative flex flex-col w-right-bar h-full border-l-2 border-gray-400 ${
        isOpen ? "mr-0" : "-mr-right-bar"
      } bg-white transition-all`}
    >
      <header>
        <div className="flex items-center">
          {PAGES.map((page) => (
            <div
              key={page}
              className={`flex-1 py-2 px-1 text-center capitalize ${
                currentPage === page ? "opacity-100" : "opacity-40"
              } cursor-pointer transition-opacity hover:opacity-100`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </div>
          ))}
        </div>
        <div className="relative w-full h-1.5 border-b border-gray-300">
          <div
            className="absolute top-0 flex justify-center h-full transition-all"
            style={{
              width: PageWidth,
              left: PageWidth * PAGES.indexOf(currentPage),
            }}
          >
            <div className="w-5/6 h-full bg-blue-500 rounded-t" />
          </div>
        </div>
      </header>
      <ScrollContainer className="flex-1 mt-3">
        {currentPage === "data" ? <>data</> : <>layout</>}
      </ScrollContainer>
    </BarWrapper>
  );
}

export default RightBar;
