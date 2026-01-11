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

  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();

  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  /* ===== Load Stripe + tạo PaymentIntent ===== */
  useEffect(() => {
    if (config?.publishableKey) {
      setStripePromise(loadStripe(config.publishableKey));
    }

    if (data?.course?.price) {
      // GỬI SỐ TIỀN VND – BACKEND SẼ *100
      createPaymentIntent(data.course.price);
    }
  }, [config, data, createPaymentIntent]);

  /* ===== Nhận client secret ===== */
  useEffect(() => {
    if (paymentIntentData?.client_secret) {
      setClientSecret(paymentIntentData.client_secret);
    }
  }, [paymentIntentData]);

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

          {stripePromise && clientSecret && (
            <CourseDetails
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          )}

          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
