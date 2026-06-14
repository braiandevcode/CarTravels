import { z } from 'zod/v4'
import { voucherTripSchema } from './vale.schema'

export const totalSchema: z.ZodCoercedNumber<unknown> = z.coerce.number()
  .min(0, 'El total no puede ser negativo')
  .max(999999999, 'El total es muy alto')

export const expenseSchema: z.ZodCoercedNumber<unknown> = z.coerce.number()
  .min(0, 'El valor no puede ser negativo')
  .max(9999999, 'El valor es muy alto')

export const percentSchema: z.ZodCoercedNumber<unknown> = z.coerce.number()
  .int('Debe ser un número entero')
  .min(0, 'Mínimo 0%')
  .max(100, 'Máximo 100%')

export const calculatorFormSchema = z.object({
  total: totalSchema,
  agencyPercent: percentSchema,
  driverPercent: percentSchema,
  carPercent: percentSchema,
  carRented: z.boolean(),
  gas: expenseSchema,
  petrol: expenseSchema,
  vouchers: z.array(voucherTripSchema),
  showVouchers: z.boolean(),
})

export type TCalculatorForm = z.infer<typeof calculatorFormSchema>

// VALIDO TOTAL
export const validateTotal = (value: unknown) => {
  const result: z.ZodSafeParseResult<number> = totalSchema.safeParse(value)

  // SI NO ES SATISFACTORIO
  if (!result.success) {
    const firstError: string = result.error.issues[0]?.message
    return firstError || 'Valor inválido'
  }
  return null
}

const tripsSchema: z.ZodCoercedNumber<unknown> = z.coerce.number()
  .int('Debe ser un número entero')
  .min(0, 'Mínimo 0')
  .max(99, 'Máximo 99 viajes')

// VALIDO CAMPO DE PASOS
export const validateTrips = (value: unknown) => {
  const result: z.ZodSafeParseResult<number> = tripsSchema.safeParse(value)

  // SI NO ES SATISFACTORIO
  if (!result.success) {
    return result.error.issues[0]?.message || 'Valor inválido'
  }
  return null
}
