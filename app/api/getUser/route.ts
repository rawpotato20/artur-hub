import { cookies } from "next/headers"; // Ensure you import cookies
import { JwtPayload, verify } from "jsonwebtoken"; // Make sure you have JWT package installed
import { connectToDb } from "@/lib/mongoose"; // Your DB connection
import User from "@/lib/models/user.model"; // Assuming you have a User model

interface CustomJwtPayload extends JwtPayload {
  id: string; // or number depending on your user ID type
}

export async function GET(req: Request) {
  await connectToDb();

  if (req.method === "GET") {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    try {
      // Verify the token
      const payload = verify(
        token,
        process.env.JWT_SECRET!
      ) as CustomJwtPayload;

      // You can return the user data here or process it further as needed
      const user = await User.findOne({ id: payload.id });
      if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), {
          status: 404,
        });
      }

      return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ message: "Token invalid/expired" }),
        { status: 403 }
      );
    }
  }

  return new Response(JSON.stringify({ message: "Method not allowed" }), {
    status: 405,
  });
}
