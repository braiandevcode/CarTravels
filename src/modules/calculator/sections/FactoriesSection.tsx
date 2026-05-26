import { useCalculatorContext } from '../../../core/context/CalculatorContext'
import { Input } from '../../../shared/ui/Input'
import { Button } from '../../../shared/ui/Button'
import { Toggle } from '../../../shared/ui/Toggle'
import { Factory, Trash2, Plus } from 'lucide-react'

let factoryIdCounter = 0

export function FactoriesSection() {
  const { state, dispatch } = useCalculatorContext()

  const addFactory = () => {
    factoryIdCounter++
    dispatch({
      type: 'ADD_FACTORY',
      payload: { id: `factory-${factoryIdCounter}`, name: '', trips: 0, pricePerTrip: 0, discountPerTrip: 0 },
    })
  }

  return (
    <section aria-label="Viajes a fábricas" className="rounded-2xl card-glass card-accent-top p-5 md:p-6 animate-fade-in-up stagger-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue/15">
          <Factory className="h-4.5 w-4.5 text-accent-blue" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-bold text-text-primary font-display tracking-wide">Viajes a Fábricas</h2>
      </div>

      <div className="mb-4 p-3 rounded-xl bg-bg-input border border-border-subtle">
        <Toggle
          label="¿Realizaste viajes a fábricas?"
          enabled={state.showFactories}
          onChange={(v) => dispatch({ type: 'SET_SHOW_FACTORIES', payload: v })}
        />
      </div>

      {state.showFactories && (
        <div className="flex flex-col gap-4 animate-fade-in">
          {state.factories.map((factory) => {
            const factorySubtotal = factory.trips * factory.pricePerTrip
            const discountSubtotal = factory.trips * factory.discountPerTrip

            return (
              <div
                key={factory.id}
                className="rounded-xl border border-border-subtle bg-bg-card-subtle p-4 flex flex-col gap-3 transition-all duration-300 hover:border-border-emphasis animate-fade-in-up"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wide font-display">
                    Fábrica
                  </span>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'REMOVE_FACTORY', payload: factory.id })}
                    className="text-accent-red/70 hover:text-accent-red transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-accent-red/10"
                    aria-label="Eliminar fábrica"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <Input
                  label="Nombre"
                  placeholder="Ej: Fábrica ABC"
                  value={factory.name}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_FACTORY',
                      payload: { ...factory, name: e.target.value },
                    })
                  }
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="N° Viajes"
                    numeric
                    placeholder="0"
                    value={factory.trips || ''}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '')
                      dispatch({
                        type: 'UPDATE_FACTORY',
                        payload: { ...factory, trips: Number(raw) },
                      })
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Precio REAL x Viaje"
                    prefix="$"
                    numeric
                    placeholder="0"
                    value={factory.pricePerTrip || ''}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '')
                      dispatch({
                        type: 'UPDATE_FACTORY',
                        payload: { ...factory, pricePerTrip: Number(raw) },
                      })
                    }}
                  />
                  <Input
                    label="Descuento x Viaje"
                    prefix="$"
                    numeric
                    placeholder="0"
                    value={factory.discountPerTrip || ''}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '')
                      dispatch({
                        type: 'UPDATE_FACTORY',
                        payload: { ...factory, discountPerTrip: Number(raw) },
                      })
                    }}
                  />
                </div>

                <div className="border-t border-border-subtle pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Precio real acumulado</span>
                    <span className={`font-semibold font-display ${factorySubtotal > 0 ? 'text-accent-teal' : 'text-text-muted'}`}>
                      +${factorySubtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Descuento acumulado</span>
                    <span className={`font-semibold font-display ${discountSubtotal > 0 ? 'text-accent-red' : 'text-text-muted'}`}>
                      -${discountSubtotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}

          <Button variant="ghost" onClick={addFactory}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Agregar Fábrica
          </Button>
        </div>
      )}
    </section>
  )
}
