export function setFeedId(id) {
  localStorage.setItem("feedId", id);
}

export function getFeedId() {
  return localStorage.getItem("feedId");
}

export function removeFeedId() {
  localStorage.removeItem("feedId");
}
