import { NextResponse } from 'next/server'
import { scrapePage } from "../helpers/scrape";

const scraped = async () => {
  return await scrapePage({
    url: "https://finsus.mx/",
    getContent: () => document.querySelector('.home-savings').textContent.match(/(\d?\.?\d.*?)%/g)[1],
    getSolution: (content) => ({
      '1': parseFloat(content)
    })
  })
}

const fetched = async () => {
  const response = await fetch("https://www.dimmerapp.com/InvestmentRates/search/all", {method: 'POST'});
  const data = await response.json();

  return {
    '7': parseFloat(data.ratesList[0].rate),
    '28': parseFloat(data.ratesList[1].rate),
    '60': parseFloat(data.ratesList[2].rate),
    '90': parseFloat(data.ratesList[3].rate),
    '180': parseFloat(data.ratesList[4].rate),
    '270': parseFloat(data.ratesList[5].rate),
    '365': parseFloat(data.ratesList[6].rate),
    '365_2': parseFloat(data.ratesList[6].rate),
  }
}

export async function GET() {
  return NextResponse.json({ finsus: {
      ...await scraped(),
      ...await fetched(),
    } })
}
