import { serialize } from "cookie";

export async function POST() {
  try {
    const accessTokenCookie = serialize("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // Expire immediately
    });

    const refreshTokenCookie = serialize("refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // Expire immediately
    });

    const headers = new Headers();
    headers.append("Set-Cookie", accessTokenCookie);
    headers.append("Set-Cookie", refreshTokenCookie);
    headers.set("Content-Type", "application/json");

    return new Response(
      JSON.stringify({
        message: "User signed in successfully",
      }),
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.error("Error signing out user:", error);
  }
}
