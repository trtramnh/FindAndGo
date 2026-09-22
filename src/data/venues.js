// Các địa điểm, giá và khu vực dưới đây chỉ dùng để minh họa MVP.
export const venues = [
  {
    id: 'little-corner', name: 'The Little Corner', category: 'Coffee & Study',
    image: '/assets/cafe-interior.jpg', imageAlt: 'Không gian cà phê ấm áp với bàn gỗ và ánh sáng tự nhiên',
    priceMin: 35000, priceMax: 65000, distanceBand: 2, area: 'Khu gần trường · minh họa',
    description: 'Một góc yên tĩnh, một ly cà phê, một buổi học thật tập trung.',
    details: 'Không gian mẫu dành cho những buổi học cá nhân hoặc nhóm nhỏ. Bàn rộng, ánh sáng dịu và góc ngồi cạnh cửa sổ tạo cảm hứng cho buổi học tiếp theo.',
    activities: ['study', 'date', 'group'], people: 4, wifi: true, outlets: true,
    tag: 'Góc học tập', tagIcon: 'book',
  },
  {
    id: 'garden-room', name: 'The Garden Room', category: 'Coffee & Chill',
    image: '/assets/garden-cafe.jpg', imageAlt: 'Quán cà phê thoáng sáng với cây xanh và nội thất gỗ',
    priceMin: 45000, priceMax: 85000, distanceBand: 5, area: 'Khu phố xanh · minh họa',
    description: 'Chậm lại một chút, tận hưởng không gian và những câu chuyện.',
    details: 'Một ý tưởng địa điểm để hẹn hò, thư giãn hoặc làm việc cùng bạn bè. Thử thay đổi tiêu chí để xem cách FIND&GO thu hẹp những lựa chọn mẫu.',
    activities: ['study', 'date', 'hangout', 'group'], people: 6, wifi: true, outlets: true,
    tag: 'Một chút thư giãn', tagIcon: 'coffee',
  },
  {
    id: 'gather-bistro', name: 'Gather & Eat', category: 'Food & Friends',
    image: '/assets/friends-bistro.jpg', imageAlt: 'Nhà hàng ấm cúng với bàn ăn dành cho nhóm bạn',
    priceMin: 55000, priceMax: 69000, distanceBand: 2, area: 'Góc phố nhỏ · minh họa',
    description: 'Món ngon, bạn thân và thêm một lý do để cùng nhau ra ngoài.',
    details: 'Địa điểm ăn uống mẫu cho một cuộc gặp gỡ cùng nhóm bạn. Mức giá, sức chứa và tiện ích chỉ minh họa cách bộ lọc hoạt động, chưa phải thông tin địa điểm thực tế.',
    activities: ['food', 'hangout', 'date'], people: 8, wifi: true, outlets: false,
    tag: 'Hẹn hội bạn', tagIcon: 'users',
  },
];

export const activities = [
  { id: 'study', label: 'Học tập', icon: 'book' },
  { id: 'food', label: 'Ăn uống', icon: 'utensils' },
  { id: 'date', label: 'Hẹn hò', icon: 'heart' },
  { id: 'hangout', label: 'Đi chơi', icon: 'compass' },
  { id: 'group', label: 'Làm việc nhóm', icon: 'users' },
];

export const formatPrice = (value) => new Intl.NumberFormat('vi-VN').format(value);
export const normalizeText = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
