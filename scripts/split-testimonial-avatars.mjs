import path from "node:path";
import sharp from "sharp";

const input = path.join(
  process.cwd(),
  "public",
  "testimonials",
  "testimonial-avatars.png"
);
const outputDir = path.join(process.cwd(), "public", "testimonials");

const cellSize = 512;
const cropBox = {
  leftOffset: 96,
  topOffset: 0,
  width: 320,
  height: 320,
};

async function splitSheet() {
  const jobs = [
    { name: "t1.png", col: 0, row: 0 },
    { name: "t2.png", col: 1, row: 0 },
    { name: "t3.png", col: 2, row: 0 },
    { name: "t4.png", col: 0, row: 1 },
    { name: "t5.png", col: 1, row: 1 },
    { name: "t6.png", col: 2, row: 1 },
  ];

  for (const job of jobs) {
    const left = job.col * cellSize + cropBox.leftOffset;
    const top = job.row * cellSize + cropBox.topOffset;
    const outPath = path.join(outputDir, job.name);

    await sharp(input)
      .extract({
        left,
        top,
        width: cropBox.width,
        height: cropBox.height,
      })
      .png({ compressionLevel: 9, quality: 100 })
      .toFile(outPath);

    console.log(`Saved ${job.name} (${left}, ${top})`);
  }
}

splitSheet().catch((error) => {
  console.error("Failed to split testimonial avatar sheet:", error);
  process.exitCode = 1;
});
