interface IDebounce<A extends unknown[]> {
  (...args: A): void; 
  cancel: () => void
}

export const debounce = <A extends unknown[]>(fn: (...args: A) => void, delay: number): IDebounce<A> =>{
  let timer: ReturnType<typeof setTimeout> | null = null
  const DEBOUNCED:IDebounce<A> = (...args: A): void => {
    if (timer) clearTimeout(timer) // SI EL TIMER NO ES NULO LIMPIAR
    timer = setTimeout(() => fn(...args), delay)
  }
  DEBOUNCED.cancel = (): void => {
    if (timer) clearTimeout(timer) // SI EL TIMER NO ES NULO LIMPIAR
    timer = null
  }
  return DEBOUNCED
}
