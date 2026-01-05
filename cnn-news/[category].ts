import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { category } = req.query;

  if (!category || typeof category !== "string") {
    return res.status(400).json({
      message: "Category is required",
      data: [],
    });
  }

  try {
    const response = await fetch(
      `https://berita-indo-api-next.vercel.app/api/cnn-news/${category}`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Failed to fetch data",
        data: [],
      });
    }

    const data = await response.json();

    // ✅ CORS HEADER
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: String(error),
    });
  }
}
