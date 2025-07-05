import { ImgHTMLAttributes, useState } from "react";
import styled from "styled-components";

export interface DownloadGuideCardProps {
  imgProps: ImgHTMLAttributes<HTMLImageElement>;
  downloadlink: string;
  onDownloadStart?: () => void;
}

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;

  > .hover-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 2rem;
  }
`;

export default function DownloadGuideCard({
  imgProps,
  downloadlink,
  onDownloadStart,
}: DownloadGuideCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => {
    if (onDownloadStart) {
      onDownloadStart();
    }
    window.open(downloadlink, "_blank");
  };

  return (
    <StyledWrapper
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {isHovered && <div className="hover-background" />}
      <img {...imgProps} />
    </StyledWrapper>
  );
}
