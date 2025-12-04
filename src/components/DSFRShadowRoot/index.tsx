import ShadowRoot from "react-shadow/styled-components";
import DSFRStyleSheet from "!!raw-loader!../../../static/dsfr/dsfr.min.css";
import { useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";

export function DSFRShadowRoot({ children }: { children: React.ReactNode }) {
  const dsfrRootRef = useRef<HTMLDivElement | null>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (dsfrRootRef.current) {
      const dsfrRootElem = dsfrRootRef.current;
      dsfrRootElem.setAttribute("data-fr-theme", colorMode);
    }
  }, [dsfrRootRef, colorMode]);

  return (
    <ShadowRoot.main>
      <div ref={dsfrRootRef} className="root">
        <style type="text/css">{DSFRStyleSheet}</style>
        {children}
      </div>
    </ShadowRoot.main>
  );
}
