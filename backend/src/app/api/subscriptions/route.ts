import { prisma } from "@/lib/prisma"
import { success, error } from "@/lib/response"

export async function GET() {
  const subscriptions = await prisma.subscription.findMany({
    orderBy: {
      nextPayment: "asc",
    },
  })

  return success(subscriptions)
}

export async function POST(req: Request) {
  const body = await req.json()

  const { name, price, category, cycle, nextPayment, notes } = body

  if (!name || !price || !nextPayment) {
    return error("name, price, dan nextPayment wajib diisi")
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

  return success(subscription, 201)
}
