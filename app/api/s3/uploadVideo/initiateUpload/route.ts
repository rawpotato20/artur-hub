import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({ region: "eu-central-1" });

export async function POST(req: Request) {
  try {
    const { fileName, contentType, fileSize } = await req.json();
    const Bucket = "arturhub-videos";
    const Key = `${uuidv4()}-${fileName}`;

    const createCommand = new CreateMultipartUploadCommand({
      Bucket,
      Key,
      ContentType: contentType,
    });

    const { UploadId } = await s3.send(createCommand);

    const contentLength = parseInt(fileSize, 10);
    const partCount = Math.ceil(contentLength / (5 * 1024 * 1024)); // 5 MB per part

    const urls = await Promise.all(
      Array.from({ length: partCount }, async (_, i) => {
        const partNumber = i + 1;
        const command = new UploadPartCommand({
          Bucket,
          Key,
          UploadId,
          PartNumber: partNumber,
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        return { partNumber, url };
      })
    );

    return Response.json({ uploadId: UploadId, key: Key, urls });
  } catch (error) {
    console.error("Multipart upload error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
