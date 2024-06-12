import nedb from "nedb-promises";

export const campaignDatabase = new nedb({
  filename: "campaignOffers.db",
  autoload: true,
});
