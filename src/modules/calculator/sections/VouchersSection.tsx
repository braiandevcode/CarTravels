import Button from '../../../shared/ui/Button'
import Toggle from '../../../shared/ui/Toggle'
import VoucherCard from '../components/VoucherCard'
import { Plus } from 'lucide-react'
import { useVoucherValidation } from '../hooks/useVoucherValidation'

const VouchersSection = () => {
  const {
    vouchers,
    showVouchers,
    errors,
    vouchersContainerRef,
    dispatch,
    addVoucher,
    saveVoucher,
    hasSavedVouchers,
  } = useVoucherValidation()

  return (
    <>
      <div className="mb-4 p-3 rounded-xl bg-bg-input border border-border-subtle">
        <Toggle
          label="¿Tuviste viajes con vale?"
          enabled={showVouchers}
          disabled={hasSavedVouchers}
          onChange={(v) => dispatch({ type: 'SET_SHOW_VOUCHERS', payload: v })}
        />
        {hasSavedVouchers && (
          <p className="mt-2 text-xs text-text-muted/70">
            Eliminá o reiniciá los vales guardados para cambiar esta opción
          </p>
        )}
      </div>

      {showVouchers && (
        <div ref={vouchersContainerRef} className="flex flex-col gap-4 animate-fade-in">
          {vouchers.map((voucher) => (
            <VoucherCard
              key={voucher.id}
              voucher={voucher}
              errors={errors}
              dispatch={dispatch}
              saveVoucher={saveVoucher}
            />
          ))}

          <Button variant="ghost" onClick={addVoucher}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Agregar Vale
          </Button>
        </div>
      )}
    </>
  )
}

export default VouchersSection
