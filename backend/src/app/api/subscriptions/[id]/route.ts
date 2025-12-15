import { prisma } from "@/lib/prisma"
import { success, error } from "@/lib/response"

type Params = {
  params: { id: string }
}

export async function GET(_: Request, { params }: Params) {
  const id = Number(params.id)

  const data = await prisma.subscription.findUnique({
    where: { id },
  })

  if (!data) {
    return error("Subscription tidak ditemukan", 404)
  }

  return success(data)
}

export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id)
  const body = await req.json()

  const updated = await prisma.subscription.update({
    where: { id },
    data: body,
  })

  return success(updated)
}

export async function DELETE(_: Request, { params }: Params) {
  const id = Number(params.id)

  await prisma.subscription.delete({
    where: { id },
  })

  return success({ message: "Subscription berhasil dihapus" })
}
