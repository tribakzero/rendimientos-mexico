import { NextResponse } from 'next/server'
import { scrapePage } from "../helpers/scrape";

const scraped = async () => {
  return await scrapePage({
    url: "https://dinn.com.mx/cuenta-de-debito",
    getContent: () => document.querySelector('.ahorra-disclaimer').textContent.match(/(\d?\.?\d.*?)%/g)[0],
    getSolution: (content) => ({
      '1': parseFloat(content),
    })
  })
}

export async function GET() {
  return NextResponse.json({ dinn: { ...await scraped() } })
}
