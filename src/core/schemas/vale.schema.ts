import { z } from 'zod/v4'

export const voucherTypeSchema = z.enum(['factory', 'other'])

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

export const vouchersArraySchema = z.array(voucherTripSchema)

export type TVoucherTripForm = z.infer<typeof voucherTripSchema>

export const validateVoucherTrip =(data: unknown) => {
  const result = voucherTripSchema.safeParse(data)
  if (!result.success) {
    const tree = z.treeifyError(result.error);

    return {
      success: false as const,
      errors: tree.properties // DEVUELVO 'properties' COMPLETO PARA INCLUIR TODOS LOS CAMPOS DEL FORMULARIO
    }
  }
  return { success: true as const, data: result.data }
}
