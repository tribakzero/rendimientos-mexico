"use client";

import { Header, Rate, Footer } from './components'
import {useEffect, useState} from "react";

export default function Home() {
  const [data, setData] = useState({
    inflation: null,
    instruments: {}
  })

  useEffect(() => {
    fetch(`/api/inflation`)
      .then((res) => res.json())
      .then((response) => setData(data => ({...data, inflation: parseFloat(response)})))

    const products = [
      'cetes',
      'dinn',
      'finsus',
      'hey',
      'heypro',
      'kubofinanciero',
      'smartcash',
      'supertasas',
    ]

    products.forEach(product => fetch(`/api/${product}`)
      .then((res) => res.json())
      .then((response) => setData(data => ({...data, instruments: { ...data.instruments, ...response }})))
    )
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 flex-col mx-4 my-4 text-center">
        <Header />
        {(data.inflation && !!data.instruments) ? (
            <>
              <table className="text-center table-fixed overflow-x-auto max-w-full border-collapse mb-4 block lg:table">
                <thead>
                <tr className="border-b border-gray-500">
                  <th className="min-w-8 p-2">Instrumento</th>
                  <th className="min-w-8 p-2">Diario</th>
                  <th className="min-w-8 p-2">7 días</th>
                  <th className="min-w-8 p-2">1 mes</th>
                  <th className="min-w-8 p-2">2 meses</th>
                  <th className="min-w-8 p-2">3 meses</th>
                  <th className="min-w-8 p-2">6 meses</th>
                  <th className="min-w-8 p-2">9 meses</th>
                  <th className="min-w-8 p-2">1 año</th>
                  <th className="min-w-8 p-2">1 año (interés mensual)</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(data.instruments).map(([name, instrument]) => (
                  <tr key={name} className="border-b border-gray-300">
                    <td className="min-w-8 p-2">
                      <img
                        src={`/images/${name}.png`}
                        alt={name}
                        title={name}
                        className="m-auto"
                        style={{'filter': `drop-shadow(0 0 2px white)
                          drop-shadow(1px 1px 0 white)
                          drop-shadow(-1px 1px 0 white)
                          drop-shadow(1px -1px 0 white)
                          drop-shadow(-1px -1px 0 white)`}}
                        width="100"
                        height="50"
                      />
                    </td>
                    <td className="min-w-8 p-2"><Rate value={instrument['1']} inflation={data.inflation} /></td>
                    <td className="min-w-8 p-2"><Rate value={instrument['7']} inflation={data.inflation} /></td>
                    <td className="min-w-8 p-2"><Rate value={instrument['28']} inflation={data.inflation} /></td>
                    <td className="min-w-8 p-2"><Rate value={instrument['60']} inflation={data.inflation} /></td>
                    <td className="min-w-8 p-2"><Rate value={instrument['90']} inflation={data.inflation} /></td>
                    <td className="min-w-8 p-2"><Rate value={instrument['180']} inflation={data.inflation} /></td>
                    <td className="min-w-8 p-2"><Rate value={instrument['270']} inflation={data.inflation} /></td>
                    <td className="min-w-8 p-2"><Rate value={instrument['365']} inflation={data.inflation} /></td>
                    <td className="min-w-8 p-2"><Rate value={instrument['365_2']} inflation={data.inflation} /></td>
                  </tr>
                ))}
                </tbody>
              </table>
              <div className="flex flex-col text-left">
                <span><strong>Inflación anualizada actual:</strong> {data.inflation}%</span>
                <span><strong className="text-red-500">Rojo:</strong> Rendimiento inferior o igual a la inflación.</span>
                <span><strong className="text-green-500">Verde:</strong> Rendimiento superior a la inflación.</span>
              </div>
            </>
          )
          : (<div>Cargando...</div>)
        }
      </main>

      <Footer />
    </div>
  )
}
