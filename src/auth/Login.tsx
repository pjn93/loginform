import React, { useState } from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, type LoginFormInputs } from "./Login.config";
import toast from "react-hot-toast";
import Button from "../components/button/Button";
import Input from "../components/input/Input";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    // Store credentials in localStorage or cookies based on the Remember Me option
    if (rememberMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password); // Optional: Store password securely (or use token-based auth)
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    toast.success("Login successful");
    reset();

    // Redirect user
    setTimeout(() => {
      // Implement navigation logic (e.g., redirect to home page)
      // navigate("/topics");
    }, 1000);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <Input type="email" placeholder="Email" {...register("email")} />
        <p className="error">{errors.email?.message}</p>

        <Input
          placeholder="Password"
          showToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
          {...register("password")}
        />
        <p className="error">{errors.password?.message}</p>

        <div className="remember-me-container">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>

        <Button label="Login" />

        <p className="forgot-password-link">
          <a href="/forgot-password">Forgot Password?</a>
        </p>

        <p className="signup-text">
          Don't have an account? <a href="/">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
