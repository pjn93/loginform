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

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    const { email, password } = data;
  
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }


    toast.success("Login successful");
    reset();
 
  };


  return (
<div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <Input type="email" placeholder="Enter your email" {...register("email")} />
   
        <p className="error">{errors.email?.message}</p>

        <Input
          placeholder="Enter your password"
          showToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
          {...register("password")}
        />
        <p className="error">{errors.password?.message}</p>
        <Button label="Login" />
        <p className="signup-text">
          Don't have an account? <a href="/">Sign Up</a>
         
        </p>
      </form>
    </div>
  );
};

export default Login;
