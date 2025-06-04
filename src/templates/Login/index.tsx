import type React from "react";
import { useState, useEffect } from "react";
import { AlertCircle, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/use-auth";
import { CardHeader, CardContent, CardTitle } from "../../components/card";
import { Label } from "../../components/input";
import { Button } from "../../components/button";

import * as S from "./styles";

export function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setLoginForm({ email: "", password: "" });
    setRegisterForm({
      email: "",
      password: "",
      confirmPassword: "",
    });
    setShowLoginPassword(false);
    setShowRegisterPassword(false);
    setShowConfirmPassword(false);
    setError("");

    return () => {
      setLoginForm({ email: "", password: "" });
      setRegisterForm({
        email: "",
        password: "",
        confirmPassword: "",
      });
    };
  }, []);

  useEffect(() => {
    if (activeTab === "login") {
      setLoginForm({ email: "", password: "" });
      setShowLoginPassword(false);
    } else {
      setRegisterForm({
        email: "",
        password: "",
        confirmPassword: "",
      });
      setShowRegisterPassword(false);
      setShowConfirmPassword(false);
    }
    setError("");
  }, [activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!loginForm.email || !loginForm.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const success = await login(loginForm);
    if (success) {
      router.push("/home");
    } else {
      setError("Invalid email or password");
    }

    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.confirmPassword
    ) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const result = await register({
      email: registerForm.email,
      password: registerForm.password,
    });

    console.log("Registration result:", result);

    if (result) {
      router.push("/home");
    } else {
      setError("Registration failed. This email may already be registered.");
    }

    setIsLoading(false);
  };

  return (
    <S.LoginPage>
      <S.LoginContainer>
        <CardHeader style={{ textAlign: "center" }}>
          <CardTitle>DocAI</CardTitle>
          <S.Description>
            Sign in or create an account to get started
          </S.Description>
        </CardHeader>
        <CardContent>
          <S.TabContainer>
            <S.Tab
              active={activeTab === "login"}
              onClick={() => setActiveTab("login")}
            >
              Login
            </S.Tab>
            <S.Tab
              active={activeTab === "register"}
              onClick={() => setActiveTab("register")}
            >
              Sign Up
            </S.Tab>
          </S.TabContainer>
          {activeTab === "login" ? (
            <S.Form onSubmit={handleLogin} autoComplete="off">
              <div>
                <Label>Email</Label>
                <S.SignInInput
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <Label>Password</Label>
                <S.InputWrapper>
                  <S.SignInInput
                    autoComplete="current-password"
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    disabled={isLoading}
                    required
                  />
                  <S.EyeButton
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    tabIndex={-1}
                  >
                    {showLoginPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </S.EyeButton>
                </S.InputWrapper>
              </div>
              {error && (
                <S.ErrorContainer>
                  <AlertCircle size={16} />
                  {error}
                </S.ErrorContainer>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                style={{ width: "100%" }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    &nbsp;Please wait
                  </>
                ) : (
                  <>
                    Sign In
                  </>
                )}
              </Button>
            </S.Form>
          ) : (
            <S.Form onSubmit={handleRegister} autoComplete="off">
              <div>
                <Label>Email</Label>
                <S.SignInInput
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, email: e.target.value })
                  }
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <Label>Password</Label>
                <S.InputWrapper>
                  <S.SignInInput
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                    disabled={isLoading}
                    required
                  />
                  <S.EyeButton
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    tabIndex={-1}
                  >
                    {showRegisterPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </S.EyeButton>
                </S.InputWrapper>
              </div>
              <div>
                <Label>Confirm Password</Label>
                <S.InputWrapper>
                  <S.SignInInput
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={registerForm.confirmPassword}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    disabled={isLoading}
                    required
                  />
                  <S.EyeButton
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </S.EyeButton>
                </S.InputWrapper>
              </div>
              {error && (
                <S.ErrorContainer>
                  <AlertCircle size={16} />
                  {error}
                </S.ErrorContainer>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                style={{ width: "100%" }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    &nbsp;Please wait
                  </>
                ) : (
                  <>
                    Sign Up
                  </>
                )}
              </Button>
            </S.Form>
          )}
        </CardContent>
      </S.LoginContainer>
    </S.LoginPage>
  );
}
