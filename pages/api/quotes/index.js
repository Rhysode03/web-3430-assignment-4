import { ObjectId } from "mongodb";
import clientPromise from "../../../libs/mongodb";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const client = await clientPromise;
        const db = client.db("quotes");

        let data = await db
          .collection("quotes")
          .find({}, { projection: {} })
          .toArray();

        res.status(200).json(data);
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const client = await clientPromise;
        const db = client.db("quotes");

        await db.collection("quotes").insertOne(JSON.parse(req.body));

        res.status(200).json({ success: true });
      } catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const client = await clientPromise;
        const db = client.db("quotes");

        await db.collection("quotes").insertOne(JSON.parse(req.body));

        res.status(200).json({ success: true });
      } catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const client = await clientPromise;
        const db = client.db("quotes");

        await db.collection("quotes").deleteOne(JSON.parse(req.body));

        res.status(200).json({ success: true });
      } catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
      }
      break;
  }
}
