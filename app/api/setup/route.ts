import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  try {
    // Check if setup is already done
    const existingUser = await prisma.user.findFirst();
    if (existingUser) {
      return NextResponse.json({
        message: "Database already set up!",
        status: "already_setup",
      });
    }

    // Create Admin User
    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const admin = await prisma.user.create({
      data: {
        username: "admin",
        mobile: "9999999999",
        email: "admin@teerkhela.com",
        password: adminPassword,
        role: "ADMIN",
        isPremium: true,
      },
    });

    // Create Houses
    const houses = [
      { name: "Bhutan Teer", nameHindi: "भूटान तीर", order: 1 },
      { name: "Shillong Teer", nameHindi: "शिलांग तीर", order: 2 },
      { name: "Khanapara Teer", nameHindi: "खानापारा तीर", order: 3 },
      { name: "Juwai Teer", nameHindi: "जुवाई तीर", order: 4 },
    ];

    await prisma.house.createMany({ data: houses });

    // Create Subscription Plans
    const plans = [
      {
        name: "1-Day Plan",
        nameHindi: "1-दिन का प्लान",
        durationDays: 1,
        price: 99,
        description: "Get AI predictions for 1 day",
        descriptionHindi: "1 दिन के लिए AI भविष्यवाणी प्राप्त करें",
        features: ["AI Predictions", "Dream Calculator", "Formula Calculator"],
        order: 1,
      },
      {
        name: "3-Day Plan",
        nameHindi: "3-दिन का प्लान",
        durationDays: 3,
        price: 249,
        description: "Get AI predictions for 3 days - Most Popular!",
        descriptionHindi: "3 दिन के लिए AI भविष्यवाणी प्राप्त करें - सबसे लोकप्रिय!",
        features: ["AI Predictions", "Dream Calculator", "Formula Calculator", "Premium Support"],
        order: 2,
      },
      {
        name: "7-Day Plan",
        nameHindi: "7-दिन का प्लान",
        durationDays: 7,
        price: 499,
        description: "Get AI predictions for 7 days - Best Value!",
        descriptionHindi: "7 दिन के लिए AI भविष्यवाणी प्राप्त करें - सबसे अच्छा मूल्य!",
        features: ["AI Predictions", "Dream Calculator", "Formula Calculator", "Premium Support", "Priority Updates"],
        order: 3,
      },
    ];

    await prisma.subscriptionPlan.createMany({ data: plans });

    // Create Dream Symbols
    const dreamSymbols = [
      { symbol: "Snake", symbolHindi: "सांप", number: "17", category: "Animal" },
      { symbol: "Cat", symbolHindi: "बिल्ली", number: "66", category: "Animal" },
      { symbol: "Dog", symbolHindi: "कुत्ता", number: "45", category: "Animal" },
      { symbol: "Elephant", symbolHindi: "हाथी", number: "78", category: "Animal" },
      { symbol: "Fish", symbolHindi: "मछली", number: "32", category: "Animal" },
      { symbol: "Bird", symbolHindi: "पक्षी", number: "93", category: "Animal" },
      { symbol: "Water", symbolHindi: "पानी", number: "61", category: "Nature" },
      { symbol: "Fire", symbolHindi: "आग", number: "27", category: "Nature" },
      { symbol: "Rain", symbolHindi: "बारिश", number: "84", category: "Nature" },
      { symbol: "Money", symbolHindi: "पैसा", number: "76", category: "Object" },
      { symbol: "Death", symbolHindi: "मृत्यु", number: "16", category: "Event" },
      { symbol: "Wedding", symbolHindi: "शादी", number: "92", category: "Event" },
    ];

    await prisma.dreamSymbol.createMany({ data: dreamSymbols });

    // Create sample results
    const allHouses = await prisma.house.findMany();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const house of allHouses) {
      await prisma.result.create({
        data: {
          houseId: house.id,
          resultDate: today,
          firstRound: Math.floor(Math.random() * 100).toString().padStart(2, "0"),
          secondRound: Math.floor(Math.random() * 100).toString().padStart(2, "0"),
          verified: true,
        },
      });
    }

    // Create sample predictions
    for (const house of allHouses) {
      const predictionTypes = ["DIRECT", "HOUSE", "ENDING", "HOT"];

      for (const type of predictionTypes) {
        const numbers = [];
        for (let i = 0; i < 7; i++) {
          numbers.push(Math.floor(Math.random() * 100).toString().padStart(2, "0"));
        }

        await prisma.prediction.create({
          data: {
            houseId: house.id,
            predictionDate: today,
            predictionType: type,
            numbers: numbers,
            confidence: house.name === "Bhutan Teer" ? "VERY_HIGH" : "HIGH",
            isPublic: true,
            generatedBy: "AI",
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database setup completed successfully!",
      data: {
        admin: { username: admin.username, mobile: admin.mobile },
        houses: houses.length,
        plans: plans.length,
        dreamSymbols: dreamSymbols.length,
      },
    });
  } catch (error: any) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: error.message || "Setup failed" },
      { status: 500 }
    );
  }
}
