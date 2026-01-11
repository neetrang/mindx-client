import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props = {}

const FAQ = (props: Props) => {
  const { data } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout?.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className={`${styles.title} 800px:text-[40px]`}>
          Câu Hỏi Thường Gặp
        </h1>

        <div className="mt-12">
          <dl className="space-y-6">
            {questions?.map((q, index) => {
              const open = activeQuestion === q._id;

              return (
                <div
                  key={q._id || index}
                  className={`
                    transition-all duration-300
                    rounded-3xl 
                    shadow-md
                    px-6 py-5
                    cursor-pointer 
                    ${open ? "bg-orange-200" : "bg-orange-100/60 hover:bg-orange-200/70"}
                  `}
                  onClick={() => toggleQuestion(q._id)}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start justify-between w-full text-left focus:outline-none"
                    >
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {q.questionVi || q.question} {/* Hiển thị câu hỏi tiếng Việt nếu có */}
                      </span>

                      <span className="ml-6 flex-shrink-0">
                        {open ? (
                          <HiMinus className="h-6 w-6 text-orange-500" />
                        ) : (
                          <HiPlus className="h-6 w-6 text-orange-500" />
                        )}
                      </span>
                    </button>
                  </dt>

                  {open && (
                    <dd className="mt-3 pr-4">
                      <p className="text-base font-Roboto text-gray-700 dark:text-white">
                        {q.answerVi || q.answer} {/* Hiển thị câu trả lời tiếng Việt nếu có */}
                      </p>
                    </dd>
                  )}
                </div>
              );
            })}
          </dl>
        </div>

        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default FAQ;
