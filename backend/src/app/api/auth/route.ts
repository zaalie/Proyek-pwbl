import { ok } from "@/lib/response"

export async function GET() {
  return ok({
    message: "Auth API ready",
  })
}
