import { cookies } from "next/headers"; // Ensure you import cookies
import { JwtPayload, verify } from "jsonwebtoken"; // Make sure you have JWT package installed

interface CustomJwtPayload extends JwtPayload {
  id: string; // or number depending on your user ID type
}

export async function GET(req: Request) {
  if (req.method === "GET") {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken || !token) {
      return new Response(JSON.stringify({ success: false }), { status: 400 });
    }

    try {
      // Verify the token
      const payload = verify(
        token,
        process.env.JWT_SECRET!
      ) as CustomJwtPayload;

      return new Response(JSON.stringify({ success: true }));
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ success: false }));
    }
  }

  return new Response(JSON.stringify({ success: false }));
}
