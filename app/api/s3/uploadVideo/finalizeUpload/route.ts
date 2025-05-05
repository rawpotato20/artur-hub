import { S3Client, CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "eu-central-1" });

export async function POST(req: Request): Promise<Response> {
  const { uploadId, key, parts } = await req.json();

  const Bucket = "arturhub-videos";

  const command = new CompleteMultipartUploadCommand({
    Bucket,
    Key: key,
    UploadId: uploadId,
    MultipartUpload: {
      Parts: parts,
    },
  });

  const data = await s3.send(command);

  return new Response(JSON.stringify({ location: data.Location }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
