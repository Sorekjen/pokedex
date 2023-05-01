function getIdFromUrl(url) {
  return url.split("/").reverse()[1];
} export default getIdFromUrl;