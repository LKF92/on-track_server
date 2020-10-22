const Discogs = require("disconnect").Client;
const db = new Discogs({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
}).database();

async function releases(parent, args) {
  try {
    const response = await db.getArtistReleases(parent.artistId);
    if (!response) {
      throw new Error(`No Release found for artist ${parent.artistId}`);
    }

    const releases = response.releases.map((release) => {
      return {
        ...release,
        releaseId: release.id,
      };
    });
    return releases;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { releases };
