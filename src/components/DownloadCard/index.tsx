import { ImgHTMLAttributes, useState } from "react";
import styles from "./styles.module.css";

export interface DownloadGuideCardProps {
  imgProps: ImgHTMLAttributes<HTMLImageElement>;
  downloadlink: string;
  onDownloadStart?: () => void;
}

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
    <div
      className={styles.downloadCard}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {isHovered && (
        <div className={styles.hoverBackground}>
          <span className="fr-icon-download-line" />
        </div>
      )}
      <img {...imgProps} />
    </div>
  );
}
