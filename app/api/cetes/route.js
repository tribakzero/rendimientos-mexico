import { NextResponse } from 'next/server'

const fetched = async () => {
  const response = await fetch("https://www.cetesdirecto.com/sites/cetes/ticker.json");
  const data = await response.json();

  return {
    '1': parseFloat(data.datos[12].porcentaje),
    '28': parseFloat(data.datos[0].porcentaje),
    '90': parseFloat(data.datos[1].porcentaje),
    '180': parseFloat(data.datos[2].porcentaje),
    '365': parseFloat(data.datos[3].porcentaje),
  }
}

export async function GET() {
  return NextResponse.json({ cetesdirecto: { ...await fetched() } })
}
