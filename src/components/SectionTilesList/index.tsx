import Tile from "@codegouvfr/react-dsfr/Tile";
import Section from "../Section";

interface TilesData {
  picto: string;
  title: string;
  description?: string;
  detail?: string;
  link: {
    href: string;
    target?: string;
  };
  tags?: string[];
}

interface SectionTilesListProps {
  title?: string;
  id?: string;
  data: TilesData[];
  tileTitleAs?: "h2" | "h3" | "h4" | "h5" | "h6";
  isSmallTiles?: boolean;
  withoutLinkIcon?: boolean;
}

function SectionTilesList({
  title,
  data,
  tileTitleAs = "h3",
  isSmallTiles,
  withoutLinkIcon,
}: SectionTilesListProps) {
  return (
    <Section title={title}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
          gap: "1rem",
        }}
      >
        {data.map((item, index) => (
          <Tile
            key={index}
            imageSvg={false}
            title={item.title}
            desc={item.description}
            detail={item.detail}
            imageUrl={item.picto}
            linkProps={item.link}
            orientation="vertical"
            titleAs={tileTitleAs}
            small={isSmallTiles}
            noIcon={withoutLinkIcon}
          />
        ))}
      </div>
    </Section>
  );
}

export default SectionTilesList;
