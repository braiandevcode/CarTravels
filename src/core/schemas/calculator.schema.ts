import { z } from 'zod/v4'
import { valeTripSchema } from './vale.schema'

export const totalSchema = z.coerce.number()
  .min(0, 'El total no puede ser negativo')
  .max(999999999, 'El total es muy alto')

export const expenseSchema = z.coerce.number()
  .min(0, 'El valor no puede ser negativo')
  .max(9999999, 'El valor es muy alto')

export const percentSchema = z.coerce.number()
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
  vales: z.array(valeTripSchema),
  showVales: z.boolean(),
})

export type CalculatorForm = z.infer<typeof calculatorFormSchema>

export function validateTotal(value: unknown) {
  const result = totalSchema.safeParse(value)
  if (!result.success) {
    const firstError = result.error.issues[0]?.message
    return firstError || 'Valor inválido'
  }
  return null
}

export function validateTrips(value: unknown) {
  const schema = z.coerce.number()
    .int('Debe ser un número entero')
    .min(0, 'Mínimo 0')
    .max(99, 'Máximo 99 viajes')
  const result = schema.safeParse(value)
  if (!result.success) {
    return result.error.issues[0]?.message || 'Valor inválido'
  }
  return null
}
