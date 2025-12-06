import Link from "next/link";

const MailIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5l-9.75 6.75L2.25 7.5m19.5 0v9a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 16.5v-9m19.5 0L12 14.25 2.25 7.5"/>
  </svg>
);

const PhoneIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 4.5l5.25 1.5 2.25 5.25-3 1.5a12 12 0 006 6l1.5-3 5.25 2.25 1.5 5.25A2.25 2.25 0 0118 21.75c-8.28 0-15-6.72-15-15a2.25 2.25 0 012.25-2.25z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm0 9c4.5-4.5 7.5-7.5 7.5-12a7.5 7.5 0 10-15 0c0 4.5 3 7.5 7.5 12z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-5 h-5">
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17" cy="7" r="1" />
  </svg>
);

const GithubIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M12 .5a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2c-3.34.72-4-1.61-4-1.61a3.15 3.15 0 00-1.34-1.76c-1.09-.74.08-.73.08-.73a2.5 2.5 0 011.83 1.23 2.53 2.53 0 003.44 1 2.52 2.52 0 01.76-1.59c-2.67-.3-5.47-1.34-5.47-5.94a4.62 4.62 0 011.23-3.21 4.3 4.3 0 01.12-3.17s1-.32 3.3 1.22a11.38 11.38 0 016 0c2.28-1.54 3.29-1.22 3.29-1.22a4.3 4.3 0 01.12 3.17 4.6 4.6 0 011.23 3.21c0 4.61-2.81 5.63-5.49 5.93a2.86 2.86 0 01.82 2.22v3.29c0 .32.21.7.82.58A12 12 0 0012 .5z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="border-t border-[#00000010] dark:border-[#ffffff15] py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* VỀ CHÚNG TÔI */}
        <div>
          <h3 className="text-[18px] font-semibold mb-4 text-gray-900 dark:text-white">
            Về Chúng Tôi
          </h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li><Link href="/about">Câu Chuyện Của Chúng Tôi</Link></li>
            <li><Link href="/privacy-policy">Chính Sách Bảo Mật</Link></li>
            <li><Link href="/faq">Câu Hỏi Thường Gặp</Link></li>
          </ul>
        </div>

        {/* LIÊN KẾT NHANH */}
        <div>
          <h3 className="text-[18px] font-semibold mb-4 text-gray-900 dark:text-white">
            Liên Kết Nhanh
          </h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li><Link href="/courses">Khóa Học</Link></li>
            <li><Link href="/profile">Tài Khoản Của Tôi</Link></li>
            <li><Link href="/course-dashboard">Bảng Điều Khiển Khóa Học</Link></li>
          </ul>
        </div>

        {/* MẠNG XÃ HỘI */}
        <div>
          <h3 className="text-[18px] font-semibold mb-4 text-gray-900 dark:text-white">
            Mạng Xã Hội
          </h3>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li>
              <Link href="https://www.instagram.com" className="flex items-center gap-2 hover:text-black dark:hover:text-white">
                <InstagramIcon /> Instagram
              </Link>
            </li>
            <li>
              <Link href="https://github.com" className="flex items-center gap-2 hover:text-black dark:hover:text-white">
                <GithubIcon /> Github
              </Link>
            </li>
          </ul>
        </div>

        {/* THÔNG TIN LIÊN HỆ */}
        <div>
          <h3 className="text-[18px] font-semibold mb-4 text-gray-900 dark:text-white">
            Thông Tin Liên Hệ
          </h3>
          <p className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-300">
            <PhoneIcon /> Gọi Cho Chúng Tôi: +84 946577017
          </p>
          <p className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-300">
            <MapPinIcon /> Hà Đông, Hà Nội
          </p>
          <p className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-300">
            <MailIcon /> maitrang.071003@gmail.com
          </p>
        </div>

      </div>

      <p className="text-center pt-10 text-gray-700 dark:text-gray-300">
        © 2025 MindX — Bảo Lưu Mọi Quyền.
      </p>
    </footer>
  );
};

export default Footer;
