export type Product = {
  id: string;
  name: string;
  category: "Living" | "Dining" | "Lighting" | "Textiles";
  price: number;
  color: string;
  description: string;
  image: string;
  badge?: string;
};

const image = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export const products: Product[] = [
  {
    id: "solstice-vase",
    name: "Solstice Ceramic Vase",
    category: "Living",
    price: 68,
    color: "Chalk",
    description:
      "A quiet sculptural form, hand-finished in a softly textured glaze. Made to hold a single branch or stand beautifully on its own.",
    image: image("photo-1578500494198-246f612d3b3d"),
    badge: "Bestseller",
  },
  {
    id: "woven-throw",
    name: "Woven Cotton Throw",
    category: "Textiles",
    price: 124,
    color: "Oat",
    description:
      "Lightweight, breathable cotton with a softly fringed edge. Woven in small batches for the kind of everyday comfort that lasts.",
    image: image("photo-1600210492486-724fe5c67fb0"),
  },
  {
    id: "arc-table-lamp",
    name: "Arc Table Lamp",
    category: "Lighting",
    price: 189,
    color: "Warm white",
    description:
      "A considered balance of rounded ceramic and a natural linen shade. The warm, diffused light makes evenings feel a little slower.",
    image: image("photo-1507473885765-e6ed057f782c"),
    badge: "New",
  },
  {
    id: "stoneware-set",
    name: "Everyday Stoneware Set",
    category: "Dining",
    price: 86,
    color: "Sand",
    description:
      "A set of two thoughtfully weighted stoneware cups, shaped by hand and finished in a tactile matte glaze.",
    image: image("photo-1493106641515-6b5631de4bb9"),
  },
  {
    id: "linen-cushion",
    name: "Linen Cushion Cover",
    category: "Textiles",
    price: 54,
    color: "Terracotta",
    description:
      "European flax linen, stonewashed for a lived-in softness from day one. A timeless layer for your favorite corner.",
    image: image("photo-1584100936595-c0654b55a2e2"),
  },
  {
    id: "wooden-serving-board",
    name: "Olive Wood Serving Board",
    category: "Dining",
    price: 72,
    color: "Natural",
    description:
      "Carved from responsibly sourced olive wood, every board carries its own grain and gentle imperfections.",
    image: image("photo-1610701596007-11502861dcfa"),
    badge: "Small batch",
  },
  {
    id: "terra-planter",
    name: "Terra Stone Planter",
    category: "Living",
    price: 48,
    color: "Clay",
    description:
      "A rounded, earthy home for your favorite greens. The porous ceramic helps roots breathe and develops a lovely patina.",
    image: image("photo-1485955900006-10f4d324d411"),
  },
  {
    id: "paper-pendant",
    name: "Paper Moon Pendant",
    category: "Lighting",
    price: 156,
    color: "Natural",
    description:
      "Hand-folded paper diffuses a soft, ambient glow. A lightweight statement that brings warmth to any room.",
    image: image("photo-1513506003901-1e6a229e2d15"),
  },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}
