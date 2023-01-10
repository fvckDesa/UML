// types
import { ReactNode, useEffect, useState } from "react";
// hooks
import { createContext, useContext, useRef } from "react";
// fullscreen
import screenfull from "screenfull";

interface IProps {
  children: ReactNode;
}

export interface FullscreenContext {
  fullscreenRef: (element: Element | null) => void;
  readonly element: Element | undefined;
  readonly isFullscreen: boolean;
  readonly isEnabled: boolean;
  requestFullscreen: (options?: FullscreenOptions) => Promise<void>;
  exitFullscreen: () => Promise<void>;
  toggleFullscreen: (options?: FullscreenOptions) => Promise<void>;
}

const Context = createContext<FullscreenContext | null>(null);

function FullscreenProvider({ children }: IProps) {
  const ref = useRef<Element>(null);
  const forceRerender = useState<Event | null>(null);

  useEffect(() => {
    function force(e: Event) {
      forceRerender[1](e);
    }
    screenfull.on("change", force);
    return () => screenfull.off("change", force);
  }, []);

  function fullscreenRef(element: Element | null) {
    (ref as any).current = element;
  }

  function requestFullscreen(options?: FullscreenOptions) {
    if (!ref.current) {
      return Promise.reject(new Error("Ref is not assigned"));
    }
    if (!screenfull.isEnabled) {
      return Promise.reject(new Error("Fullscreen is not enabled"));
    }
    return screenfull.request(ref.current, options);
  }

  function exitFullscreen() {
    return screenfull.exit();
  }

  function toggleFullscreen(options?: FullscreenOptions) {
    if (!ref.current) {
      return Promise.reject(new Error("Ref is not assigned"));
    }
    if (!screenfull.isEnabled) {
      return Promise.reject(new Error("Fullscreen is not enabled"));
    }

    return screenfull.toggle(ref.current, options);
  }

  return (
    <Context.Provider
      value={{
        element: screenfull.element,
        isFullscreen: screenfull.isFullscreen,
        isEnabled: screenfull.isEnabled,
        fullscreenRef,
        requestFullscreen,
        exitFullscreen,
        toggleFullscreen,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default FullscreenProvider;

export const useFullscreen = () => useContext(Context) as FullscreenContext;
