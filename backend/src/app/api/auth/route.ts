import { success } from "@/lib/response"

export async function GET() {
  return success({
    message: "Authentication API ready",
  })
}
