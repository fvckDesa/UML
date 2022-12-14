// components
import SidebarClass from "./SidebarClass";
import SidebarElements from "./SidebarElements";
import ScrollContainer from "@src/ui/ScrollContainer";
// hooks
import { useState } from "react";

const PAGES = ["elements", "class"] as const;
const PageWidth = 320 / PAGES.length;

type Pages = typeof PAGES[number];

function Sidebar() {
  const [currentPage, setCurrentPage] = useState<Pages>(PAGES[0]);

  return (
    <div
      className={`absolute top-0 ${
        false ? "right-0" : "-right-80"
      }  flex-1 flex flex-col w-80 h-full border-l-2 border-gray-400 bg-white transition-all`}
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
        <div className="relative w-full h-1 bg-gray-300">
          <div
            className="absolute top-0 h-full bg-blue-500 transition-all"
            style={{
              width: PageWidth,
              left: PageWidth * PAGES.indexOf(currentPage),
            }}
          />
        </div>
      </header>
      <ScrollContainer className="flex-1 mt-3">
        {currentPage === "class" ? <SidebarClass /> : <SidebarElements />}
      </ScrollContainer>
    </div>
  );
}

export default Sidebar;
