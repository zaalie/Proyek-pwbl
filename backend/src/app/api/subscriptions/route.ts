import { prisma } from "@/lib/prisma"
import {
  ok,
  created,
  badRequest,
  serverError,
} from "@/lib/response"

export async function GET() {
  try {
    const data = await prisma.subscription.findMany({
      orderBy: { nextPayment: "asc" },
    })

    return ok(data)
  } catch {
    return serverError()
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, price, category, cycle, nextPayment, notes } = body

    if (!name || !price || !nextPayment) {
      return badRequest(
        "name, price, dan nextPayment wajib diisi"
      )
    }

    const subscription = await prisma.subscription.create({
      data: {
        name,
        price: Number(price),
        category,
        cycle,
        nextPayment: new Date(nextPayment),
        notes,
      },
    })

    return created(subscription)
  } catch {
    return serverError()
  }
}
