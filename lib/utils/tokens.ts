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

//------------------------------------------------------------------------------

export async function getRefreshTokenServer(refreshToken: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/refreshTokenServer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-refresh-token": refreshToken || "",
      },
    }
  );

  if (!res.ok) {
    return false;
  }

  return true;
}
