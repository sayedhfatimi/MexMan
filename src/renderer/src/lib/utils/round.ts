const round = (price: number, grouping: number): number => {
  return Math.floor(price / grouping) * grouping
}

export default round
