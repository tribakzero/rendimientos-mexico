import { NextResponse } from 'next/server'
import { scrapePage } from "../helpers/scrape";

const scraped = async () => {
  return await scrapePage({
    url: "https://banco.hey.inc/productos/inversion-hey",
    getContent: () => [
      parseFloat(document.querySelector('h1').textContent.match(/(\d?\.?\d.*?)%/g)[0])
    ],
    getSolution: (content) => ({
      '7': content
    })
  })
}

export async function GET() {
  return NextResponse.json({ heypro: { ...await scraped() } })
}
