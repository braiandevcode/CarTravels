import useCalculatorContext from '../../../core/context/useCalculatorContext'
import Input from '../../../shared/ui/Input'

const IncomeSection = () => {
  const { state, dispatch } = useCalculatorContext()

  return (
    <Input
      label="Total facturado"
      prefix="$"
      numeric
      placeholder="0"
      value={state.total || ''}
      onChange={(e) => {
        const raw = e.target.value.replace(/\D/g, '')
        dispatch({ type: 'SET_TOTAL', payload: Number(raw) })
      }}
      formattedValue={state.total}
    />
  )
}

export default IncomeSection
