"use client";

import { Form, FormBtn, FormFields } from "@/app/auth/styles";
import api from "@/lib/api";
import { Link, TextField, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function onRegister() {
    setLoading(true);
    try {
      const body = { username: username.trim(), password };
      const resp = await api.post("/auth/register", body);

      router.replace("/auth/login");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <Form>
      <Typography variant="h5">Start Today</Typography>

      <FormFields>
        <TextField
          label="Username"
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormFields>

      <FormBtn loading={isLoading} variant="contained" onClick={onRegister}>
        Sign Up
      </FormBtn>

      <Typography sx={{ alignSelf: "flex-end" }} variant="body2">
        Existing user?{" "}
        <Link replace component={NextLink} href="/auth/login">
          Login &rarr;
        </Link>
      </Typography>
    </Form>
  );
}
