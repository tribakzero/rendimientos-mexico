import { NextResponse } from 'next/server'
import { scrapePage } from "../helpers/scrape";

const scraped = async () => {
  return await scrapePage({
    url: "https://supertasas.com/inversion/",
    getContent: () => Array.from(document.getElementById('plazo').options).map(item => item.value),
    getSolution: (content) => ({
      '1': parseFloat(content[0]),
      '90': parseFloat(content[1]),
      '180': parseFloat(content[2]),
      '365_2': parseFloat(content[3]),
      '365': parseFloat(content[4])
    })
  })
}

export async function GET() {
  return NextResponse.json({ supertasas: { ...await scraped() } })
}
