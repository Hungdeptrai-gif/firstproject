export const products = [
  {
    id: 1,
    name: "Tranh Lego - Quà Tặng Cá Nhân Hóa",
    description: "Món quà ý nghĩa cho Anniversary, Tốt nghiệp, Sinh nhật... thể hiện cá tính riêng của bạn!",
    basePrice: 230000,
    versions: [
      { id: 1, name: "Version 1", price: 230000 },
      { id: 2, name: "Version 2", price: 240000 },
      { id: 3, name: "Version 3", price: 245000 }
    ],
    features: [
      "Thiết kế background theo yêu cầu",
      "Xử lý đơn nhanh",
      "Bảo hành 1 đổi 1"
    ]
  }
];

export const backgrounds = [
  { id: 1, name: "Nền Trắng", price: 0, image: "white-bg.jpg" },
  { id: 2, name: "Nền Xanh", price: 10000, image: "blue-bg.jpg" },
  { id: 3, name: "Nền Hồng", price: 10000, image: "pink-bg.jpg" },
  { id: 4, name: "Nền Tùy Chỉnh", price: 15000, image: "custom-bg.jpg" }
];

export const clothes = [
  { id: 1, name: "Áo Trắng", price: 0, image: "white-shirt.jpg" },
  { id: 2, name: "Áo Xanh", price: 5000, image: "blue-shirt.jpg" },
  { id: 3, name: "Áo Đỏ", price: 5000, image: "red-shirt.jpg" },
  { id: 4, name: "Áo Đen", price: 5000, image: "black-shirt.jpg" }
];

export const faces = [
  { id: 1, name: "Khuôn Mặt 1", price: 0, image: "face1.jpg" },
  { id: 2, name: "Khuôn Mặt 2", price: 0, image: "face2.jpg" },
  { id: 3, name: "Khuôn Mặt 3", price: 0, image: "face3.jpg" },
  { id: 4, name: "Khuôn Mặt 4", price: 0, image: "face4.jpg" }
];

export const hairstyles = [
  { id: 1, name: "Tóc Ngắn", price: 25000, image: "short-hair.jpg" },
  { id: 2, name: "Tóc Dài", price: 25000, image: "long-hair.jpg" },
  { id: 3, name: "Tóc Xoăn", price: 25000, image: "curly-hair.jpg" },
  { id: 4, name: "Tóc Đuôi Gà", price: 25000, image: "ponytail.jpg" }
];

export const hats = [
  { id: 1, name: "Mũ Bóng Chày", price: 15000, image: "baseball-cap.jpg" },
  { id: 2, name: "Mũ Len", price: 15000, image: "beanie.jpg" },
  { id: 3, name: "Mũ Cối", price: 15000, image: "bucket-hat.jpg" },
  { id: 4, name: "Mũ Phớt", price: 15000, image: "fedora.jpg" }
];

export const accessories = [
  { id: 1, name: "Kính Mát", price: 10000, image: "sunglasses.jpg" },
  { id: 2, name: "Túi Xách", price: 15000, image: "bag.jpg" },
  { id: 3, name: "Đồng Hồ", price: 20000, image: "watch.jpg" },
  { id: 4, name: "Vòng Tay", price: 10000, image: "bracelet.jpg" },
  { id: 5, name: "Dây Chuyền", price: 15000, image: "necklace.jpg" }
];

export const pets = [
  { id: 1, name: "Chó", price: 15000, image: "dog.jpg" },
  { id: 2, name: "Mèo", price: 15000, image: "cat.jpg" },
  { id: 3, name: "Thỏ", price: 20000, image: "rabbit.jpg" },
  { id: 4, name: "Chim", price: 20000, image: "bird.jpg" }
];

export const shippingOptions = [
  { id: 1, name: "Giao hàng thường", price: 25000, days: "3-7 ngày" },
  { id: 2, name: "Giao hàng nhanh", price: 37000, days: "1-3 ngày" }
];
