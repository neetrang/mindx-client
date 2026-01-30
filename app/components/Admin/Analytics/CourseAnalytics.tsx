import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts"; 
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";
import { Tooltip } from "recharts";

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  const minValue = 0;

  const formatMonthVN = (date: string) => {
  const d = new Date(date);
    return `Thg ${d.getMonth() + 1}, ${d.getFullYear()}`;
  };


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px] w-[90%] mx-auto">
            <h1 className={`${styles.title} !text-start`}>
              Khóa học
            </h1>
            <p className={`${styles.label}`}>
              Dữ liệu phân tích trong 12 tháng gần nhất
            </p>
          </div>


          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis
                  dataKey="name"
                  tickFormatter={(value) => formatMonthVN(value)}
                  tick={{ fontSize: 12 }}
                >
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Tooltip
                  labelFormatter={(label) => formatMonthVN(label)}
                  formatter={(value) => [`${value}`, "Số khóa học"]}
                />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
