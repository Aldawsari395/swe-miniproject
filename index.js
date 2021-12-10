const express = require("express");
const app = express();
const port = 3000;
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
const jimp = require("jimp");

app.use("/", express.static("public"));

app.post("/pngtojpg", upload.single("image"), async (req, res) => {
    let image = await jimp.read(req.file.path);
    let filepath = `public/uploads/${req.file.originalname.replace(".png", ".jpg")}`;
    await image.writeAsync(filepath);
    res.download(filepath);
});

app.post("/jpgtopng", upload.single("image"), async (req, res) => {
    let image = await jimp.read(req.file.path);
    let filepath = `public/uploads/${req.file.originalname.replace(".jpg", ".png")}`;
    await image.writeAsync(filepath);
    res.download(filepath);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
