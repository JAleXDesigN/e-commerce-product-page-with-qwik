type ProductImages = Record<"title" | "src" | "thumbnail", string>;

export interface DataProduct {
  productImages: ProductImages[];
  productInfo: ProductInfo;
}

export interface ProductInfo {
  id: string;
  company: string;
  name: string;
  description: string;
  price: number;
  discountPercent: number;
}

export const data: DataProduct[] = [
  {
    productImages: [
      {
        title: "Image Fall Limited Edition Sneakers Product 1",
        src: "https://res.cloudinary.com/dekp1iyjf/image/upload/v1673908687/ecommerce-fementor/image-product-1_cexuca.jpg",
        thumbnail:
          "https://res.cloudinary.com/dekp1iyjf/image/upload/c_thumb,w_200,g_face/v1673908687/ecommerce-fementor/image-product-1-thumbnail_lv8obr.jpg",
      },
      {
        title: "Image Fall Limited Edition Sneakers Product 2",
        src: "https://res.cloudinary.com/dekp1iyjf/image/upload/v1673908688/ecommerce-fementor/image-product-2_ievyrs.jpg",
        thumbnail:
          "https://res.cloudinary.com/dekp1iyjf/image/upload/c_thumb,w_200,g_face/v1673908687/ecommerce-fementor/image-product-2-thumbnail_bg65sz.jpg",
      },
      {
        title: "Image Fall Limited Edition Sneakers Product 3",
        src: "https://res.cloudinary.com/dekp1iyjf/image/upload/v1673908688/ecommerce-fementor/image-product-3_jcioqx.jpg",
        thumbnail:
          "https://res.cloudinary.com/dekp1iyjf/image/upload/c_thumb,w_200,g_face/v1673908687/ecommerce-fementor/image-product-3-thumbnail_unzifl.jpg",
      },
      {
        title: "Image Fall Limited Edition Sneakers Product 4",
        src: "https://res.cloudinary.com/dekp1iyjf/image/upload/v1673908688/ecommerce-fementor/image-product-4_vbxd5v.jpg",
        thumbnail:
          "https://res.cloudinary.com/dekp1iyjf/image/upload/c_thumb,w_200,g_face/v1673908688/ecommerce-fementor/image-product-4-thumbnail_suhgmz.jpg",
      },
    ],

    productInfo: {
      id: "550e8400-e29b-41d4-a716-446655440000",
      company: "Sneaker Company",
      name: "Fall Limited Edition Sneakers",
      description:
        "These low-profile sneakers are your perfect casual wear companion.      Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
      price: 250,
      discountPercent: 50,
    },
  },
];
