import Input from '../../../shared/ui/Input'
import HelpHint from '../../../shared/ui/HelpHint'
import InfoReveal from '../../../shared/ui/InfoReveal'
import { CheckCircle2, Trash2, Save, Edit } from 'lucide-react'
import type { IVoucherTrip } from '../../../core/types/calculator'
import type { TAction } from '../../../core/types/action'
import { useCallback, type ChangeEvent, type Dispatch, type ReactNode } from 'react'
import useVoucherDraft from '../hooks/useVoucherDraft'

interface IVoucherCardProps {
  voucher: IVoucherTrip
  dispatch: Dispatch<TAction>
  saveVoucher: (id: string) => void
}

const VoucherCard = ({ voucher, dispatch, saveVoucher }: IVoucherCardProps): ReactNode => {
  const {
    currentVoucher,
    subtotal,
    fixedFeeSubtotal,
    voucherErrors,
    CAN_SAVE,
    IS_READ_ONLY,
    SHOULD_SHOW_ACTION_BUTTON,
    ACTION_LABEL,
    feedbackMessage,
    isEditing,
    handleTypeChange,
    handleNameChange,
    handleNumericChange,
    handleEdit,
    handleSave,
    handleRemove,
  } = useVoucherDraft({ voucher, dispatch, saveVoucher })

  const handleNumericTripsChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    handleNumericChange('trips', e.target.value)
  }, [handleNumericChange])

  const handleNumericPriceChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    handleNumericChange('pricePerTrip', e.target.value)
  }, [handleNumericChange])

  const handleNumericFixedFeeChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    handleNumericChange('fixedFeePerTrip', e.target.value)
  }, [handleNumericChange])

  return (
    <div className="rounded-xl border border-border-subtle bg-bg-card-subtle p-4 flex flex-col gap-3 transition-all duration-300 hover:border-border-emphasis animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <select
            value={currentVoucher.type}
            onChange={handleTypeChange}
            disabled={IS_READ_ONLY}
            className="rounded-lg border-2 border-accent-amber/35 bg-bg-card px-3 py-2 text-sm font-semibold text-text-primary font-display outline-none focus:ring-2 focus:ring-accent-amber/50 focus:border-accent-amber/50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:border-border-subtle disabled:bg-bg-input"
            aria-label="Tipo de vale"
          >
            <option value="factory">Fábrica</option>
            <option value="other">Otro</option>
          </select>
          <InfoReveal text="Elige el tipo de vale a crear" className="text-accent-amber/70" align="start" side="bottom" />
        </div>
        {voucher.saved && !isEditing && (
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 animate-fade-in">
              <button
                type="button"
                onClick={handleEdit}
                className="p-2 rounded-lg border border-border-subtle bg-bg-card/60 text-accent-amber hover:text-accent-amber-soft hover:bg-accent-amber/10 hover:border-accent-amber/30 transition-all cursor-pointer"
                aria-label="Editar vale"
              >
                <Edit className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 rounded-lg border border-border-subtle bg-bg-card/60 text-accent-red hover:text-accent-red-soft hover:bg-accent-red/10 hover:border-accent-red/30 transition-all cursor-pointer"
                aria-label="Eliminar vale"
              >
                <Trash2 className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <InfoReveal text="Edita o elimina el vale" align="end" side="bottom" />
          </div>
        )}
      </div>

      <Input
        label="Nombre cliente/entidad"
        placeholder="Ej: Cliente X"
        value={currentVoucher.name}
        onChange={handleNameChange}
        disabled={IS_READ_ONLY}
      />

      <Input
        label="Cantidad de Viajes"
        numeric
        placeholder="0"
        maxLength={2}
        value={currentVoucher.trips || ''}
        onChange={handleNumericTripsChange}
        error={voucherErrors.trips}
        disabled={IS_READ_ONLY}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Precio real"
          prefix="$"
          numeric
          placeholder="0"
          value={currentVoucher.pricePerTrip || ''}
          onChange={handleNumericPriceChange}
          disabled={IS_READ_ONLY}
        />
        {currentVoucher.type === 'factory' && (
          <Input
            label="precio planilla"
            prefix="$"
            numeric
            placeholder="0"
            value={currentVoucher.fixedFeePerTrip || ''}
            onChange={handleNumericFixedFeeChange}
            disabled={IS_READ_ONLY}
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
        {currentVoucher.type === 'factory' && fixedFeeSubtotal > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Fijo planilla acumulado</span>
            <span className="font-semibold font-display text-orange-400">
              +${fixedFeeSubtotal.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {feedbackMessage && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2 rounded-lg border border-accent-teal/20 bg-accent-teal/10 px-3 py-2 text-xs font-semibold text-accent-teal font-display animate-fade-in"
        >
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          {feedbackMessage}
        </div>
      )}

      {SHOULD_SHOW_ACTION_BUTTON && (
        <div className="mt-1 flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={!CAN_SAVE}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-bold transition-all duration-200 active:scale-[0.98] cursor-pointer font-display ${
              CAN_SAVE
                ? 'border-accent-teal/50 bg-accent-teal/30 text-accent-teal hover:bg-accent-teal/40 hover:border-accent-teal/70'
                : 'border-border-subtle bg-bg-input/40 text-text-muted/50 opacity-40 cursor-not-allowed'
            }`}
            aria-label={`${ACTION_LABEL} vale`}
          >
            <Save className="h-3.5 w-3.5" aria-hidden="true" />
            {ACTION_LABEL}
          </button>
          <HelpHint text="Completá nombre, viajes y precio real para habilitar el guardado. El vale persiste al recargar la página solo si está guardado." side="top" align="end" />
        </div>
      )}
    </div>
  )
}

export default VoucherCard
