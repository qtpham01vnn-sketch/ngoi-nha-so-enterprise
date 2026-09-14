import { AppStateData, ToolItem } from '../types';

export const ALL_33_TOOLS: ToolItem[] = [
  // 10 Cong viec
  { id: 't_chiet_khau', ten: 'Tính chiết khấu tối đa', link: 'cong-cu/sat-chiet-khau.html', icon: 'DollarSign', co: 'nho', tab: 'tab-cong-viec', ghiChu: 'Giảm tới đâu thì hết lãi', thuTu: 1 },
  { id: 't_gia_ban_loi_nhuan', ten: 'Tính giá bán & biên lãi', link: 'cong-cu/sat-gia-ban-loi-nhuan.html', icon: 'TrendingUp', co: 'nho', tab: 'tab-cong-viec', ghiChu: 'Tính giá bán và lãi thật', thuTu: 2 },
  { id: 't_nghi_mat', ten: 'Nhắc nghỉ mắt 20-20-20', link: 'cong-cu/sat-nghi-mat.html', icon: 'Eye', co: 'nho', tab: 'tab-cong-viec', ghiChu: '20 phút nhìn xa 50p đứng', thuTu: 3 },
  { id: 't_gian_co', ten: 'Giãn cơ tại bàn', link: 'cong-cu/sat-gian-co.html', icon: 'UserCheck', co: 'nho', tab: 'tab-cong-viec', ghiChu: 'Giãn cơ vai cổ lưng', thuTu: 4 },
  { id: 't_viec_da_hua', ten: 'Bảng việc đã hứa', link: 'cong-cu/sat-viec-da-hua.html', icon: 'CheckSquare', co: 'nho', tab: 'tab-cong-viec', ghiChu: 'Hứa gì với ai khi nào', thuTu: 5 },
  { id: 't_kiem_truoc_gui', ten: 'Cổng kiểm trước khi gửi', link: 'cong-cu/sat-kiem-truoc-gui.html', icon: 'ShieldCheck', co: 'nho', tab: 'tab-cong-viec', ghiChu: 'Checklist kiểm duyệt trước gửi', thuTu: 6 },
  { id: 't_bien_ban_hop', ten: 'Biên bản họp ra việc', link: 'cong-cu/sat-bien-ban-hop.html', icon: 'FileText', co: 'nho', tab: 'tab-cong-viec', ghiChu: 'Tách việc người nhận hạn chót', thuTu: 7 },
  { id: 't_can_hai_lua_chon', ten: 'Cân hai lựa chọn', link: 'cong-cu/sat-can-hai-lua-chon.html', icon: 'Scale', co: 'nho', tab: 'tab-cong-viec', ghiChu: 'Chấm điểm cân nhắc 2 phương án', thuTu: 8 },
  { id: 't_giai_nghia_giay_to', ten: 'Giải nghĩa giấy tờ', link: 'cong-cu/sat-giai-nghia-giay-to.html', icon: 'FileQuestion', co: 'nho', tab: 'tab-cong-viec', ghiChu: 'Tóm tắt hợp đồng thủ tục', thuTu: 9 },
  { id: 't_quay_so_cong_bang', ten: 'Chia đội công bằng', link: 'cong-cu/sat-quay-so-cong-bang.html', icon: 'Shuffle', co: 'nho', tab: 'tab-cong-viec', ghiChu: 'Chia nhóm bốc thăm thứ tự', thuTu: 10 },

  // 12 Doi song
  { id: 't_chia_tien', ten: 'Chia tiền bữa ăn', link: 'cong-cu/sat-chia-tien.html', icon: 'Receipt', co: 'nho', tab: 'tab-doi-song', ghiChu: 'Món riêng phí và tip', thuTu: 11 },
  { id: 't_gia_that', ten: 'Bóc giá thật khuyến mãi', link: 'cong-cu/sat-gia-that.html', icon: 'Tag', co: 'nho', tab: 'tab-doi-song', ghiChu: 'Quy về giá một đơn vị', thuTu: 12 },
  { id: 't_thuc_don_tuan', ten: 'Thực đơn tuần đi chợ', link: 'cong-cu/sat-thuc-don-tuan.html', icon: 'UtensilsCrossed', co: 'nho', tab: 'tab-doi-song', ghiChu: 'Tự gom nguyên liệu chợ', thuTu: 13 },
  { id: 't_bam_gio_nau_an', ten: 'Bấm giờ nấu ăn', link: 'cong-cu/sat-bam-gio-nau-an.html', icon: 'Timer', co: 'nho', tab: 'tab-doi-song', ghiChu: 'Bấm giờ nhiều món', thuTu: 14 },
  { id: 't_doi_don_vi', ten: 'Đổi đơn vị nấu ăn', link: 'cong-cu/sat-doi-don-vi.html', icon: 'RotateCcw', co: 'nho', tab: 'tab-doi-song', ghiChu: 'Đổi gram ml muỗng cốc', thuTu: 15 },
  { id: 't_the_tu_vung', ten: 'Thẻ ôn từ vựng', link: 'cong-cu/sat-the-tu-vung.html', icon: 'BookOpen', co: 'nho', tab: 'tab-doi-song', ghiChu: 'Lật flashcard ôn từ vựng', thuTu: 16 },
  { id: 't_chon_viec_nha', ten: 'Bốc thăm việc nhà', link: 'cong-cu/sat-chon-viec-nha.html', icon: 'Dices', co: 'nho', tab: 'tab-doi-song', ghiChu: 'Bốc thăm rửa bát quét nhà', thuTu: 17 },
  { id: 't_do_den_truong', ten: 'Đồ đến trường theo thứ', link: 'cong-cu/sat-do-den-truong.html', icon: 'Backpack', co: 'nho', tab: 'tab-doi-song', ghiChu: 'Soạn sách vở theo thời khóa', thuTu: 18 },
  { id: 't_ngay_quan_trong', ten: 'Sổ ngày quan trọng', link: 'cong-cu/sat-ngay-quan-trong.html', icon: 'CalendarDays', co: 'nho', tab: 'tab-doi-song', ghiChu: 'Sinh nhật kỷ niệm bạn bè', thuTu: 19 },
  { id: 't_banh_xe_an_gi', ten: 'Bánh xe hôm nay ăn gì', link: 'cong-cu/sat-banh-xe-an-gi.html', icon: 'PieChart', co: 'nho', tab: 'tab-doi-song', ghiChu: 'Vòng quay chọn món ăn', thuTu: 20 },
  { id: 't_cau_hoi_bua_toi', ten: 'Câu hỏi bữa tối', link: 'cong-cu/sat-cau-hoi-bua-toi.html', icon: 'MessageCircle', co: 'nho', tab: 'tab-doi-song', ghiChu: 'Câu hỏi gợi mở cả nhà', thuTu: 21 },
  { id: 't_tao_qr', ten: 'Thẻ QR dán tường', link: 'cong-cu/sat-tao-qr.html', icon: 'QrCode', co: 'nho', tab: 'tab-doi-song', ghiChu: 'Tạo QR wifi pass thông tin', thuTu: 22 },

  // 5 Hom nay
  { id: 't_dem_nguoc', ten: 'Đếm ngược tới hạn', link: 'cong-cu/sat-dem-nguoc.html', icon: 'Hourglass', co: 'nho', tab: 'tab-hom-nay', ghiChu: 'Còn bao nhiêu ngày giờ', thuTu: 23 },
  { id: 't_dong_ho_tap_trung', ten: 'Đồng hồ tập trung', link: 'cong-cu/sat-dong-ho-tap-trung.html', icon: 'Clock', co: 'nho', tab: 'tab-hom-nay', ghiChu: '25 phút làm 5 phút nghỉ', thuTu: 24 },
  { id: 't_mua_dan', ten: 'Đồ cần mua dần', link: 'cong-cu/sat-mua-dan.html', icon: 'ShoppingCart', co: 'nho', tab: 'tab-hom-nay', ghiChu: 'Ghi nhớ đồ cần mua', thuTu: 25 },
  { id: 't_dem_nuoc', ten: 'Đếm ly nước', link: 'cong-cu/sat-dem-nuoc.html', icon: 'Droplets', co: 'nho', tab: 'tab-hom-nay', ghiChu: 'Đếm đủ 8 ly nước', thuTu: 26 },
  { id: 't_ba_dong_moi_toi', ten: 'Ba dòng mỗi tối', link: 'cong-cu/sat-ba-dong-moi-toi.html', icon: 'PenLine', co: 'nho', tab: 'tab-hom-nay', ghiChu: 'Việc tốt biết ơn ngày mai', thuTu: 27 },

  // 6 Nhan su AI
  { id: 't_nhan_su_content', ten: 'Chuyên viên Sáng tạo Nội dung AI', link: 'cong-cu/sat-nhan-su-content.html', icon: 'Sparkles', co: 'nho', tab: 'tab-nhan-su-ai', ghiChu: 'Viết bài FB kịch bản video blog SEO', thuTu: 28 },
  { id: 't_nhan_su_ban_hang', ten: 'Chuyên viên Bán hàng & Chốt sale AI', link: 'cong-cu/sat-nhan-su-ban-hang.html', icon: 'Briefcase', co: 'nho', tab: 'tab-nhan-su-ai', ghiChu: 'Kịch bản chốt đơn xử lý từ chối', thuTu: 29 },
  { id: 't_nhan_su_marketing', ten: 'Chuyên viên Marketing & Chiến dịch AI', link: 'cong-cu/sat-nhan-su-marketing.html', icon: 'BarChart3', co: 'nho', tab: 'tab-nhan-su-ai', ghiChu: 'Kế hoạch ra mắt viral minigame', thuTu: 30 },
  { id: 't_nhan_su_dao_tao', ten: 'Chuyên viên Đào tạo & Soạn tài liệu AI', link: 'cong-cu/sat-nhan-su-dao-tao.html', icon: 'GraduationCap', co: 'nho', tab: 'tab-nhan-su-ai', ghiChu: 'Giáo án bài giảng đào tạo AIVA', thuTu: 31 },
  { id: 't_nhan_su_quan_ly', ten: 'Trợ lý Quản lý & Vận hành AI', link: 'cong-cu/sat-nhan-su-quan-ly.html', icon: 'ClipboardCheck', co: 'nho', tab: 'tab-nhan-su-ai', ghiChu: 'SOP quy trình KPI thông báo', thuTu: 32 },
  { id: 't_tro_ly_tin_nhan', ten: 'Trợ lý Tin nhắn & CSKH AI', link: 'cong-cu/sat-tro-ly-tin-nhan.html', icon: 'MessageSquare', co: 'nho', tab: 'tab-nhan-su-ai', ghiChu: 'Từ chối khéo nhắc nợ lịch sự', thuTu: 33 }
];

