const { v4: uuidv4 } = require("uuid");
var links = [
  "https://www.youtube.com/watch?v=m_gdEzlxKsg&list=RDm_gdEzlxKsg&start_radio=1",
  "https://www.youtube.com/watch?v=oTx5l0QZS2U",
  "https://www.youtube.com/watch?v=QeiLo2G54oM",
  "https://www.youtube.com/watch?v=_TMh4CAdJ7s",
  "https://www.youtube.com/watch?v=YwVHHZNtdKU&list=RDYwVHHZNtdKU&start_radio=1",
  "https://www.youtube.com/shorts/MyAsHFHIX48",
  "https://www.youtube.com/shorts/x06abv_36iA",
  "https://www.youtube.com/shorts/svJ0B02HLx4",
  "https://www.youtube.com/shorts/KAoAC3GJlBg",
  "https://www.youtube.com/shorts/NEdnej9i6UY",
  "https://www.youtube.com/shorts/_mxWz4nid9Q",
  "https://www.youtube.com/shorts/SNo16ARnmek",
  "https://www.youtube.com/shorts/d8Nkd0SgU7Q",
  "https://www.youtube.com/shorts/YRP6lrBrgQ8",
  "https://www.youtube.com/shorts/ZzLHCT4UB_w",
  "https://www.youtube.com/shorts/MXqguLxbov4",
  "https://www.youtube.com/shorts/RvHOH9t4RxI",
  "https://www.youtube.com/watch?v=Dg8X7SZ_4bs",
  "https://www.youtube.com/watch?v=XbBSGZApAX0",
  "https://www.youtube.com/watch?v=AUuXpWmPXo8",
  "https://www.youtube.com/watch?v=TxJYlyhJB1o",
  "https://www.youtube.com/watch?v=JbadB_E89xw",
  "https://www.youtube.com/watch?v=aFSiTAmuBgc",
  "https://www.youtube.com/watch?v=emaBHywranI",
  "https://www.youtube.com/watch?v=yrSr7DSo_P8",
  "https://www.youtube.com/watch?v=8M0NOBl8w_I",
  "https://www.youtube.com/watch?v=sRBRsJj3TFc",
  "https://www.youtube.com/watch?v=8Biqm3CALHI",
  "https://www.youtube.com/watch?v=I5_BuHWAlnw",
  "https://www.youtube.com/watch?v=9kfScGV6W1Y",
  "https://www.youtube.com/watch?v=RZ4j9ZSmXD8",
  "https://www.youtube.com/watch?v=Uto41mIkAmU",
  "https://www.youtube.com/watch?v=hV47oQ4_X3U",
  "https://www.youtube.com/watch?v=YDnkrmt01-M",
  "https://www.youtube.com/watch?v=kUBpsb1mlGA",
  "https://www.youtube.com/watch?v=uxatmGqz7R8",
  "https://www.youtube.com/watch?v=ql2J9PqAQ98",
  "https://www.youtube.com/watch?v=1OKP6dWX_xM",
  "https://www.youtube.com/watch?v=qZ8Qflpn_ZU&list=RDqZ8Qflpn_ZU&start_radio=1",
  "https://www.youtube.com/watch?v=d4mWzkNNGas",
  "https://www.youtube.com/watch?v=Lp8rrZ4TIJ0",
  "https://www.youtube.com/watch?v=8eYG5QGZAZs",
  "https://fb.watch/mR1_XzjAUr/",
  "https://fb.watch/mR2bvOvvSW/",
  "https://fb.watch/mR2ta6lOfx/",
  "https://fb.watch/mR2vRJaRnj/",
  "https://fb.watch/mR2AuS7z7d/",
  "https://fb.watch/mR2FhXx8FL/",
  "https://fb.watch/mR2GfEX52r/",
  "https://fb.watch/mR3lV6n42V/",
  "https://fb.watch/mR3mAkHNTd/",
  "https://www.instagram.com/reel/Cvrm8WsA4xB/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/CwqE3n9yDJk/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/CwsNHlbyc16/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/CwsIEOwvbR8/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/CwuU7CoNX4J/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/Cwu4ItlRICw/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/Cwu4ItlRICw/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/CwpMI8RJ2nY/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/CwvKqLYyW88/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/Cwu7xtty2ta/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/CwvL2rItyoj/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/CwpjZm7RC_6/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
];

function getLinkType(link) {
  link = link.toLowerCase();
  const uniqulink = uuidv4().replaceAll("-", "/");
  if (link.includes("fb.") || link.includes("facebook.")) {
    return { linkType: "facebook", shortLink: "FB.com/" + uniqulink };
  } else if (link.includes("youtube.")) {
    return { linkType: "youtube", shortLink: "YT.com/" + uniqulink };
  } else if (link.includes("instagram") || link.includes("instag")) {
    return { linkType: "instagram", shortLink: "IG.com/" + uniqulink };
  } else {
    return { linkType: "link", shortLink: "OT.com/" + uniqulink };
  }
}

var query =
  "INSERT INTO sharedlinks (link,linkType,shortLink,preference,userId, pointAllocated, views) VALUES ";
links.forEach((el) => {
  let linksdata = getLinkType(el);
  query += `('${el}', '${linksdata.linkType}', '${linksdata.shortLink}', 1 , 2, 5, 0), `;
});

console.log(query);

//
