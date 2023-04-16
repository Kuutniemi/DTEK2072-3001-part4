// Määrittele ensin funktio dummy, joka saa parametrikseen taulukollisen blogeja ja palauttaa aina luvun 1. Tiedoston list_helper.js sisällöksi siis tulee tässä vaiheessa:
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
