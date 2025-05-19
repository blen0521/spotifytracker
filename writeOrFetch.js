export default async function handler(req, res) {

  res.status(200).json({
    top_artist: "Jung Jaehyun",
    plays: 124,
  });
}
