"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "@/redux/features/orders/ordersApi";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetCourseDetailsQuery(id);

  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  // load stripe key
  useEffect(() => {
    if (config?.publishableKey) {
      setStripePromise(loadStripe(config.publishableKey));
    }
  }, [config]);

  // 🔥 HÀM TẠO PAYMENT INTENT (CHỐT)
  const handleCreatePayment = async (price: number) => {
    const res: any = await createPaymentIntent(price).unwrap();
    setClientSecret(res.client_secret);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={`${data?.course?.name} - MindX`}
            description="MindX là cộng đồng lập trình giúp bạn học tập và phát triển kỹ năng công nghệ."
            keywords={data?.course?.tags}
          />

          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />

          <CourseDetails
            data={data.course}
            stripePromise={stripePromise}
            clientSecret={clientSecret}
            setRoute={setRoute}
            setOpen={setOpen}
            onCreatePayment={handleCreatePayment} // 🔥 QUAN TRỌNG
          />

          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
