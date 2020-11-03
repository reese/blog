const getContactHref = (name, contact) => {
  switch (name) {
    case "twitter":
      return `https://www.twitter.com/${contact}`;
    case "github":
      return `https://github.com/${contact}`;
    case "email":
      return `mailto:${contact}`;
    case "linkedin":
      return `https://www.linkedin.com/in/${contact}`;
    case "rss":
      return `https://reesew.io/rss.xml`;
    default:
      return contact;
  }
};

export default getContactHref;
