import type { NextPage, InferGetServerSidePropsType } from "next";
import { useCallback } from "react";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { GetServerSideProps } from "next";
import useForm from "../hooks/useForm";
import { api } from "./../utils/api";
import { User } from "@prisma/client";
import { Button, Form, Input } from "../components/form";

const Page: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { handleSubmit, handleChange, values, errors } = useForm({
    initialValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validations: {
      username: {
        required: {
          value: true,
          message: "Username is required",
        },
      },
      password: {
        required: {
          value: true,
          message: "Password is required",
        },
      },
      firstName: {
        required: {
          value: true,
          message: "First name is required",
        },
      },
      lastName: {
        required: {
          value: true,
          message: "Last name is required",
        },
      },
    },
    onSubmit: (data) => onSubmit(data),
  });

  const registerMutation = api.user.registerUser.useMutation({
    onSuccess: () => {
      Router.push("/login");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onSubmit = useCallback((form: User) => {
    registerMutation.mutate(form);
  }, []);

  return (
    <Form title="Register" handleSubmit={handleSubmit}>
      <Input
        type="text"
        value={values.username!}
        onChange={handleChange}
        name="username"
        placeholder="Username"
        label="Username"
        error={errors.username}
        maxLength={15}
      />
      <Input
        value={values.password!}
        onChange={handleChange}
        name="password"
        placeholder="Password"
        label="Password"
        type="password"
        error={errors.password}
        minLength={6}
        maxLength={15}
      />
      <Input
        type="text"
        value={values.firstName!}
        onChange={handleChange}
        name="firstName"
        placeholder="First name"
        label="First Name"
        error={errors.firstName}
        maxLength={15}
      />
      <Input
        type="text"
        value={values.lastName!}
        onChange={handleChange}
        name="lastName"
        placeholder="Last name"
        label="Last Name"
        error={errors.lastName}
        maxLength={15}
      />
      <Button text="Register" type="submit" />
    </Form>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) return { redirect: { destination: "/", permanent: false } };

  return { props: {} };
};

export default Page;
