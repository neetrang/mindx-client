import React from "react";
import { styles } from "../styles/style";

const About = () => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        MindX <span className="text-gradient">là gì?</span>
      </h1>

      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Roboto">
          Bạn đã sẵn sàng nâng cao kỹ năng lập trình của mình lên một tầm cao mới chưa? Hãy đến với MindX, cộng đồng lập trình hàng đầu được thiết kế để giúp những lập trình viên mới đạt được mục tiêu và phát huy tối đa tiềm năng của mình.
          <br />
          <br />
          Là người sáng lập kiêm CEO của MindX, tôi hiểu rõ những thách thức khi học tập và phát triển trong ngành lập trình. Đó là lý do tôi tạo ra MindX – để cung cấp cho các lập trình viên mới những tài nguyên và sự hỗ trợ cần thiết để thành công.
          <br />
          <br />
          Tại MindX, chúng tôi tin rằng chi phí không bao giờ nên là rào cản để đạt được ước mơ của bạn. Vì vậy, các khóa học của chúng tôi có mức giá thấp – để bất kỳ ai, bất kể tình hình tài chính, đều có thể tiếp cận những công cụ và kiến thức cần thiết để thành công.
          <br />
          <br />
          Nhưng MindX không chỉ là một cộng đồng – chúng tôi là một gia đình. Cộng đồng hỗ trợ của chúng tôi gồm những người cùng chí hướng sẽ đồng hành cùng bạn trên mọi bước đường, dù bạn mới bắt đầu hay muốn nâng cao kỹ năng của mình.
          <br />
          <br />
          Với MindX bên cạnh, không gì có thể ngăn bạn chạm tới công việc mơ ước. Các khóa học và cộng đồng của chúng tôi sẽ cung cấp cho bạn hướng dẫn, sự hỗ trợ và động lực để phát huy tối đa tiềm năng và trở thành lập trình viên giỏi.
          <br />
          <br />
          Vậy bạn còn chờ gì nữa? Hãy gia nhập gia đình MindX ngay hôm nay và cùng nhau chinh phục ngành lập trình! Với các khóa học giá cả phải chăng, video hướng dẫn hữu ích và cộng đồng hỗ trợ, bầu trời là giới hạn duy nhất.
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

export default About;
