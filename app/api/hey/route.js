import { NextResponse } from 'next/server'
import { scrapePage } from "../helpers/scrape";

const scrapedDaily = async () => {
  return await scrapePage({
    url: "https://banco.hey.inc/productos/ahorro-hey",
    getContent: () => [
      parseFloat(document.querySelector('section:nth-child(1)').textContent.match(/(\d?\.?\d.*?)%/g)[0])
    ],
    getSolution: (content) => ({
      '1': content
    })
  })
}

const scrapedRest = async () => {
  return await scrapePage({
    url: "https://banco.hey.inc/personas/inversion",
    getContent: () => [
      parseFloat(document.querySelector('section:nth-child(8) .bullets-hey:nth-child(2)').textContent.match(/(\d?\.?\d.*?)%/g)[0])
    ],
    getSolution: (content) => ({
      '7': content
    })
  })
}

export async function GET() {
  return NextResponse.json({ hey: {
      ...await scrapedDaily(),
      ...await scrapedRest(),
    } })
}
