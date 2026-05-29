import { z } from 'zod/v4'

export const valeTypeSchema = z.enum(['fabrica', 'otro'])

export const valeTripSchema = z.object({
  id: z.string(),
  type: valeTypeSchema,
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
  discountPerTrip: z.coerce.number()
    .min(0, 'El descuento no puede ser negativo')
    .max(999999, 'Descuento muy alto'),
})

export const valesArraySchema = z.array(valeTripSchema)

export type ValeTripForm = z.infer<typeof valeTripSchema>

export function validateValeTrip(data: unknown) {
  const result = valeTripSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false as const,
      errors: result.error.flatten().fieldErrors,
    }
  }
  return { success: true as const, data: result.data }
}
