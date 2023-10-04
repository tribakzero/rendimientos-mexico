import { NextResponse } from 'next/server'
import { scrapePage } from "../helpers/scrape";

const scraped = async () => {
  return await scrapePage({
    url: "https://nu.com.mx/cuenta/",
    getContent: () => document.querySelector('h2').textContent.match(/(\d?\.?\d.*?)%/g)[0],
    getSolution: (content) => ({
      '1': parseFloat(content),
    })
  })
}

export async function GET() {
  return NextResponse.json({ nu: { ...await scraped() } })
}
