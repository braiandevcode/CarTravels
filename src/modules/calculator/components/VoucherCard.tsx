import Input from '../../../shared/ui/Input'
import HelpHint from '../../../shared/ui/HelpHint'
import { Trash2, Save } from 'lucide-react'
import type { IVoucherTrip } from '../../../core/types/calculator'
import type { TAction } from '../../../core/types/action'
import type { ReactNode } from 'react'

interface IVoucherErrors {
  trips?: string
  name?: string
}

interface IVoucherCardProps {
  voucher: IVoucherTrip
  errors: Record<string, IVoucherErrors | undefined>
  updateVoucher: (voucher: IVoucherTrip, field: string, raw: string) => void
  dispatch: React.Dispatch<TAction>
  saveVoucher: (id: string) => void
}

const VoucherCard = ({ voucher, errors, updateVoucher, dispatch, saveVoucher }: IVoucherCardProps): ReactNode => {
  const subtotal: number = voucher.trips * voucher.pricePerTrip
  const fixedFeeSubtotal: number = voucher.type === 'factory' ? voucher.trips * voucher.fixedFeePerTrip : 0
  const voucherErrors: IVoucherErrors = (errors[voucher.id] ?? {}) as IVoucherErrors
  const CAN_SAVE: boolean = voucher.trips > 0 && voucher.pricePerTrip > 0 && voucher.name.trim().length > 0

  return (
    <div className="rounded-xl border border-border-subtle bg-bg-card-subtle p-4 flex flex-col gap-3 transition-all duration-300 hover:border-border-emphasis animate-fade-in-up">
      <div className="flex items-center justify-between">
        <select
          value={voucher.type}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_VOUCHER',
              payload: {
                ...voucher,
                type: e.target.value as 'factory' | 'other',
                fixedFeePerTrip: e.target.value === 'other' ? 0 : voucher.fixedFeePerTrip,
              },
            })
          }
          className="rounded-lg border border-border-subtle bg-bg-input px-3 py-1.5 text-sm font-medium text-text-primary font-display outline-none focus:ring-2 focus:ring-accent-amber/50 cursor-pointer"
          aria-label="Tipo de vale"
        >
          <option value="factory">Fábrica</option>
          <option value="other">Otro</option>
        </select>
        {voucher.saved && (
          <button
            type="button"
            onClick={() => dispatch({ type: 'REMOVE_VOUCHER', payload: voucher.id })}
            className="text-accent-red/70 hover:text-accent-red transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-accent-red/10 animate-fade-in"
            aria-label="Eliminar vale"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <Input
        label="Nombre cliente/entidad"
        placeholder="Ej: Cliente X"
        value={voucher.name}
        onChange={(e) => {
          dispatch({
            type: 'UPDATE_VOUCHER',
            payload: { ...voucher, name: e.target.value },
          })
        }}
      />

      <Input
        label="Cantidad de Viajes"
        numeric
        placeholder="0"
        maxLength={2}
        value={voucher.trips || ''}
        onChange={(e) => updateVoucher(voucher, 'trips', e.target.value)}
        error={voucherErrors.trips}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Precio real"
          prefix="$"
          numeric
          placeholder="0"
          value={voucher.pricePerTrip || ''}
          onChange={(e) => updateVoucher(voucher, 'pricePerTrip', e.target.value)}
        />
        {voucher.type === 'factory' && (
          <Input
            label="precio planilla"
            prefix="$"
            numeric
            placeholder="0"
            value={voucher.fixedFeePerTrip || ''}
            onChange={(e) => updateVoucher(voucher, 'fixedFeePerTrip', e.target.value)}
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
        {voucher.type === 'factory' && fixedFeeSubtotal > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Fijo planilla acumulado</span>
            <span className="font-semibold font-display text-orange-400">
              +${fixedFeeSubtotal.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      <div className="mt-1 flex items-center gap-2">
        <button
          type="button"
          onClick={() => saveVoucher(voucher.id)}
          disabled={!CAN_SAVE}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-subtle bg-bg-input/40 px-3 py-2 text-sm font-medium text-accent-teal transition-all duration-200 hover:border-accent-teal/30 hover:bg-accent-teal/5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border-subtle disabled:hover:bg-bg-input/40 cursor-pointer font-display"
          aria-label={voucher.saved ? 'Actualizar vale' : 'Guardar vale'}
        >
          <Save className="h-3.5 w-3.5" aria-hidden="true" />
          {voucher.saved ? 'Actualizar' : 'Guardar'}
        </button>
        <HelpHint text="Completá nombre, viajes y precio real para habilitar el guardado. El vale persiste al recargar la página solo si está guardado." side="top" />
      </div>
    </div>
  )
}

export default VoucherCard
