import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as cheerio from "cheerio";

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log("Starting to fetch results from teerresults.com...");

    // Fetch results from teerresults.com
    const results = await fetchFromTeerResults();

    if (results.length === 0) {
      console.log("No results found or unable to scrape");
      return NextResponse.json({
        success: false,
        message: "No results found. Website may have changed structure.",
        date: today.toISOString(),
      });
    }

    let savedCount = 0;

    for (const result of results) {
      try {
        // Find house by name (case insensitive matching)
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

        // Skip if results are placeholder (xx or empty)
        if (
          !result.firstRound ||
          !result.secondRound ||
          result.firstRound === "xx" ||
          result.secondRound === "xx" ||
          result.firstRound.length !== 2 ||
          result.secondRound.length !== 2
        ) {
          console.log(`Invalid results for ${result.houseName}: FR=${result.firstRound}, SR=${result.secondRound}`);
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
        console.log(`Saved result for ${result.houseName}: FR=${result.firstRound}, SR=${result.secondRound}`);
      } catch (error) {
        console.error(`Failed to save result for ${result.houseName}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully fetched and saved ${savedCount} out of ${results.length} results`,
      date: today.toISOString(),
      results: results,
    });
  } catch (error: any) {
    console.error("Fetch results error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch results" },
      { status: 500 }
    );
  }
}

// Scrape results from teerresults.com
async function fetchFromTeerResults() {
  try {
    console.log("Fetching from https://www.teerresults.com/");

    const response = await fetch("https://www.teerresults.com/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const results: Array<{
      houseName: string;
      firstRound: string;
      secondRound: string;
    }> = [];

    // Strategy 1: Look for tables with teer results
    $("table").each((_, table) => {
      const tableText = $(table).text();

      // Check if this table contains teer results
      if (tableText.includes("FR") || tableText.includes("SR") || tableText.includes("First Round") || tableText.includes("Second Round")) {
        // Try to extract house name from preceding heading or within table
        let houseName = "";
        const prevHeading = $(table).prevAll("h2, h3, h4").first().text().trim();
        if (prevHeading) {
          houseName = prevHeading;
        }

        // Extract FR and SR from table cells
        let fr = "";
        let sr = "";

        $(table).find("td, th").each((_, cell) => {
          const text = $(cell).text().trim();
          const nextCell = $(cell).next();
          const nextText = nextCell.text().trim();

          // Look for FR/SR patterns
          if (text.includes("FR") || text.toLowerCase().includes("first")) {
            fr = nextText;
          }
          if (text.includes("SR") || text.toLowerCase().includes("second")) {
            sr = nextText;
          }

          // Also check if cell contains just numbers (2 digits)
          if (/^\d{2}$/.test(text)) {
            if (!fr) fr = text;
            else if (!sr) sr = text;
          }
        });

        if (houseName && (fr || sr)) {
          results.push({
            houseName: cleanHouseName(houseName),
            firstRound: fr || "xx",
            secondRound: sr || "xx",
          });
        }
      }
    });

    // Strategy 2: Look for specific house name patterns in text
    const housePatterns = [
      "Juwai Teer",
      "Shillong Teer",
      "Khanapara Teer",
      "Bhutan Teer",
      "Night Teer",
    ];

    housePatterns.forEach((pattern) => {
      // Check if we already have this house
      if (results.some((r) => r.houseName.includes(pattern.replace(" Teer", "")))) {
        return;
      }

      // Look for the pattern in the HTML
      const regex = new RegExp(`${pattern}.*?FR.*?(\\d{2}).*?SR.*?(\\d{2})`, "is");
      const match = html.match(regex);

      if (match) {
        results.push({
          houseName: pattern,
          firstRound: match[1],
          secondRound: match[2],
        });
      }
    });

    console.log(`Extracted ${results.length} results from website`);
    results.forEach((r) => {
      console.log(`${r.houseName}: FR=${r.firstRound}, SR=${r.secondRound}`);
    });

    return results;
  } catch (error) {
    console.error("Error fetching from teerresults.com:", error);
    return [];
  }
}

// Clean house name for matching
function cleanHouseName(name: string): string {
  return name
    .replace(/teer/i, "")
    .replace(/\s+/g, " ")
    .trim();
}
