import { NextResponse } from 'next/server'
import { scrapePage } from "../helpers/scrape";

// TODO: Kubo Financiero has a complex set of rates

const scrapedDaily = async () => {
  return await scrapePage({
    url: "https://www.kubofinanciero.com/ley-transparencia/kubo-ahorro-tasas",
    getContent: () => document.querySelector('.ahorro-tasas b').textContent,
    getSolution: (content) => ({
      '1': parseFloat(content)
    })
  })
}

const scrapedRest = async () => {
  return await scrapePage({
    url: "https://www.kubofinanciero.com/ley-transparencia/kubo-plazofijo-tasas",
    getContent: () => Array.from(document.querySelectorAll('.kds-plazo-fijo-tables .kds-table-informative:nth-child(1) .kds-ti-body')).map(item => item.querySelector('.kds-detail-table:nth-child(2)').textContent),
    getSolution: (content) => ({
      '7': parseFloat(content[1]),
      '28': parseFloat(content[3]),
      '60': parseFloat(content[4]),
      '90': parseFloat(content[5]),
      '180': parseFloat(content[8]),
      '270': parseFloat(content[11]),
      '365': parseFloat(content[14])
    })
  })
}

export async function GET() {
  return NextResponse.json({ kubofinanciero: {
      ...await scrapedDaily(),
      ...await scrapedRest(),
    } })
}
