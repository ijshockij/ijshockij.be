import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const headers = { "Content-Type": "application/json" };

const url = `${process.env.MERCH_BOT_WEBHOOK}`;

const order = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { tees, kidsCaps, caps, email, newsletter } = JSON.parse(req.body);

    if (!email?.length) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address" });
    }

    const body = JSON.stringify({
      text: JSON.stringify(
        { tees, kidsCaps, caps, email, newsletter },
        undefined,
        2
      ),
    });

    await fetch(url, { method: "POST", body, headers });

    return res.status(201).json({ error: null });
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong` });
  }
};

export default order;
