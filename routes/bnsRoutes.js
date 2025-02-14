const express = require("express");
const {
  getBnsSectionsByChapter,
  getBnsSection,
  searchBnsSections,
  searchBnsSectionsInChapter,
  getBnsSectionsByChapterJSON,
} = require("../controllers/bnsController");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("bnschapters.ejs");
});
router.get("/bns_sections", getBnsSectionsByChapter);
router.get("/bns_section", getBnsSection);
router.get("/bns_sections/search", searchBnsSections);
router.get("/bns_sections/search/:chapterNumber", searchBnsSectionsInChapter);
router.get("/bns_sections/:chapterNumber", getBnsSectionsByChapterJSON);

module.exports = router;
