const eurFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
})

export const formatEUR = (cents: number): string =>
  eurFormatter.format(cents / 100)

export const toCents = (euros: number): number => Math.round(euros * 100)
