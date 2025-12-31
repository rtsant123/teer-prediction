import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch results from teerresults.com
    // Note: This is a placeholder. You'll need to implement actual scraping
    // based on the website's structure

    const results = await fetchFromTeerResults(today);

    let savedCount = 0;

    for (const result of results) {
      try {
        // Find house by name
        const house = await prisma.house.findFirst({
          where: {
            OR: [
              { name: { contains: result.houseName, mode: "insensitive" } },
              { nameHindi: { contains: result.houseName, mode: "insensitive" } },
            ],
          },
        });

        if (!house) {
          console.log(`House not found for: ${result.houseName}`);
          continue;
        }

        // Save result
        await prisma.result.upsert({
          where: {
            houseId_resultDate: {
              houseId: house.id,
              resultDate: today,
            },
          },
          update: {
            firstRound: result.firstRound,
            secondRound: result.secondRound,
            verified: true,
          },
          create: {
            houseId: house.id,
            resultDate: today,
            firstRound: result.firstRound,
            secondRound: result.secondRound,
            verified: true,
          },
        });

        savedCount++;
      } catch (error) {
        console.error(`Failed to save result for ${result.houseName}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Fetched and saved ${savedCount} results`,
      date: today.toISOString(),
    });
  } catch (error: any) {
    console.error("Fetch results error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch results" },
      { status: 500 }
    );
  }
}

// Fetch results from teerresults.com
async function fetchFromTeerResults(date: Date) {
  // PLACEHOLDER: Implement actual scraping here
  // You can use libraries like cheerio or puppeteer

  // For now, return empty array
  // You'll need to update this with actual scraping logic

  try {
    // Example structure of what the scraper should return:
    /*
    return [
      {
        houseName: "Bhutan Teer",
        firstRound: "46",
        secondRound: "78",
      },
      {
        houseName: "Shillong Teer",
        firstRound: "92",
        secondRound: "45",
      },
      // ... more results
    ];
    */

    // For manual implementation, use the admin API instead
    console.log("Automatic result fetching not yet implemented");
    console.log("Use /api/admin/results POST endpoint to add results manually");

    return [];
  } catch (error) {
    console.error("Error fetching from teerresults.com:", error);
    return [];
  }
}
