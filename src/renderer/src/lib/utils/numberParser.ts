export default function numberParser(x: number | string): string {
  const n = Number.parseFloat(x.toString())

  if (n < 1)
    return n.toLocaleString(undefined, {
      minimumSignificantDigits: 4,
      maximumSignificantDigits: 4
    })
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
