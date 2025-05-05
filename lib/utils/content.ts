// ABORT UPLOAD=================================================================
export async function abortMultipartUpload(UploadId: string, Key: string) {
  const res = await fetch("/api/s3/uploadVideo/abortUpload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UploadId: UploadId,
      Key: Key,
    }),
  });

  if (!res.ok) throw new Error("Failed to abort multipart upload");

  const data = await res.json();
  return data; // Contains response or status confirmation
}
// ABORT UPLOAD=================================================================

//------------------------------------------------------------------------------

// UPLOAD VIDEO=================================================================
type PresignedUrl = { partNumber: number; url: string };
type ProgressCallback = (progress: number, bytes: number) => void;

export async function uploadLargeFile(
  file: File,
  onProgress: ProgressCallback
) {
  const fileName = encodeURIComponent(file.name);
  const contentType = file.type;
  const fileSize = file.size;

  // Step 1: Initiate multipart upload
  const initRes = await fetch("/api/s3/uploadVideo/initiateUpload", {
    method: "POST",
    body: JSON.stringify({ fileName, contentType, fileSize }),
    headers: { "Content-Type": "application/json" },
  });

  const {
    uploadId,
    key,
    urls,
  }: {
    uploadId: string;
    key: string;
    urls: PresignedUrl[];
  } = await initRes.json();

  // Step 2: Chunk the file
  const chunkSize = 5 * 1024 * 1024; // 5MB
  const chunks = [];
  for (let start = 0; start < file.size; start += chunkSize) {
    chunks.push(file.slice(start, start + chunkSize));
  }

  // Step 3: Upload each part with retry logic
  const uploadedParts: { ETag: string; PartNumber: number }[] = [];

  console.log(urls);

  let uploadedBytes = 0;

  await Promise.all(
    chunks.map(async (chunk, index) => {
      let previousLoaded = 0;
      const partNumber = index + 1;
      console.log("Part Number:", partNumber);

      // Find the corresponding URL for the current part
      const part = urls.find((p) => p.partNumber === partNumber);
      if (!part) {
        throw new Error(`No presigned URL found for part ${partNumber}`);
      }

      const { url } = part;
      let retries = 3;

      while (retries > 0) {
        try {
          const xhr = new XMLHttpRequest();
          xhr.open("PUT", url, true);
          xhr.setRequestHeader("Content-Type", contentType);

          // Track progress
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const delta = event.loaded - previousLoaded;
              // console.log("event.loaded:", event.loaded);
              // console.log("previousLoaded:", previousLoaded);
              // console.log("delta:", delta);
              uploadedBytes += delta;
              previousLoaded = event.loaded;

              // console.log("UploadedBytes:", uploadedBytes);

              const progress = Math.round((uploadedBytes / fileSize) * 100);
              onProgress(progress, uploadedBytes);
              console.log(`Progress: ${progress}%`);
            }
          };

          // Return a promise to handle async response
          await new Promise<void>((resolve, reject) => {
            xhr.onload = () => {
              if (xhr.status === 200) {
                const ETag = xhr.getResponseHeader("ETag")!.replace(/"/g, "");

                console.log("ETag:", ETag);

                uploadedParts.push({ ETag, PartNumber: partNumber });
                resolve(); // Successfully uploaded, resolve the promise
              } else {
                const abort = abortMultipartUpload(uploadId, key);
                reject(new Error(`Upload failed for part ${partNumber}`)); // Reject on failure
              }
            };

            xhr.onerror = () => {
              reject(new Error("Upload failed")); // Reject on error
            };

            // Send the chunk
            xhr.send(chunk);
          });

          break; // Exit loop if upload is successful
        } catch (err) {
          retries--;
          if (retries === 0) throw err;
          await new Promise((r) => setTimeout(r, 1000)); // Wait and retry
        }
      }
    })
  );

  // Step 4: Complete the multipart upload
  const completeRes = await fetch("/api/s3/uploadVideo/finalizeUpload", {
    method: "POST",
    body: JSON.stringify({
      uploadId,
      key,
      parts: uploadedParts.sort((a, b) => a.PartNumber - b.PartNumber),
    }),
    headers: { "Content-Type": "application/json" },
  });

  const { location } = await completeRes.json();
  return new Response(JSON.stringify({ location, key }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
// UPLOAD VIDEO=================================================================

//------------------------------------------------------------------------------

// DELETE CONTENT===============================================================
export async function deleteFileFromS3(key: string, bucket: string) {
  const res = await fetch("/api/s3/deleteContent", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: { key },
      bucket,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Unknown error");
  }

  return data;
}
// DELETE CONTENT===============================================================

//------------------------------------------------------------------------------

// UPLOAD IMAGE=================================================================
export async function uploadImage(file: File) {
  const fileName = file.name;
  const fileType = file.type;

  try {
    const res = await fetch("/api/s3/uploadImage/initiateUpload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName,
        fileType,
      }),
    });

    console.log(res);
    const { url, key } = await res.json();
    console.log("Key:", key);
    console.log("Url:", url);

    if (!res.ok) {
      throw new Error("Failed to get presigned URL");
    }

    const uploadRes = await fetch(url, {
      method: "PUT", // Use PUT to upload the file
      headers: {
        "Content-Type": file.type, // Set content type to the file's MIME type
      },
      body: file, // The file to be uploaded
    });

    if (!uploadRes.ok) {
      return new Response("Failed to upload the image to S3", { status: 500 });
    }

    const viewUrl = url.replace(/\?.*$/, "");

    return new Response(
      JSON.stringify({ message: "Upload successful", key, viewUrl }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Error uploading image",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
// UPLOAD IMAGE=================================================================

//------------------------------------------------------------------------------

// UPLOAD PROFILE IMAGE=========================================================
export async function uploadProfileImage(file: File) {
  const fileName = file.name;
  const fileType = file.type;

  try {
    const res = await fetch("/api/s3/uploadIcon/initiateUpload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName,
        fileType,
      }),
    });

    console.log(res);
    const { url, key } = await res.json();
    console.log("Key:", key);
    console.log("Url:", url);

    if (!res.ok) {
      throw new Error("Failed to get presigned URL");
    }

    const uploadRes = await fetch(url, {
      method: "PUT", // Use PUT to upload the file
      headers: {
        "Content-Type": file.type, // Set content type to the file's MIME type
      },
      body: file, // The file to be uploaded
    });

    if (!uploadRes.ok) {
      return new Response("Failed to upload the image to S3", { status: 500 });
    }

    const viewUrl = url.replace(/\?.*$/, "");

    return new Response(
      JSON.stringify({ message: "Upload successful", key, viewUrl }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Error uploading image",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
// UPLOAD PROFILE IMAGE=========================================================

// UPSERT POST TO DB ===========================================================

type PostParams = {
  likes?: number;
  dislikes?: number;
  comments?: string[];
  views?: number;
  title: string;
  content: string;
  key: string;
  thumbnail: string;
  contentType: "Video" | "Photo";
  tags?: string[];
  user: string;
};
export async function upsertPost(postParams: PostParams) {
  const res = await fetch("/api/upsertContent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key: postParams.key,
      title: postParams.title,
      content: postParams.content,
      thumbnail: postParams.thumbnail,
      contentType: postParams.contentType,
      user: postParams.user,
      tags: postParams.tags,
    }),
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), { status: res.status });
}

// UPSERT POST TO DB ===========================================================

//------------------------------------------------------------------------------

// GET CONTENT =================================================================
export async function getContent(id?: string): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = id
    ? `${baseUrl}/api/getContent?id=${id}`
    : `${baseUrl}/api/getContent`;

  try {
    const res = await fetch(url);

    const data = await res.json();

    if (!res.ok) {
      return new Response(
        JSON.stringify({ message: data.message || "Unknown error" }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify(id ? { post: data.post } : { posts: data.posts }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Fetch error:", err);
    return new Response(
      JSON.stringify({ message: "Failed to fetch content" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
// GET CONTENT =================================================================

//------------------------------------------------------------------------------

// POST COMMENT =================================================================
export async function postComment(
  content: string,
  userId: string,
  key: string
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${baseUrl}/api/postComment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, userId, key }),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ message: data.message }), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ comment: data.comment }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Fetch error:", err);
    return new Response(JSON.stringify({ message: "Network error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
// POST COMMENT =================================================================
