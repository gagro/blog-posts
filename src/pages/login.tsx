import {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";
import React, { useCallback } from "react";
import { signIn, getSession } from "next-auth/react";
import useForm from "../hooks/useForm";
import { User } from "@prisma/client";
import { Button, Form, Input } from "../components/form";
import Router from "next/router";

const Login: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { handleSubmit, handleChange, values, errors } = useForm({
    initialValues: {
      username: "",
      password: "",
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
    },
    onSubmit: (form) => onSubmit(form),
  });

  const onSubmit = useCallback((form: Partial<User>) => {
    signIn("credentials", { ...form, redirect: false }).then((response) => {
      if (response!.ok) {
        Router.push("/");
      } else {
        alert(response!.error);
      }
    });
  }, []);

  return (
    <Form title="Login" handleSubmit={handleSubmit}>
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
        type="password"
        value={values.password!}
        onChange={handleChange}
        name="password"
        placeholder="Password"
        label="Password"
        error={errors.password}
        maxLength={15}
      />
      <Button text="Login" type="submit" />
    </Form>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);

  if (session) return { redirect: { destination: "/", permanent: false } };

  return { props: {} };
}

export default Login;
