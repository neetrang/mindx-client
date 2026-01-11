import React from "react";
import { styles } from "../styles/style";

const Policy = () => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        Chính sách - <span className="text-gradient">MindX</span>
      </h1>

      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Roboto">
          MindX là cộng đồng học lập trình dành cho mọi đối tượng, giúp các lập trình viên mới và những người muốn nâng cao kỹ năng tiếp cận các kiến thức và công cụ thực tế. 
          <br />
          <br />
          Chúng tôi cung cấp các khóa học chất lượng với chi phí hợp lý, đảm bảo mọi người đều có cơ hội học tập và phát triển, bất kể kinh nghiệm hay trình độ hiện tại.
          <br />
          <br />
          Tại MindX, chúng tôi tin vào việc học tập chủ động và hỗ trợ lẫn nhau. Cộng đồng của chúng tôi gồm những người cùng chí hướng, sẵn sàng trao đổi, giải đáp thắc mắc và chia sẻ kinh nghiệm.
          <br />
          <br />
          Các khóa học kết hợp giữa lý thuyết và thực hành, giúp bạn xây dựng kỹ năng lập trình vững chắc, đồng thời phát triển tư duy giải quyết vấn đề và khả năng làm việc nhóm.
          <br />
          <br />
          MindX không chỉ tập trung vào kiến thức mà còn tạo môi trường học tập tích cực, giúp học viên tự tin ứng dụng kiến thức vào các dự án thực tế.
          <br />
          <br />
          Hãy tham gia cộng đồng MindX để phát triển kỹ năng, kết nối với những người cùng đam mê và đạt được mục tiêu nghề nghiệp của bạn.
        </p>
        <br />
        <span className="text-[22px]">MaiTrang&apos;s</span>
        <h5 className="text-[18px] font-Roboto">
          Người sáng lập kiêm CEO của MindX
        </h5>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Policy;
