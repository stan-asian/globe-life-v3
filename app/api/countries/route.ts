import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://country-code.onrender.com/search");
    const data = await response.json();
    return NextResponse.json(data.countries);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}
