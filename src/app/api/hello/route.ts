import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // This will fail if DATABASE_URL is not set correctly, 
    // but it's a good placeholder for backend logic.
    // const users = await prisma.user.findMany();
    
    return NextResponse.json({ 
      status: "success", 
      message: "Hello from the backend!",
      database: "Prisma is ready"
    });
  } catch (error) {
    return NextResponse.json({ 
      status: "error", 
      message: "Prisma client initialized, but database connection failed. Please check your .env file." 
    }, { status: 500 });
  }
}