export const INITIAL_DATA: AppStateData = {
  version: 4,
  updatedAt: Date.now(),
  userName: 'Tuấn Phạm',
  startTime: '7:30',
  settings: {
    soundEnabled: true,
    lastBackupAt: null
  },
  tabs: [
    { id: 'tab-hom-nay', ten: 'Hôm nay', icon: 'Home', thuTu: 1 },
    { id: 'tab-cong-viec', ten: 'Công việc', icon: 'Briefcase', thuTu: 2 },
    { id: 'tab-doi-song', ten: 'Đời sống', icon: 'Heart', thuTu: 3 },
    { id: 'tab-nhan-su-ai', ten: 'Nhân sự AI', icon: 'Bot', thuTu: 4 },
    { id: 'tab-tat-ca', ten: 'Tất cả', icon: 'LayoutGrid', thuTu: 5 }
  ],
  congCu: ALL_33_TOOLS,
  phong: {
    viec: {
      an: false,
      co: 'lon',
      tab: 'tab-hom-nay',
      ghim: false,
      tasks: [
        { id: 'tsk-1', ten: 'Đào tạo học viên Aiva kiến thức mới', nhom: 'hom-nay', priority: 'CAO', phut: 60, tag: 'aiva', due: new Date().toISOString().split('T')[0], trongTam: true, done: false, createdAt: Date.now() - 3600000 },
        { id: 'tsk-2', ten: 'Kiểm tra nhiệt độ lò nung xưởng men', nhom: 'hom-nay', priority: 'VUA', phut: 45, tag: 'pxsx', due: new Date().toISOString().split('T')[0], trongTam: false, done: false, createdAt: Date.now() - 1800000 },
        { id: 'tsk-3', ten: 'Đọc tài liệu tối ưu công cụ AI', nhom: 'tuan-nay', priority: 'THUONG', phut: 30, tag: 'hoc', due: new Date().toISOString().split('T')[0], trongTam: false, done: false, createdAt: Date.now() }
      ]
    },
    'thoi-quen': {
      an: false,
      co: 'nho',
      tab: 'tab-hom-nay',
      ghim: false,
      habits: [
        { id: 'hab-1', ten: 'Tập thể dục buổi sáng', icon: 'UserCheck', currentStreak: 5, longestStreak: 12, history: { [new Date().toISOString().split('T')[0]]: true } },
        { id: 'hab-2', ten: 'Đi ngủ trước 11h', icon: 'Clock', currentStreak: 3, longestStreak: 7, history: { [new Date().toISOString().split('T')[0]]: true } },
        { id: 'hab-3', ten: 'Uống 2,5 lít nước', icon: 'Droplets', currentStreak: 7, longestStreak: 14, history: { [new Date().toISOString().split('T')[0]]: true } }
      ]
    },
    'ghi-nhanh': {
      an: false,
      co: 'nho',
      tab: 'tab-hom-nay',
      ghim: false,
      notes: [
        { id: 'n-1', content: 'Chào mừng anh Tuấn đến với Ứng Dụng Ngôi Nhà Số Enterprise!', pinned: true, createdAt: Date.now() }
      ]
    }
  }
};
