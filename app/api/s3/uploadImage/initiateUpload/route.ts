import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

// Initialize your S3 client
const s3 = new S3Client({
  region: "eu-central-1", // e.g., "eu-central-1"
});

export async function POST(req: Request) {
  const { fileName, fileType } = await req.json();

  if (!fileName || !fileType) {
    return new Response("Missing fileName or fileType", { status: 400 });
  }

  const Key = `${uuidv4()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: "arturhub-photos",
    Key,
    ContentType: fileType,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 60 * 10 }); // 10 minutes

  return Response.json({ url, key: Key });
}
