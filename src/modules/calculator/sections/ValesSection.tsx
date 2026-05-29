import { useState } from 'react'
import useCalculatorContext from '../../../core/context/CalculatorContext'
import Input from '../../../shared/ui/Input'
import Button from '../../../shared/ui/Button'
import Toggle from '../../../shared/ui/Toggle'
import { Trash2, Plus } from 'lucide-react'
import { validateTrips } from '../../../core/schemas/calculator.schema'
import type { ValeTrip } from '../../../core/types/calculator'

let valeIdCounter: number = 0

const defaultVale = (): ValeTrip => ({
  id: `vale-${++valeIdCounter}`,
  type: 'fabrica',
  name: '',
  trips: 0,
  pricePerTrip: 0,
  discountPerTrip: 0,
})

interface ValeErrors {
  trips?: string
  name?: string
}

const ValesSection = () => {
  const { state, dispatch } = useCalculatorContext()
  const [errors, setErrors] = useState<Record<string, ValeErrors>>({})

  const addVale = (): void => {
    dispatch({ type: 'ADD_VALE', payload: defaultVale() })
  }

  const updateVale = (vale: ValeTrip, field: string, raw: string): void => {
    let parsed: string | number = raw

    if (field === 'trips') {
      const cleaned = raw.replace(/\D/g, '').slice(0, 2)
      parsed = Math.min(Number(cleaned), 99)

      const error = validateTrips(parsed)
      setErrors((prev) => ({
        ...prev,
        [vale.id]: { ...prev[vale.id], trips: error ?? undefined },
      }))
    }

    if (field === 'pricePerTrip' || field === 'discountPerTrip') {
      parsed = Number(raw.replace(/\D/g, ''))
    }

    dispatch({
      type: 'UPDATE_VALE',
      payload: { ...vale, [field]: parsed },
    })
  }

  return (
    <>

      <div className="mb-4 p-3 rounded-xl bg-bg-input border border-border-subtle">
        <Toggle
          label="¿Tuviste viajes con vale?"
          enabled={state.showVales}
          onChange={(v) => dispatch({ type: 'SET_SHOW_VALES', payload: v })}
        />
      </div>

      {state.showVales && (
        <div className="flex flex-col gap-4 animate-fade-in">
          {state.vales.map((vale) => {
            const subtotal: number = vale.trips * vale.pricePerTrip
            const discountSubtotal: number = vale.type === 'fabrica' ? vale.trips * vale.discountPerTrip : 0
            const valeErrors = errors[vale.id] || {}

            return (
              <div
                key={vale.id}
                className="rounded-xl border border-border-subtle bg-bg-card-subtle p-4 flex flex-col gap-3 transition-all duration-300 hover:border-border-emphasis animate-fade-in-up"
              >
                <div className="flex items-center justify-between">
                  <select
                    value={vale.type}
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_VALE',
                        payload: {
                          ...vale,
                          type: e.target.value as 'fabrica' | 'otro',
                          discountPerTrip: e.target.value === 'otro' ? 0 : vale.discountPerTrip,
                        },
                      })
                    }
                    className="rounded-lg border border-border-subtle bg-bg-input px-3 py-1.5 text-sm font-medium text-text-primary font-display outline-none focus:ring-2 focus:ring-accent-amber/50 cursor-pointer"
                    aria-label="Tipo de vale"
                  >
                    <option value="fabrica">Fábrica</option>
                    <option value="otro">Otro</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'REMOVE_VALE', payload: vale.id })}
                    className="text-accent-red/70 hover:text-accent-red transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-accent-red/10"
                    aria-label="Eliminar vale"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <Input
                  label="Nombre"
                  placeholder="Ej: Cliente X"
                  value={vale.name}
                  onChange={(e) => {
                    dispatch({
                      type: 'UPDATE_VALE',
                      payload: { ...vale, name: e.target.value },
                    })
                  }}
                />

                <Input
                  label="N° Viajes"
                  numeric
                  placeholder="0"
                  maxLength={2}
                  value={vale.trips || ''}
                  onChange={(e) => updateVale(vale, 'trips', e.target.value)}
                  error={valeErrors.trips}
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Precio real x Viaje"
                    prefix="$"
                    numeric
                    placeholder="0"
                    value={vale.pricePerTrip || ''}
                    onChange={(e) => updateVale(vale, 'pricePerTrip', e.target.value)}
                  />
                  {vale.type === 'fabrica' && (
                    <Input
                      label="Descuento x Viaje"
                      prefix="$"
                      numeric
                      placeholder="0"
                      value={vale.discountPerTrip || ''}
                      onChange={(e) => updateVale(vale, 'discountPerTrip', e.target.value)}
                    />
                  )}
                </div>

                <div className="border-t border-border-subtle pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Precio real acumulado</span>
                    <span className={`font-semibold font-display ${subtotal > 0 ? 'text-accent-teal' : 'text-text-muted'}`}>
                      +${subtotal.toLocaleString()}
                    </span>
                  </div>
                  {vale.type === 'fabrica' && discountSubtotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Descuento acumulado</span>
                      <span className="font-semibold font-display text-accent-red">
                        -${discountSubtotal.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          <Button variant="ghost" onClick={addVale}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Agregar Vale
          </Button>
        </div>
      )}
    </>
  )
}

export default ValesSection
