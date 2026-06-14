import { useState, useRef, useEffect, useCallback, type RefObject } from 'react'
import useCalculatorContext from '../../../core/context/useCalculatorContext'
import { validateTrips } from '../../../core/schemas/calculator.schema'
import type { IVoucherTrip } from '../../../core/types/calculator'

type TVoucherEditableField = keyof Pick<IVoucherTrip, 'trips' | 'pricePerTrip' | 'fixedFeePerTrip'>

interface IVoucherErrors {
  trips?: string
  name?: string
}

export function useVoucherValidation() {
  const { state, dispatch } = useCalculatorContext()
  const [errors, setErrors] = useState<Record<string, IVoucherErrors>>({})
  const prevVouchersLength: RefObject<number> = useRef(state.vouchers.length)
  const vouchersContainerRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null)

  const defaultVoucher = useCallback((): IVoucherTrip => ({
    id: `voucher-${crypto.randomUUID()}`,
    type: 'factory',
    name: '',
    trips: 0,
    pricePerTrip: 0,
    fixedFeePerTrip: 0,
    saved: false,
    editing: false,
  }), [])

  const addVoucher = useCallback((): void => {
    dispatch({ type: 'ADD_VOUCHER', payload: defaultVoucher() })
  }, [dispatch, defaultVoucher])

  const HANDLE_SCROLL_TO_NEW_VOUCHER = (): void => {
    if (state.vouchers.length > prevVouchersLength.current && vouchersContainerRef.current) {
      const container = vouchersContainerRef.current
      const lastVoucher = container.lastElementChild
      if (lastVoucher instanceof HTMLElement) {
        lastVoucher.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
    prevVouchersLength.current = state.vouchers.length
  }
  useEffect(HANDLE_SCROLL_TO_NEW_VOUCHER, [state.vouchers.length])

  const updateVoucher = (voucher: IVoucherTrip, field: TVoucherEditableField, raw: string): void => {
    let parsed: string | number = raw

    if (field === 'trips') {
      const cleaned = raw.replace(/\D/g, '').slice(0, 2)
      parsed = Math.min(Number(cleaned), 99)

      const error = validateTrips(parsed)
      setErrors((prev) => ({
        ...prev,
        [voucher.id]: { ...prev[voucher.id], trips: error ?? undefined },
      }))
    }

    if (field === 'pricePerTrip' || field === 'fixedFeePerTrip') {
      parsed = Number(raw.replace(/\D/g, ''))
    }

    dispatch({
      type: 'UPDATE_VOUCHER',
      payload: { ...voucher, [field]: parsed },
    })
  }

  const saveVoucher = useCallback((id: string): void => {
    dispatch({ type: 'SAVE_VOUCHER', payload: id })
  }, [dispatch])

  const hasSavedVouchers: boolean = state.vouchers.some((v) => v.saved)

  return {
    vouchers: state.vouchers,
    showVouchers: state.showVouchers,
    errors,
    vouchersContainerRef,
    dispatch,
    addVoucher,
    updateVoucher,
    saveVoucher,
    hasSavedVouchers,
  }
}
