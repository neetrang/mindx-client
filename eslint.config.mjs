import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Lấy đường dẫn file hiện tại
const __filename = fileURLToPath(import.meta.url);
// Lấy thư mục chứa file hiện tại
const __dirname = dirname(__filename);

// Khởi tạo FlatCompat để hỗ trợ cấu hình ESLint cũ
const compat = new FlatCompat({
  baseDirectory: __dirname, // Thư mục gốc của dự án
});

// Cấu hình ESLint
const eslintConfig = [
  // Mở rộng các config mặc định của Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Cho phép dùng type 'any' trong TypeScript
      "no-unused-vars": "off", // Tắt cảnh báo biến khai báo nhưng không dùng
      "@typescript-eslint/no-empty-interface": "off", // Cho phép interface rỗng
      "@typescript-eslint/no-empty-object-type": "off", // Tắt cảnh báo object rỗng
      "@typescript-eslint/no-unused-vars": "off", // Tắt cảnh báo biến TypeScript không dùng
      "@typescript-eslint/no-unused-expressions": "off", // Tắt cảnh báo biểu thức không dùng
    },
  },
];

export default eslintConfig; // Xuất cấu hình ESLint
