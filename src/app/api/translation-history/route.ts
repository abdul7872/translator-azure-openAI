import { getTranslations } from "@/mongodb/models/User";
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const userId = request?.nextUrl?.searchParams?.get("userId");
  if (!userId) throw new Error("UserId not found!")
  
    const translations  = await getTranslations(userId)

  return Response.json({ translations })
}