import React, { useCallback } from "react";
import { NextPage } from "next";
import useForm from "../hooks/useForm";
import { api } from "../utils/api";
import Router from "next/router";
import { Post } from "@prisma/client";
import { Button, Input, Form, Textarea } from "../components/form";

const NewPost: NextPage = (props) => {
  const { handleSubmit, handleChange, values, errors } = useForm({
    initialValues: {
      title: "",
      text: "",
    },
    validations: {
      title: {
        required: {
          value: true,
          message: "Title is required",
        },
      },
      text: {
        required: {
          value: true,
          message: "Text is required",
        },
      },
    },
    onSubmit: (form) => onSubmit(form),
  });

  const addPost = api.post.addPost.useMutation({
    onSuccess: () => {
      Router.push("/");
    },
  });

  const onSubmit = useCallback((form: Post) => {
    addPost.mutate(form);
  }, []);

  return (
    <Form title="Write your new post" handleSubmit={handleSubmit}>
      <Input
        type="text"
        value={values.title!}
        onChange={handleChange}
        name="title"
        placeholder="Type in the title..."
        label="Title"
        error={errors.title}
        maxLength={200}
      />
      <Textarea
        value={values.text!}
        onChange={handleChange}
        name="text"
        placeholder="Type in the text..."
        label="Text"
        error={errors.text}
        maxLength={800}
      />
      <Button text="Submit" type="submit" />
    </Form>
  );
};

export default NewPost;
