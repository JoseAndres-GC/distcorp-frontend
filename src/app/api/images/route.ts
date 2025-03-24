import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const imagesDir = path.join(process.cwd(), "public", "images");

  try {
    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    return NextResponse.json(imageFiles);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Error leyendo la carpeta de imágenes" },
      { status: 500 }
    );
  }
}
