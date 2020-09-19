import { Link } from "gatsby";
import moment from "moment";
import React, { useEffect } from "react";
import styles from "./Feed.module.scss";

const AlbumWidget = ({ currentSong: { albumTitle, artist, title } }) => {
  const [trackList, setTrackList] = useState([]);
  const [artistMetadata, setArtistMetadata] = useState();

  useEffect(() => {
    fetch(`https://yourapi.com/albums/${albumTitle}`).then((tracks) =>
      setTrackList(tracks)
    );
  }, [albumTitle]);

  useEffect(() => {
    fetch(`https://yourapi.com/artists/${artist}`).then(({ metadata }) =>
      setArtistMetadata(metadata)
    );
  });

  return (
    <div>
      <p>Now Playing: {title}</p>
      {trackList.map((track) => (
        <TrackListing track={track} />
      ))}
    </div>
  );
};

const Feed = ({ edges }) => (
  <div className={styles["feed"]}>
    {edges.map((edge) => (
      <div className={styles["feed__item"]} key={edge.node.fields.slug}>
        <div className={styles["feed__item-meta"]}>
          <time
            className={styles["feed__item-meta-time"]}
            dateTime={moment(edge.node.frontmatter.date).format("MMMM D, YYYY")}
          >
            {moment(edge.node.frontmatter.date).format("MMMM YYYY")}
          </time>
          <span className={styles["feed__item-meta-divider"]} />
          <span className={styles["feed__item-meta-category"]}>
            <Link
              to={edge.node.fields.categorySlug}
              className={styles["feed__item-meta-category-link"]}
            >
              {edge.node.frontmatter.category}
            </Link>
          </span>
        </div>
        <h2 className={styles["feed__item-title"]}>
          <Link
            className={styles["feed__item-title-link"]}
            to={edge.node.fields.slug}
          >
            {edge.node.frontmatter.title}
          </Link>
        </h2>
        <p className={styles["feed__item-description"]}>
          {edge.node.frontmatter.description}
        </p>
        <Link
          className={styles["feed__item-readmore"]}
          to={edge.node.fields.slug}
        >
          Read
        </Link>
      </div>
    ))}
  </div>
);

export default Feed;
