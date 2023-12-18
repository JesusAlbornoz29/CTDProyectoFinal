export function randomizerProducts(products) {
  return products?.sort(() =>  0.5 - Math.random());
}
