export default API = {
  // local server => http://localhost:8000/
  // cloud server => http://k5a206.p.ssafy.io:8000/
  // db server => http://k5a206.p.ssafy.io/
  URL: "http://localhost:8000",
  user(userId) {
    return `/user/${userId}`;
  },
  userLogin: "/user",
  userLogout: "/user",
  userProfile(userId) {
    return `/user/${userId}/profiles`;
  },
  pictureUpload: "/pictures/upload",
  crops(pictureId) {
    return `/crops/${pictureId}`;
  },
  markets: "/markets",
  market(marketId) {
    return `/markets/${marketId}`;
  },
  marketPictures(marketId) {
    return `/markets/${marketId}/pictures`;
  },
  articles: "/articles",
  article(articlePk) {
    return `/articles/${articlePk}/`;
  },
  articleComments(articlePk, commentId) {
    return `/articles/${articlePk}/comments/${commentId}`;
  },
};
