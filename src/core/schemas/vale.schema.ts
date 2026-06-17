import { z } from 'zod/v4'

const voucherTypeSchema = z.enum(['factory', 'other'])

export const voucherTripSchema = z.object({
  id: z.string(),
  type: voucherTypeSchema,
  name: z.string()
    .min(1, 'Ingresá un nombre para el vale')
    .max(40, 'El nombre es muy largo'),
  trips: z.coerce.number()
    .int('Debe ser un número entero')
    .min(0, 'Mínimo 0 viajes')
    .max(99, 'Máximo 99 viajes'),
  pricePerTrip: z.coerce.number()
    .min(0, 'El precio no puede ser negativo')
    .max(999999, 'Precio muy alto'),
  fixedFeePerTrip: z.coerce.number()
    .min(0, 'El descuento no puede ser negativo')
    .max(999999, 'Descuento muy alto'),
})


