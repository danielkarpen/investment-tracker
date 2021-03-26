import client from "./client";
// database service methods
export default {
  async addInvestment(payload) {
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
  async getAllInvestments() {
    try {
      const cursor = await client.db("investments").collection("data").find();
      const results = await cursor.toArray();
      return results;
    } catch (err) {
      throw new Error(err);
    }
  },

  async getUserInvestments(userEmail) {
    try {
      const cursor = await client
        .db("investments")
        .collection("data")
        .find({ "partners.email": userEmail });
      const results = await cursor.toArray();
      return results;
    } catch (err) {
      throw new Error(err);
    }
  },

  async addPartnerToInvestment(investment, partner) {
    try {
      const results = await client
        .db("investments")
        .collection("data")
        .updateOne({ investment }, { $push: { partners: partner } });
      // ^ inside of investment object update partners array with new partner object
      return results;
    } catch (err) {
      throw new Error(err);
    }
  },
};
