"use client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  createContext,
  useMemo,
} from "react";
import styled, { css } from "styled-components";

export const StyledIFrame = styled.iframe<{
  $isOpen: boolean;
  $isVisible: boolean;
}>`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 999;
  // Fix to avoid white box when dark mode is enabled
  color-scheme: normal;
  border: none;
  ${({ $isOpen }) =>
    $isOpen
      ? css`
          height: 600px;
          width: 450px;
        `
      : css`
          height: 60px;
          width: 60px;
        `}
  ${({ $isVisible }) =>
    $isVisible
      ? css`
          transform: translateX(0);
        `
      : css`
          transform: translateX(300%);
        `}
  transition: transform 0.3s ease;

  @media screen and (max-width: 450px) {
    bottom: 10px;
    right: 10px;
    ${({ $isOpen }) => $isOpen && "width: calc(100% - 20px);"}
  }
`;

interface BALWidgetContextType {
  open: () => void;
  close: () => void;
  navigate: (to: string) => void;
  showWidget: () => void;
  hideWidget: () => void;
  isBalWidgetOpen: boolean;
  isBalWidgetReady: boolean;
  isWidgetVisible: boolean;
}

export const BALWidgetContext = createContext({
  open: () => {},
  close: () => {},
  navigate: (to: string) => {},
  showWidget: () => {},
  hideWidget: () => {},
  isBalWidgetOpen: false,
  isBalWidgetReady: false,
  isWidgetVisible: true,
} as BALWidgetContextType);

interface BALWidgetProviderProps {
  children: React.ReactNode;
}

const ALLOWED_URL_PROTOCOLS = ["http:", "https:", "mailto:"];
const ALLOWED_TARGETS = ["_blank", "_self", "_parent", "_top"];

// Only allow http(s)/mailto URLs to prevent javascript:/data: XSS via window.open
function sanitizeNavigateTo(content: unknown): {
  href: string;
  target: string;
} | null {
  if (!content || typeof content !== "object") {
    return null;
  }
  const { href, target } = content as { href?: unknown; target?: unknown };
  if (typeof href !== "string") {
    return null;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(href, window.location.origin);
  } catch {
    return null;
  }

  if (!ALLOWED_URL_PROTOCOLS.includes(parsedUrl.protocol)) {
    return null;
  }

  const safeTarget =
    typeof target === "string" && ALLOWED_TARGETS.includes(target)
      ? target
      : "_blank";

  return { href: parsedUrl.toString(), target: safeTarget };
}

export function BALWidgetProvider({ children }: BALWidgetProviderProps) {
  const { siteConfig } = useDocusaurusContext();
  const balWidgetRef = useRef<HTMLIFrameElement>(null);
  const transitionTimeout = useRef<NodeJS.Timeout>(null);
  const [isWidgetDisplayed, setIsWidgetDisplayed] = useState(false);
  const [isWidgetVisible, setIsWidgetVisible] = useState(true);
  const [isBalWidgetOpen, setIsBalWidgetOpen] = useState(false);
  const [isBalWidgetReady, setIsBalWidgetReady] = useState(false);
  const [isBalWidgetConfigLoaded, setIsBalWidgetConfigLoaded] = useState(false);
  const [balWidgetConfig, setBalWidgetConfig] = useState(null);

  const isSiteEmbedded = useMemo(() => {
    if (global.window) {
      return window.self !== window.top;
    }
  }, []);

  const open = useCallback(() => {
    if (balWidgetRef.current) {
      balWidgetRef.current.contentWindow?.postMessage(
        {
          type: "BAL_WIDGET_OPEN",
        },
        "*",
      );
    }
  }, [balWidgetRef]);

  const close = useCallback(() => {
    if (balWidgetRef.current) {
      balWidgetRef.current.contentWindow?.postMessage(
        {
          type: "BAL_WIDGET_CLOSE",
        },
        "*",
      );
    }
  }, [balWidgetRef]);

  const navigate = useCallback(
    (to: string) => {
      if (balWidgetRef.current) {
        balWidgetRef.current.contentWindow?.postMessage(
          {
            type: "BAL_WIDGET_NAVIGATE",
            content: to,
          },
          "*",
        );
      }
    },
    [balWidgetRef],
  );

  // Fetch BAL widget config
  useEffect(() => {
    if (isSiteEmbedded) {
      return;
    }

    async function fetchBalWidgetConfig() {
      try {
        const response = await fetch(
          `${siteConfig.customFields.BAL_ADMIN_API_URL}/bal-widget/config`,
        );
        const data = await response.json();
        if (response.status !== 200) {
          throw new Error(data.message);
        }

        setBalWidgetConfig(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBalWidgetConfig();
  }, []);

  // Send config to BAL widget
  // once it's ready
  useEffect(() => {
    if (
      balWidgetRef.current &&
      balWidgetConfig &&
      isBalWidgetReady &&
      !isBalWidgetConfigLoaded
    ) {
      balWidgetRef.current.contentWindow?.postMessage(
        {
          type: "BAL_WIDGET_CONFIG",
          content: balWidgetConfig,
        },
        "*",
      );
    }
  }, [
    balWidgetRef,
    balWidgetConfig,
    isBalWidgetReady,
    isBalWidgetConfigLoaded,
  ]);

  useEffect(() => {
    function BALWidgetMessageHandler(event: {
      data: { type: string; content: any };
    }) {
      switch (event.data?.type) {
        case "BAL_WIDGET_OPENED":
          if (transitionTimeout.current) {
            clearTimeout(transitionTimeout.current);
          }
          setIsBalWidgetOpen(true);
          break;
        case "BAL_WIDGET_CLOSED":
          // Wait for transition to end before closing the iframe
          if (transitionTimeout.current) {
            clearTimeout(transitionTimeout.current);
          }
          transitionTimeout.current = setTimeout(() => {
            setIsBalWidgetOpen(false);
          }, 300);
          break;
        case "BAL_WIDGET_READY":
          setIsBalWidgetReady(true);
          break;
        case "BAL_WIDGET_CONFIG_LOADED":
          setIsBalWidgetConfigLoaded(true);
          break;
        case "BAL_WIDGET_PARENT_NAVIGATE_TO":
          const safeNavigation = sanitizeNavigateTo(event.data.content);
          if (safeNavigation) {
            window.open(
              safeNavigation.href,
              safeNavigation.target,
              safeNavigation.target === "_blank"
                ? "noopener,noreferrer"
                : undefined,
            );
          }
          break;
        default:
          break;
      }
    }

    window.addEventListener("message", BALWidgetMessageHandler);
    setIsWidgetDisplayed(true);

    return () => {
      window.removeEventListener("message", BALWidgetMessageHandler);
      clearTimeout(transitionTimeout.current);
    };
  }, [isBalWidgetOpen]);

  return (
    <BALWidgetContext.Provider
      value={{
        open,
        close,
        navigate,
        showWidget: () => setIsWidgetVisible(true),
        hideWidget: () => setIsWidgetVisible(false),
        isBalWidgetOpen,
        isBalWidgetReady,
        isWidgetVisible,
      }}
    >
      {children}
      {isWidgetDisplayed && (
        <StyledIFrame
          ref={balWidgetRef}
          src={`${siteConfig.customFields.BAL_WIDGET_URL}`}
          $isOpen={isBalWidgetOpen}
          $isVisible={isWidgetVisible}
        />
      )}
    </BALWidgetContext.Provider>
  );
}

export const BALWidgetConsumer = BALWidgetContext.Consumer;

export default BALWidgetContext;
