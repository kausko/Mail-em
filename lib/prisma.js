// lib/prisma.js
import { PrismaClient } from '@prisma/client'
let prisma = new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma