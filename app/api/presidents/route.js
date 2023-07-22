import { NextResponse } from "next/server";

const data = [
  { name: "Gokiburi", period: "2021-" },
  { name: "Trump", period: "2017-2021" },
  { name: "Obama", period: "2009-2017" },
];

export async function GET(request) {
  return NextResponse.json(data);
}
