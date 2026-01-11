import { Suspense } from "react";
import Heading from "../utils/Heading";
import Loader from "../components/Loader/Loader";
import CoursesClient from "../courses/CoursesClient";
import CoursesLayoutClient from "./CoursesLayoutClient";


export default function Page() {
  return (
    <CoursesLayoutClient>
      <main className="w-[95%] 900px:w-[85%] max-w-[1400px] mx-auto min-h-[70vh] py-12">
        <Heading
          title="Tất cả khóa học – MindX"
          description="Khám phá các khóa học chất lượng cao, được thiết kế để giúp bạn nâng cao kỹ năng và sẵn sàng cho công việc thực tế."
          keywords="MindX, khóa học lập trình, học coding, kỹ năng công nghệ"
        />

        <Suspense fallback={<Loader />}>
          <CoursesClient />
        </Suspense>
      </main>
    </CoursesLayoutClient>
  );
}
