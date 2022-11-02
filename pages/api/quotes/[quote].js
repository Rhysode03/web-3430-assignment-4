import clientPromise from "../../../libs/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const client = await clientPromise;
        const db = client.db("quotes");

        let data = await db
          .collection("quotes").fineOne({ _id: ObjectId(req.query.quote) });

        res.status(200).json(data);
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const client = await clientPromise;
        const db = client.db("quotes");

        await db.collection("quotes").updateOne({ _id: ObjectId(req.query.quote) }, {$inc: {likes: 1}},
        );

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
        await db.collection("quotes").deleteOne({ _id: ObjectId(req.query.quote) });
        res.status(200).json({ success: true });
      } catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
      }
  }
}
