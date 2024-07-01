import {
  Anchor,
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { FormEvent, useState } from "react";

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  linkText,
  linkHref,
  linkDescription,
  isFullForm = true,
}: {
  title: string;
  buttonText: string;
  onSubmit: (data: {
    first_name?: string;
    last_name?: string;
    email: string;
    password: string;
  }) => void;
  linkText: string;
  linkDescription: string;
  linkHref: string;
  isFullForm?: boolean;
}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack align="flex-start">
        <Title order={1} size="h2">
          {title}
        </Title>
        {isFullForm && (
          <>
            <TextInput
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
            <TextInput
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
          </>
        )}
        <TextInput
          type="email"
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          required
          onChange={handleInputChange}
        />
        <Button type="submit">{buttonText}</Button>
        <Text>
          {linkDescription} <Anchor href={linkHref}>{linkText}</Anchor>
        </Text>
      </Stack>
    </form>
  );
}
