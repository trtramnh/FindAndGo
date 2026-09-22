// Sample venues, pricing, and locations for MVP demonstration
export const venues = [
  {
    id: 'little-corner',
    name: 'The Little Corner',
    category: 'Coffee & Study',
    image: '/assets/cafe-interior.jpg',
    imageAlt: 'Warm coffee shop interior with wooden tables and natural sunlight',
    imageAltVi: 'Không gian cà phê ấm áp với bàn gỗ và ánh sáng tự nhiên',
    priceMin: 35000,
    priceMax: 65000,
    distanceBand: 2,
    area: 'Campus Perimeter · Demo',
    areaVi: 'Khu gần trường · minh họa',
    description: 'A quiet corner, a hot latte, and an uninterrupted study session.',
    descriptionVi: 'Một góc yên tĩnh, một ly cà phê, một buổi học thật tập trung.',
    details:
      'A designated study space for solo deep work or small paired projects. Broad desks, gentle warm lighting, and window seating.',
    detailsVi:
      'Không gian mẫu dành cho những buổi học cá nhân hoặc nhóm nhỏ. Bàn rộng, ánh sáng dịu và góc ngồi cạnh cửa sổ tạo cảm hứng cho buổi học tiếp theo.',
    activities: ['study', 'date', 'group'],
    people: 4,
    wifi: true,
    outlets: true,
    tag: 'Study Haven',
    tagVi: 'Góc học tập',
    tagIcon: 'book',
  },
  {
    id: 'garden-room',
    name: 'The Garden Room',
    category: 'Coffee & Chill',
    image: '/assets/garden-cafe.jpg',
    imageAlt: 'Bright airy café with lush greenery and Scandinavian wooden furniture',
    imageAltVi: 'Quán cà phê thoáng sáng với cây xanh và nội thất gỗ',
    priceMin: 45000,
    priceMax: 85000,
    distanceBand: 5,
    area: 'Green District · Demo',
    areaVi: 'Khu phố xanh · minh họa',
    description: 'Slow down, breathe easy, and catch up with old friends in nature.',
    descriptionVi: 'Chậm lại một chút, tận hưởng không gian và những câu chuyện.',
    details:
      'An inspiring outdoor-indoor venue concept for casual dates, relaxation, or collaborative ideation.',
    detailsVi:
      'Một ý tưởng địa điểm để hẹn hò, thư giãn hoặc làm việc cùng bạn bè. Thử thay đổi tiêu chí để xem cách FIND&GO thu hẹp những lựa chọn mẫu.',
    activities: ['study', 'date', 'hangout', 'group'],
    people: 6,
    wifi: true,
    outlets: true,
    tag: 'Chill & Green',
    tagVi: 'Một chút thư giãn',
    tagIcon: 'coffee',
  },
  {
    id: 'gather-bistro',
    name: 'Gather & Eat',
    category: 'Food & Friends',
    image: '/assets/friends-bistro.jpg',
    imageAlt: 'Cozy bistro setting with shared dining tables for friend groups',
    imageAltVi: 'Nhà hàng ấm cúng với bàn ăn dành cho nhóm bạn',
    priceMin: 55000,
    priceMax: 69000,
    distanceBand: 2,
    area: 'Student Corner · Demo',
    areaVi: 'Góc phố nhỏ · minh họa',
    description: 'Delicious comfort food, great group energy, and quick campus service.',
    descriptionVi: 'Món ngon, bạn thân và thêm một lý do để cùng nhau ra ngoài.',
    details:
      'Sample dining venue for friend groups. Pricing, capacity, and amenities illustrate the dynamic filtering engine.',
    detailsVi:
      'Địa điểm ăn uống mẫu cho một cuộc gặp gỡ cùng nhóm bạn. Mức giá, sức chứa và tiện ích chỉ minh họa cách bộ lọc hoạt động, chưa phải thông tin địa điểm thực tế.',
    activities: ['food', 'hangout', 'date'],
    people: 8,
    wifi: true,
    outlets: false,
    tag: 'Group Hangout',
    tagVi: 'Hẹn hội bạn',
    tagIcon: 'users',
  },
];

export const activities = [
  { id: 'study', label: 'Study & Focus', labelVi: 'Học tập', icon: 'book' },
  { id: 'food', label: 'Dining & Meals', labelVi: 'Ăn uống', icon: 'utensils' },
  { id: 'date', label: 'Casual Date', labelVi: 'Hẹn hò', icon: 'heart' },
  { id: 'hangout', label: 'Hangout & Fun', labelVi: 'Đi chơi', icon: 'compass' },
  { id: 'group', label: 'Group Project', labelVi: 'Làm việc nhóm', icon: 'users' },
];

export const formatPrice = (value, lang = 'en') => {
  return new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US').format(value);
};

export const normalizeText = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
