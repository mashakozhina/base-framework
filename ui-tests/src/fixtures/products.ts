export interface Product {
  name: string;
  slug: string;
}

export const products = {
  sauceLabsBackpack: { name: 'Sauce Labs Backpack', slug: 'sauce-labs-backpack' },
} as const;
