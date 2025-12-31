import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST - Add new result manually
export async function POST(req: NextRequest) {
  try {
    // Check authentication and admin role
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { houseId, resultDate, firstRound, secondRound } = body;

    // Validation
    if (!houseId || !resultDate) {
      return NextResponse.json(
        { error: "House ID and result date are required" },
        { status: 400 }
      );
    }

    // Create or update result
    const result = await prisma.result.upsert({
      where: {
        houseId_resultDate: {
          houseId,
          resultDate: new Date(resultDate),
        },
      },
      update: {
        firstRound: firstRound || null,
        secondRound: secondRound || null,
        verified: true,
      },
      create: {
        houseId,
        resultDate: new Date(resultDate),
        firstRound: firstRound || null,
        secondRound: secondRound || null,
        verified: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Result added successfully",
      result,
    });
  } catch (error: any) {
    console.error("Add result error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add result" },
      { status: 500 }
    );
  }
}

// GET - Fetch results
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const houseId = searchParams.get("houseId");
    const date = searchParams.get("date");
    const limit = parseInt(searchParams.get("limit") || "50");

    const where: any = {};
    if (houseId) where.houseId = houseId;
    if (date) {
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);
      where.resultDate = targetDate;
    }

    const results = await prisma.result.findMany({
      where,
      include: {
        house: {
          select: { name: true, nameHindi: true },
        },
      },
      orderBy: { resultDate: "desc" },
      take: limit,
    });

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error("Fetch results error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch results" },
      { status: 500 }
    );
  }
}
