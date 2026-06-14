import type { IVoucherDetail } from '../../../core/types/calculator'
import type { ReactNode } from 'react'

interface IVoucherDetailListProps {
  voucherDetails: IVoucherDetail[]
  compact?: boolean
}

const VoucherDetailList = ({ voucherDetails, compact = false }: IVoucherDetailListProps): ReactNode => {
  return (
    <>
      {voucherDetails.map((v) => (
        <div key={v.id} className={`border-l-2 border-border-subtle pl-2 ${compact ? 'py-1 text-xs' : 'py-1.5 text-xs mb-1'}`}>
          <div className="flex justify-between">
            <span className="text-text-secondary font-medium">
              {v.name}
              <span className="text-text-muted ml-1">
                ({v.type === 'factory' ? 'Fábrica' : 'Otro'})
              </span>
            </span>
          </div>
          <div className="flex justify-between mt-0.5">
            <span className="text-text-muted/80">{v.trips} × ${v.pricePerTrip.toLocaleString()}</span>
            <span className="text-accent-teal/90">+${v.subtotal.toLocaleString()}</span>
          </div>
          {v.type === 'factory' && v.fixedFeePerTrip > 0 && (
            <div className="flex justify-between mt-0.5">
              <span className="text-text-muted/80">
                {v.trips} × ${v.fixedFeePerTrip.toLocaleString()} {compact ? 'fijo' : 'fijo planilla'}
              </span>
              <span className="text-orange-400">${v.fixedFeeSubtotal.toLocaleString()}</span>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default VoucherDetailList
