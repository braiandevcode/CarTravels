import Input from '../../../shared/ui/Input'
import HelpHint from '../../../shared/ui/HelpHint'
import { CheckCircle2, Trash2, Save, Edit } from 'lucide-react'
import type { IVoucherTrip } from '../../../core/types/calculator'
import type { TAction } from '../../../core/types/action'
import { validateTrips } from '../../../core/schemas/calculator.schema'
import { useCallback, useEffect, useState, type ChangeEvent, type Dispatch, type ReactNode } from 'react'

type TVoucherEditableField = keyof Pick<IVoucherTrip, 'trips' | 'pricePerTrip' | 'fixedFeePerTrip'>

const hasVoucherChanges = (draftVoucher: IVoucherTrip, savedVoucher: IVoucherTrip): boolean => (
  draftVoucher.type !== savedVoucher.type ||
  draftVoucher.name !== savedVoucher.name ||
  draftVoucher.trips !== savedVoucher.trips ||
  draftVoucher.pricePerTrip !== savedVoucher.pricePerTrip ||
  draftVoucher.fixedFeePerTrip !== savedVoucher.fixedFeePerTrip
)

interface IVoucherErrors {
  trips?: string
  name?: string
}

interface IVoucherCardProps {
  voucher: IVoucherTrip
  errors: Record<string, IVoucherErrors | undefined>
  dispatch: Dispatch<TAction>
  saveVoucher: (id: string) => void
}

