// components
import { useAppSelector } from "@src/hooks/useRedux";
import Data from "./Data";
import ScrollContainer from "@src/ui/ScrollContainer";
import PullBar from "./PullBar";
// hooks
import { useState } from "react";
// utils
import { isViewMaximize } from "@src/utils/editor";

const PAGES = ["data", "layout"] as const;
const PageWidth = 320 / PAGES.length;

type Pages = typeof PAGES[number];

function RightBar() {
  const [currentPage, setCurrentPage] = useState<Pages>(PAGES[0]);
  const barsStatus = useAppSelector((state) => state.editor.barsStatus);

  return (
    <div
      className={`relative flex flex-col w-right-bar border-l-2 border-gray-400 ${
        barsStatus.right ? "mr-0" : "-mr-right-bar"
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
        {currentPage === "data" ? <Data /> : <>layout</>}
      </ScrollContainer>
      {isViewMaximize(barsStatus) && <PullBar bar="right" />}
    </div>
  );
}

export default RightBar;
