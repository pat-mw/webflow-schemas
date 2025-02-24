export const orderPizza = async (small: boolean, type: string) => {
  if (small) {
    return `You ordered a small ${type} pizza.`;
  } else {
    return `A large ${type} pizza it is.`;
  }
};