const VoucherCard = ({ voucher, errors, dispatch, saveVoucher }: IVoucherCardProps): ReactNode => {
  const [draftVoucher, setDraftVoucher] = useState<IVoucherTrip>(voucher)
  const [isEditing, setIsEditing] = useState<boolean>(!voucher.saved)
  const [draftTripError, setDraftTripError] = useState<string | undefined>()
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

  const currentVoucher: IVoucherTrip = isEditing ? draftVoucher : voucher
  const subtotal: number = currentVoucher.trips * currentVoucher.pricePerTrip
  const fixedFeeSubtotal: number = currentVoucher.type === 'factory' ? currentVoucher.trips * currentVoucher.fixedFeePerTrip : 0
  const voucherErrors: IVoucherErrors = {
    ...((errors[voucher.id] ?? {}) as IVoucherErrors),
    trips: draftTripError ?? errors[voucher.id]?.trips,
  }
  const HAS_CHANGES: boolean = voucher.saved ? hasVoucherChanges(draftVoucher, voucher) : true
  const HAS_REQUIRED_FIELDS: boolean = currentVoucher.trips > 0 && currentVoucher.pricePerTrip > 0 && currentVoucher.name.trim().length > 0
  const CAN_SAVE: boolean = HAS_REQUIRED_FIELDS && HAS_CHANGES
  const IS_READ_ONLY: boolean = voucher.saved && !isEditing
  const SHOULD_SHOW_ACTION_BUTTON: boolean = !voucher.saved || isEditing
  const ACTION_LABEL: string = voucher.saved ? 'Actualizar' : 'Guardar'

  const CLEAR_FEEDBACK_MESSAGE = (): (() => void) | undefined => {
    if (!feedbackMessage) return undefined

    const timerId: number = window.setTimeout(() => {
      setFeedbackMessage(null)
    }, 1800)

    return () => window.clearTimeout(timerId)
  }
  useEffect(CLEAR_FEEDBACK_MESSAGE, [feedbackMessage])

  const showFeedback = useCallback((message: string): void => {
    setFeedbackMessage(message)
  }, [])

  const parseNumericField = (field: TVoucherEditableField, raw: string): number => {
    if (field === 'trips') {
      const cleaned: string = raw.replace(/\D/g, '').slice(0, 2)
      return Math.min(Number(cleaned), 99)
    }

    return Number(raw.replace(/\D/g, ''))
  }

  const updateDraft = useCallback((nextVoucher: IVoucherTrip): void => {
    setDraftVoucher(nextVoucher)

    if (!voucher.saved) {
      dispatch({ type: 'UPDATE_VOUCHER', payload: nextVoucher })
      return
    }

    const hasPendingChanges: boolean = hasVoucherChanges(nextVoucher, voucher)
    if (voucher.editing !== hasPendingChanges) {
      dispatch({ type: 'UPDATE_VOUCHER', payload: { ...voucher, editing: hasPendingChanges } })
    }
  }, [dispatch, voucher])

  const handleTypeChange = useCallback((event: ChangeEvent<HTMLSelectElement>): void => {
    const nextType: IVoucherTrip['type'] = event.target.value as IVoucherTrip['type']
    const nextVoucher: IVoucherTrip = {
      ...currentVoucher,
      type: nextType,
      fixedFeePerTrip: nextType === 'other' ? 0 : currentVoucher.fixedFeePerTrip,
    }

    updateDraft(nextVoucher)
  }, [currentVoucher, updateDraft])

  const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    updateDraft({ ...currentVoucher, name: event.target.value })
  }, [currentVoucher, updateDraft])

  const handleNumericChange = useCallback((field: TVoucherEditableField, raw: string): void => {
    const parsed: number = parseNumericField(field, raw)
    const nextVoucher: IVoucherTrip = { ...currentVoucher, [field]: parsed }

    if (field === 'trips') {
      const error: string | null = validateTrips(parsed)
      setDraftTripError(error ?? undefined)
    }

    updateDraft(nextVoucher)
  }, [currentVoucher, updateDraft])

  const handleEdit = useCallback((): void => {
    setDraftVoucher(voucher)
    setIsEditing(true)
    setFeedbackMessage(null)
  }, [voucher])

  const handleSave = useCallback((): void => {
    if (!CAN_SAVE) return

    if (voucher.saved) {
      dispatch({ type: 'UPDATE_VOUCHER', payload: { ...draftVoucher, saved: true, editing: false } })
      setIsEditing(false)
      showFeedback('Vale actualizado')
      return
    }

    saveVoucher(voucher.id)
    setIsEditing(false)
    showFeedback('Vale guardado')
  }, [CAN_SAVE, dispatch, draftVoucher, saveVoucher, showFeedback, voucher.id, voucher.saved])

  return (
    <div className="rounded-xl border border-border-subtle bg-bg-card-subtle p-4 flex flex-col gap-3 transition-all duration-300 hover:border-border-emphasis animate-fade-in-up">
      <div className="flex items-center justify-between">
        <select
          value={currentVoucher.type}
          onChange={handleTypeChange}
          disabled={IS_READ_ONLY}
          className="rounded-lg border border-border-subtle bg-bg-input px-3 py-1.5 text-sm font-medium text-text-primary font-display outline-none focus:ring-2 focus:ring-accent-amber/50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
          aria-label="Tipo de vale"
        >
          <option value="factory">Fábrica</option>
          <option value="other">Otro</option>
        </select>
        {voucher.saved && !isEditing && (
          <div className="flex items-center gap-1 animate-fade-in">
            <button
              type="button"
              onClick={handleEdit}
              className="text-accent-amber/80 hover:text-accent-amber transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-accent-amber/10"
              aria-label="Editar vale"
            >
              <Edit className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: 'REMOVE_VOUCHER', payload: voucher.id })}
              className="text-accent-red/70 hover:text-accent-red transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-accent-red/10"
              aria-label="Eliminar vale"
            >
              <Trash2 className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <Input
        label="Nombre cliente/entidad"
        placeholder="Ej: Cliente X"
        value={currentVoucher.name}
        onChange={handleNameChange}
        disabled={IS_READ_ONLY}
        className="disabled:cursor-not-allowed disabled:opacity-70"
      />

      <Input
        label="Cantidad de Viajes"
        numeric
        placeholder="0"
        maxLength={2}
        value={currentVoucher.trips || ''}
        onChange={(e) => handleNumericChange('trips', e.target.value)}
        error={voucherErrors.trips}
        disabled={IS_READ_ONLY}
        className="disabled:cursor-not-allowed disabled:opacity-70"
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Precio real"
          prefix="$"
          numeric
          placeholder="0"
          value={currentVoucher.pricePerTrip || ''}
          onChange={(e) => handleNumericChange('pricePerTrip', e.target.value)}
          disabled={IS_READ_ONLY}
          className="disabled:cursor-not-allowed disabled:opacity-70"
        />
        {currentVoucher.type === 'factory' && (
          <Input
            label="precio planilla"
            prefix="$"
            numeric
            placeholder="0"
            value={currentVoucher.fixedFeePerTrip || ''}
            onChange={(e) => handleNumericChange('fixedFeePerTrip', e.target.value)}
            disabled={IS_READ_ONLY}
            className="disabled:cursor-not-allowed disabled:opacity-70"
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
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-subtle bg-bg-input/40 px-3 py-2 text-sm font-medium text-accent-teal transition-all duration-200 hover:border-accent-teal/30 hover:bg-accent-teal/5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border-subtle disabled:hover:bg-bg-input/40 cursor-pointer font-display"
            aria-label={`${ACTION_LABEL} vale`}
          >
            <Save className="h-3.5 w-3.5" aria-hidden="true" />
            {ACTION_LABEL}
          </button>
          <HelpHint text="Completá nombre, viajes y precio real para habilitar el guardado. El vale persiste al recargar la página solo si está guardado." side="top" />
        </div>
      )}
    </div>
  )
}

export default VoucherCard
