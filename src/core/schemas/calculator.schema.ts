import { z } from 'zod/v4'

const tripsSchema: z.ZodCoercedNumber<unknown> = z.coerce.number()
  .int('Debe ser un número entero')
  .min(0, 'Mínimo 0')
  .max(99, 'Máximo 99 viajes')

export const validateTrips = (value: unknown) => {
  const result: z.ZodSafeParseResult<number> = tripsSchema.safeParse(value)

  if (!result.success) {
    return result.error.issues[0]?.message || 'Valor inválido'
  }
  return null
}
