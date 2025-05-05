export async function getRefreshToken() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/refreshToken`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return false;
  }

  return true;
}
