import { useCallback, useEffect, useState, type ChangeEvent, type Dispatch } from 'react'
import type { IVoucherTrip } from '../../../core/types/calculator'
import type { TAction } from '../../../core/types/action'
import { validateTrips } from '../../../core/schemas/calculator.schema'

type TVoucherEditableField = keyof Pick<IVoucherTrip, 'trips' | 'pricePerTrip' | 'fixedFeePerTrip'>

export interface IVoucherErrors {
  trips?: string
  name?: string
}

const hasVoucherChanges = (draftVoucher: IVoucherTrip, savedVoucher: IVoucherTrip): boolean => (
  draftVoucher.type !== savedVoucher.type ||
  draftVoucher.name !== savedVoucher.name ||
  draftVoucher.trips !== savedVoucher.trips ||
  draftVoucher.pricePerTrip !== savedVoucher.pricePerTrip ||
  draftVoucher.fixedFeePerTrip !== savedVoucher.fixedFeePerTrip
)

const parseNumericField = (field: TVoucherEditableField, raw: string): number => {
  if (field === 'trips') {
    const cleaned: string = raw.replace(/\D/g, '').slice(0, 2)
    return Math.min(Number(cleaned), 99)
  }

  return Number(raw.replace(/\D/g, ''))
}

interface IUseVoucherDraftProps {
  voucher: IVoucherTrip
  dispatch: Dispatch<TAction>
  saveVoucher: (id: string) => void
}

interface IUseVoucherDraftReturn {
  currentVoucher: IVoucherTrip
  subtotal: number
  fixedFeeSubtotal: number
  voucherErrors: IVoucherErrors
  CAN_SAVE: boolean
  IS_READ_ONLY: boolean
  SHOULD_SHOW_ACTION_BUTTON: boolean
  ACTION_LABEL: string
  feedbackMessage: string | null
  isEditing: boolean
  handleTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void
  handleNameChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleNumericChange: (field: TVoucherEditableField, raw: string) => void
  handleEdit: () => void
  handleSave: () => void
  handleRemove: () => void
}

const useVoucherDraft = ({ voucher, dispatch, saveVoucher }: IUseVoucherDraftProps): IUseVoucherDraftReturn => {
  const [draftVoucher, setDraftVoucher] = useState<IVoucherTrip>(voucher)
  const [isEditing, setIsEditing] = useState<boolean>(!voucher.saved)
  const [draftTripError, setDraftTripError] = useState<string | undefined>()
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

  const currentVoucher: IVoucherTrip = isEditing ? draftVoucher : voucher
  const subtotal: number = currentVoucher.trips * currentVoucher.pricePerTrip
  const fixedFeeSubtotal: number = currentVoucher.type === 'factory' ? currentVoucher.trips * currentVoucher.fixedFeePerTrip : 0
  const HAS_CHANGES: boolean = voucher.saved ? hasVoucherChanges(draftVoucher, voucher) : true
  const HAS_REQUIRED_FIELDS: boolean = currentVoucher.trips > 0 && currentVoucher.pricePerTrip > 0 && currentVoucher.name.trim().length > 0
  const CAN_SAVE: boolean = HAS_REQUIRED_FIELDS && HAS_CHANGES
  const IS_READ_ONLY: boolean = voucher.saved && !isEditing
  const SHOULD_SHOW_ACTION_BUTTON: boolean = !voucher.saved || isEditing
  const ACTION_LABEL: string = voucher.saved ? 'Actualizar' : 'Guardar'
  const voucherErrors: IVoucherErrors = {
    trips: draftTripError,
  }

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

  const updateDraft = useCallback((nextVoucher: IVoucherTrip): void => {
    setDraftVoucher(nextVoucher)

    if (!voucher.saved) {
      dispatch({ type: 'UPDATE_VOUCHER', payload: nextVoucher })
      return
    }

    const localHasPendingChanges: boolean = hasVoucherChanges(nextVoucher, voucher)
    if (voucher.editing !== localHasPendingChanges) {
      dispatch({ type: 'UPDATE_VOUCHER', payload: { ...voucher, editing: localHasPendingChanges } })
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

  const handleRemove = useCallback((): void => {
    dispatch({ type: 'REMOVE_VOUCHER', payload: voucher.id })
  }, [dispatch, voucher.id])

  return {
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
  }
}

export default useVoucherDraft
