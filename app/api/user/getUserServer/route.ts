import { verify, JwtPayload } from "jsonwebtoken";
import { connectToDb } from "@/lib/mongoose";
import User from "@/lib/models/user.model";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export async function GET(req: Request) {
  await connectToDb();

  // Extract tokens from headers
  const accessToken = req.headers.get("authorization")?.split(" ")[1]; // Bearer <token>
  const refreshToken = req.headers.get("x-refresh-token");

  if (!accessToken || !refreshToken) {
    return new Response(JSON.stringify({ message: "Missing tokens" }), {
      status: 403,
    });
  }

  try {
    // Verify access token
    const payload = verify(
      accessToken,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;

    // Fetch user
    const user = await User.findOne({ id: payload.id });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    return new Response(
      JSON.stringify({ message: "Invalid or expired token" }),
      {
        status: 403,
      }
    );
  }
}
