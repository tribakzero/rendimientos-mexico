import { NextResponse } from 'next/server'
import { scrapePage } from "../helpers/scrape";

const scraped = async () => {
  return await scrapePage({
    url: "https://gbm.com/plus/smart-cash/",
    getContent: () => document.querySelector('.datosmart3').textContent.match(/ (\d.*?)%/)[1],
    getSolution: (content) => ({
      1: parseFloat(content)
    })
  })
}

export async function GET() {
  return NextResponse.json({ smartcash: { ...await scraped() } })
}
