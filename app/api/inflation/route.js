import { NextResponse } from 'next/server'
const { startOfDay, subMonths, setDate, format } = require('date-fns');

const INFLATION_URL = "https://www.banxico.org.mx/tipcamb/datosieajax?accion=dato&idSeries=SP30577,SP30578,SP30579,SP74660,SP74661,SP74662,SP74663,SP74664,SP74665&decimales=2,2,2,2,2,2,2,2,2";

const getInflationForLastMonths = async (monthsAgo = 1) => {
  const now = Date.now()
  const dayStart = startOfDay(now)
  const monthStart = setDate(dayStart, 1)

  const lastMonth = subMonths(monthStart, monthsAgo)
  const InflationDate = format(lastMonth, 'dd/MM/yyyy')

  const response = await fetch(`${INFLATION_URL}&fecha=${InflationDate}`)
  const data = await response.json()

  return data.body[1].mensaje
}

export async function GET() {
  const lastMonthInflation = await getInflationForLastMonths(1)
  const latestInflationValue = lastMonthInflation === 'N/E'
    ? await getInflationForLastMonths(2)
    : lastMonthInflation

  return NextResponse.json(latestInflationValue)
}