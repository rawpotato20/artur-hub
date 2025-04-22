import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const payload = verify(token, process.env.JWT_SECRET!);
    return new Response(JSON.stringify({ user: payload }), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Token invalid/expired" }), {
      status: 403,
    });
  }
}
