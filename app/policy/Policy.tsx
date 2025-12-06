import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div>
      <div className={"w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3"}>
        <h1 className={`${styles.title} !text-start pt-2`}>
          Điều Khoản và Chính Sách của Nền Tảng
        </h1>
        <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Đây là phần mô tả về các điều khoản, quyền lợi và trách nhiệm khi sử dụng nền tảng. Người dùng cần đọc kỹ và tuân thủ các quy định này.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Người dùng đồng ý cung cấp thông tin chính xác khi đăng ký và sử dụng dịch vụ. Mọi hành vi gian lận, vi phạm luật pháp sẽ bị xử lý theo quy định.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Nội dung trên nền tảng thuộc quyền sở hữu trí tuệ của MindX. Người dùng không được sao chép, phân phối hoặc sử dụng cho mục đích thương mại mà chưa được phép.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            MindX không chịu trách nhiệm cho các mất mát hoặc thiệt hại phát sinh từ việc sử dụng dịch vụ. Người dùng cần đảm bảo an toàn thông tin cá nhân và dữ liệu của mình.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            MindX có quyền thay đổi, cập nhật các điều khoản và chính sách bất cứ lúc nào. Người dùng sẽ được thông báo qua email hoặc thông báo trên nền tảng.
          </p>
        </ul>
      </div>
    </div>
  );
};

export default Policy;
