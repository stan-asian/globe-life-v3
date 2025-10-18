import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://country-code.onrender.com/search");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: { countries: unknown } = await response.json();
    return NextResponse.json(data.countries);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch countries";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
