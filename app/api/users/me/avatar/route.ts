import { NextResponse } from "next/server";
import { api } from "../../../api";
import { cookies } from "next/headers";
import { handleApiError } from "@/app/api/_utils/utils";

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  try {
    const formData = await request.formData();

    const { data } = await api.patch("/users/me/avatar", formData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(error, "Update avatar failed");
  }
}
