export async function getUser() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/getUser`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const message = await res.json();
      return {
        success: false,
        status: res.status,
        message: message.message || "Failed to fetch user data",
      };
    }

    const data = await res.json();
    return { success: true, status: res.status, data };
  } catch (error: any) {
    return {
      success: false,
      status: 500,
      message: error.message || "Something went wrong",
    };
  }
}

//--------------------------------------------------------------------------------------------------------------

export async function verifyUser() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/verifyUser`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return new Response(
        JSON.stringify({ success: false, message: "Verification failed" }),
        { status: 400 } // Or whatever status code fits the failure case
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Verification successful" }),
      { status: 200 } // Success status code
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: "An error occurred" }),
      { status: 500 } // Internal server error status code
    );
  }
}

//--------------------------------------------------------------------------------------------------------------

export async function signOutUser() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/signOutUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return new Response(
        JSON.stringify({ success: false, message: "Sign out failed" }),
        { status: 400 } // Or whatever status code fits the failure case
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Sign out successful" }),
      { status: 200 } // Success status code
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: "An error occurred" }),
      { status: 500 } // Internal server error status code
    );
  }
}

//--------------------------------------------------------------------------------------------------------------

export async function signUpUser(data: {
  email: string;
  password: string;
  username: string;
  image?: string;
  provider?: string;
  key: string;
}): Promise<Response> {
  try {
    const res = await fetch("/api/user/signUpUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (!res.ok) {
      console.error("Registration failed:", responseData.message);
      return new Response(
        JSON.stringify({ success: false, message: responseData.message }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Registration successful!");
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("An unexpected error occurred:", error.message);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
