const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("assets-source");
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("admin");

  // Collections — Projets FR
  eleventyConfig.addCollection("projets_fr", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/projets/fr/*.md").sort((a,b) => (a.data.order||99) - (b.data.order||99));
  });

  // Collections — Témoignages FR
  eleventyConfig.addCollection("temoignages_fr", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/temoignages/fr/*.md").sort((a,b) => (a.data.order||99) - (b.data.order||99));
  });

  // Collections — Services FR
  eleventyConfig.addCollection("services_fr", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/services/fr/*.md").sort((a,b) => (a.data.order||99) - (b.data.order||99));
  });

  // Date filter
  eleventyConfig.addFilter("year", (date) => new Date(date).getFullYear());

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
