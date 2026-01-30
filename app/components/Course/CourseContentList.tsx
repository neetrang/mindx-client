import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  // Lấy danh sách section duy nhất
  const videoSections: string[] = [
    ...new Set<string>(props.data?.map((item: any) => item.videoSection)),
  ];

  const totalCount: number = 0; // Tổng số video từ các section trước

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-4 w-full ${
        !props.isDemo &&
        "ml-[-30px] min-h-screen sticky top-24 left-0 z-30"
      }`}
    >
      {videoSections.map((section: string) => {
        const isSectionVisible = visibleSections.has(section);

        const sectionVideos = props.data.filter(
          (item: any) => item.videoSection === section
        );

        const sectionVideoCount = sectionVideos.length;
        const sectionVideoLength = sectionVideos.reduce(
          (total: number, item: any) => total + item.videoLength,
          0
        );

        const sectionContentHours = sectionVideoLength / 60;

        return (
          <div
            key={section}
            className="mb-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm"
          >
            {/* SECTION HEADER */}
            <div
              onClick={() => toggleSection(section)}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {section}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {sectionVideoCount} bài học ·{" "}
                  {sectionVideoLength < 60
                    ? sectionVideoLength
                    : sectionContentHours.toFixed(2)}{" "}
                  {sectionVideoLength > 60 ? "giờ" : "phút"}
                </p>
              </div>

              {isSectionVisible ? (
                <BsChevronUp
                  size={20}
                  className="text-gray-600 dark:text-gray-300"
                />
              ) : (
                <BsChevronDown
                  size={20}
                  className="text-gray-600 dark:text-gray-300"
                />
              )}
            </div>

            {/* VIDEO LIST */}
            {isSectionVisible && (
              <div className="border-t border-gray-200 dark:border-white/10">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex = index;

                  const contentLength = item.videoLength / 60;

                  const isActive = videoIndex === props.activeVideo;

                  return (
                    <div
                      key={item._id}
                      onClick={() =>
                        props.isDemo ? null : props.setActiveVideo(videoIndex)
                      }
                      className={`flex items-start gap-3 p-3 cursor-pointer transition
                        ${
                          isActive
                            ? "bg-blue-50 dark:bg-blue-900/30"
                            : "hover:bg-gray-50 dark:hover:bg-white/5"
                        }
                      `}
                    >
                      <MdOutlineOndemandVideo
                        size={22}
                        className="text-blue-500 dark:text-blue-400 mt-1"
                      />

                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium break-words ${
                            isActive
                              ? "text-blue-600 dark:text-blue-300"
                              : "text-gray-900 dark:text-gray-200"
                          }`}
                        >
                          {item.title}
                        </p>

                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.videoLength > 60
                            ? contentLength.toFixed(2)
                            : item.videoLength}{" "}
                          {item.videoLength > 60 ? "giờ" : "phút"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

};

export default CourseContentList;
