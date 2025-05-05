import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "eu-central-1",
});

export async function DELETE(request: Request) {
  const { body } = await request.json();
  const key = body.key;
  const bucket = body.bucket;

  if (!key) {
    return new Response(JSON.stringify({ error: "Missing S3 object key" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!bucket) {
    return new Response(JSON.stringify({ error: "Missing S3 bucket name" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    await s3.send(command);

    return new Response(
      JSON.stringify({ message: "File deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to delete file",
        details: (error as Error).message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
