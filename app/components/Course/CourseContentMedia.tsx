
import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import { format } from "timeago.js";
import "@/app/utils/timeago-vi"; // đăng ký tiếng Việt
import React, { useEffect, useState } from "react"; 
import { toast } from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setactiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();
  const course = courseData?.course;
  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Câu hỏi không thể để trống");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

useEffect(() => {
  if (isSuccess) {
    setQuestion("");
    refetch();

    socketId.emit("notification", {
      title: "Có câu hỏi mới",
      message: `Một học viên vừa đặt câu hỏi trong bài "${data[activeVideo].title}"`,
      userId: user._id,
    });

    toast.success("Đã gửi câu hỏi thành công");
  }

  if (answerSuccess) {
    setAnswer("");
    refetch();

    if (user.role !== "admin") {
      socketId.emit("notification", {
        title: "Câu hỏi đã được trả lời",
        message: `Câu hỏi của bạn trong bài "${data[activeVideo].title}" đã có phản hồi mới`,
        userId: user._id,
      });
    }

    toast.success("Đã gửi câu trả lời");
  }

  if (reviewSuccess) {
    setReview("");
    setRating(1);
    courseRefetch();

    socketId.emit("notification", {
      title: "Có đánh giá mới",
      message: `Khóa học "${data[activeVideo].title}" vừa nhận được một đánh giá mới`,
      userId: user._id,
    });

    toast.success("Đánh giá của bạn đã được gửi");
  }

  if (replySuccess) {
    setReply("");
    courseRefetch();
    toast.success("Đã gửi phản hồi");
  }

  if (error && "data" in error) {
    toast.error((error as any).data.message);
  }

  if (answerError && "data" in answerError) {
    toast.error((answerError as any).data.message);
  }

  if (reviewError && "data" in reviewError) {
    toast.error((reviewError as any).data.message);
  }

  if (replyError && "data" in replyError) {
    toast.error((replyError as any).data.message);
  }
}, [
  isSuccess,
  answerSuccess,
  reviewSuccess,
  replySuccess,
  error,
  answerError,
  reviewError,
  replyError,
]);


  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Đánh giá không thể để trống");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Phản hồi không thể để trống");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId });
      }
    }
  };

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } text-white  !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Bài học trước
        </div>
        <div
          className={`${
            styles.button
          } !w-[unset] text-white  !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Bài học tiếp theo
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black ">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur border dark:border-white/10 shadow-sm">
        {["Tổng quan", "Bài tập", "Hỏi đáp", "Đánh giá"].map((text, index) => (
          <button
            key={index}
            onClick={() => setactiveBar(index)}
            className={`px-5 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200
              ${
                activeBar === index
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
              }
            `}
          >
            {text}
          </button>
        ))}
      </div>

      <br />
      {activeBar === 0 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border dark:border-white/10 rounded-xl p-4 shadow-sm">
            <p className="text-base whitespace-pre-line break-words text-black dark:text-white">
              {data[activeVideo]?.description}
            </p>
          </div>
        </div>
      )}

      {activeBar === 1 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border dark:border-white/10 rounded-xl p-4 shadow-sm">
            {data[activeVideo]?.links.map((item: any, index: number) => (
              <div className="mb-4 text-base" key={index}>
                <h2 className="inline-block text-black dark:text-white font-medium">
                  {item.title && item.title + " :"}
                </h2>
                <a
                  className="inline-block text-blue-500 pl-2 hover:underline break-all"
                  href={item.url}
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeBar === 2 && (
        <div className="space-y-6">
          {/* INPUT */}
          <div className="bg-white dark:bg-slate-800 border dark:border-white/10 rounded-xl p-4 shadow-sm">
            <div className="flex gap-3">
              <Image
                src={user.avatar?.url || "https://res.cloudinary.com/dm16ncix5/image/upload/v1765384995/avatar_qudmto.png"}
                width={50}
                height={50}
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Hỏi điều bạn chưa hiểu về bài học này..."
                className="w-full resize-none bg-transparent border border-gray-200 dark:border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex justify-end mt-3">
              <button
                onClick={handleQuestion}
                className="px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Gửi câu hỏi
              </button>
            </div>
          </div>

          {/* LIST */}
          <div className="space-y-4">
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              questionId={questionId}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </div>
      )}

      {activeBar === 3 && (
        <div className="space-y-6">
          {/* FORM */}
          {!isReviewExists && (
            <div className="bg-white dark:bg-slate-800 border dark:border-white/10 rounded-xl p-5 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Đánh giá khóa học</h3>

              <div className="flex items-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button key={i} onClick={() => setRating(i)}>
                    {rating >= i ? (
                      <AiFillStar size={28} color="#facc15" />
                    ) : (
                      <AiOutlineStar size={28} color="#facc15" />
                    )}
                  </button>
                ))}
              </div>

              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Chia sẻ trải nghiệm của bạn..."
                className="w-full resize-none bg-transparent border border-gray-200 dark:border-white/10 rounded-lg p-3"
              />

              <div className="flex justify-end mt-3">
                <button
                  onClick={handleReviewSubmit}
                  className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Gửi đánh giá
                </button>
              </div>
            </div>
          )}

          {/* LIST */}
          <div className="space-y-4">
            {course?.reviews
              ?.slice()
              .reverse()
              .map((item: any) => (
                <div
                  key={item._id}
                  className="bg-white dark:bg-slate-800 border dark:border-white/10 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex gap-3">
                    <Image
                      src={item.user.avatar?.url || "https://res.cloudinary.com/dm16ncix5/image/upload/v1765384995/avatar_qudmto.png"}
                      width={50}
                      height={50}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {item.user.name}
                      </h4>
                      <Ratings rating={item.rating} />
                    </div>

                    <p className="mt-1 text-gray-800 dark:text-gray-300 break-words">
                      {item.comment}
                    </p>

                    <small className="text-gray-500 dark:text-gray-400">
                      {format(item.createdAt, "vi")}
                    </small>
                    {item.commentReplies?.map((reply: any) => (
                      <div key={reply._id} className="flex gap-3 mt-4 ml-12">
                        <Image
                          src={
                            reply.user.avatar?.url ||
                            "https://res.cloudinary.com/dm16ncix5/image/upload/v1765384995/avatar_qudmto.png"
                          }
                          width={40}
                          height={40}
                          alt=""
                          className="w-[40px] h-[40px] rounded-full object-cover"
                        />

                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                            {reply.user.name}
                          </h5>

                          <p className="text-gray-700 dark:text-gray-300 break-words">
                            {reply.comment}
                          </p>

                          <small className="text-gray-500">
                            {format(reply.createdAt, "vi")}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  questionId,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            questionId={questionId}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  questionId,
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 border dark:border-white/10 rounded-xl p-4 shadow-sm my-4">
      {/* QUESTION */}
      <div className="flex gap-3">
        <Image
          src={
            item.user.avatar
              ? item.user.avatar.url
              : "https://res.cloudinary.com/dm16ncix5/image/upload/v1765384995/avatar_qudmto.png"
          }
          width={50}
          height={50}
          alt=""
          className="w-[50px] h-[50px] rounded-full object-cover"
        />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-black dark:text-white">
              {item.user.name}
            </h4>
            <span className="text-xs text-gray-500">
              {format(item.createdAt, "vi")}
            </span>
          </div>

          <p className="mt-1 text-gray-800 dark:text-gray-200">
            {item.question}
          </p>

          <div className="flex items-center gap-4 mt-2 text-sm text-blue-500">
            <button
              onClick={() => {
                setReplyActive(!replyActive);
                setQuestionId(item._id);
              }}
              className="hover:underline"
            >
              {replyActive
                ? "Ẩn trả lời"
                : item.questionReplies.length > 0
                ? `Xem ${item.questionReplies.length} trả lời`
                : "Trả lời"}
            </button>

            <span className="text-gray-400 flex items-center gap-1">
              <BiMessage size={16} /> {item.questionReplies.length}
            </span>
          </div>
        </div>
      </div>

      {/* REPLIES */}
      {replyActive && questionId === item._id && (
        <div className="
          mt-4 ml-10 space-y-3 pl-4
          border-l border-gray-200 dark:border-white/10
        ">
          {item.questionReplies?.map((reply: any, index: number) => (
            <div
              key={reply._id ?? index}
              className={`
                flex gap-3 p-3 rounded-xl
                transition
                ${
                  reply.user.role === "admin"
                    ? "bg-blue-50 dark:bg-blue-900/30 border border-blue-300/30"
                    : "bg-gray-100 dark:bg-slate-700"
                }
              `}
            >
              <Image
                src={
                  reply.user.avatar
                    ? reply.user.avatar.url
                    : "https://res.cloudinary.com/dm16ncix5/image/upload/v1765384995/avatar_qudmto.png"
                }
                width={40}
                height={40}
                alt=""
                className="w-[40px] h-[40px] rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                    {reply.user.name}
                  </span>

                  {reply.user.role === "admin" && (
                    <span className="text-[10px] px-2 py-[2px] rounded-full bg-blue-500 text-white">
                      Admin
                    </span>
                  )}
                </div>

                <p className="text-sm mt-1 text-gray-800 dark:text-gray-200 break-words">
                  {reply.answer}
                </p>

                <small className="text-xs text-gray-500 dark:text-gray-400">
                  {format(reply.createdAt, "vi")}
                </small>
              </div>
            </div>
          ))}

          {/* INPUT REPLY */}
          <div className="flex gap-2 pt-3">
            <input
              type="text"
              placeholder="Nhập câu trả lời..."
              value={answer}
              onChange={(e: any) => setAnswer(e.target.value)}
              className="
                flex-1 rounded-lg px-3 py-2
                bg-white dark:bg-slate-800
                text-gray-800 dark:text-gray-200
                placeholder-gray-400 dark:placeholder-gray-500
                border border-gray-200 dark:border-white/10
                text-sm outline-none
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition
              "
            />

            <button
              onClick={handleAnswerSubmit}
              disabled={!answer || answerCreationLoading}
              className="
                px-4 py-2 rounded-lg
                bg-blue-500 text-white
                hover:bg-blue-600
                active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed
                transition
              "
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;