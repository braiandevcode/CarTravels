import { useCallback, type ReactNode, type ChangeEvent } from 'react'
import useCalculatorContext from '../../../core/context/useCalculatorContext'
import Input from '../../../shared/ui/Input'

const IncomeSection = (): ReactNode => {
  const { state, dispatch } = useCalculatorContext()

  const handleTotalChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value.replace(/\D/g, '')
    dispatch({ type: 'SET_TOTAL', payload: Number(raw) })
  }, [dispatch])

  return (
    <Input
      label="Total facturado"
      prefix="$"
      numeric
      placeholder="0"
      value={state.total || ''}
      onChange={handleTotalChange}
      formattedValue={state.total}
    />
  )
}

export default IncomeSection
