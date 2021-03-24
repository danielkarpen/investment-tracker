import client from "./client";

export default {
  async addThrowawayData(payload) {
    try {
      const results = await client
        .db("investments")
        .collection("data")
        .insertOne(payload);
      return results;
    } catch (err) {
      throw new Error(err);
    }
  },
};
