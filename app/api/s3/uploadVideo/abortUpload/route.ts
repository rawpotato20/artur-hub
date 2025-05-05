import { S3Client, AbortMultipartUploadCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "eu-central-1",
});

export async function POST(req: Request) {
  try {
    const { UploadId, Key } = await req.json();

    if (!UploadId || !Key) {
      return new Response("Missing UploadId or Key", { status: 400 });
    }

    const command = new AbortMultipartUploadCommand({
      Bucket: "arturhub-videos",
      Key,
      UploadId,
    });

    await s3Client.send(command);

    return new Response("Upload aborted successfully", { status: 200 });
  } catch (error) {
    console.error("Error aborting upload:", error);
    return new Response("Failed to abort upload", { status: 500 });
  }
}
