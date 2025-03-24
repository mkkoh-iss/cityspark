import React, { useState, useMemo, useContext, useEffect } from "react";
import { Card, CardBody, Input } from "@nextui-org/react";
import { validateEmail } from "@/utils/validations/validateEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { SignupContext } from "@/contexts/SignupContext";
import AlertCard from "@/components/Common/AlertCard";
import { useNavigate } from 'react-router-dom';

const EMAIL_ERR_MSG = "This doesn't look like a valid email address";
const PASSWORD_ERR_MSG = "Password should be at least 8 characters long";
const CONFIRM_PASSWORD_ERR_MSG = "Passwords don't match";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData, updateFormValidity } = useContext(SignupContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");

  // Validate email, password and confirm password
  const isEmailValid = useMemo(() => {
    return validateEmail(email) ? true : false;
  }, [email]);

  const isPasswordValid = useMemo(() => {
    return password.length >= 8 ? true : false;
  }, [password]);

  const isConfirmPasswordValid = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const isFormValid = useMemo(() => {
    return isEmailValid && isPasswordValid && isConfirmPasswordValid;
  }, [isEmailValid, isPasswordValid, isConfirmPasswordValid]);

  // Control display of error message
  const displayEmailError = useMemo(() => {
    return email === "" ? false : !isEmailValid;
  }, [email, isEmailValid]);

  const displayPasswordError = useMemo(() => {
    return password === "" ? false : !isPasswordValid;
  }, [password, isPasswordValid]);

  const displayConfirmPasswordError = useMemo(() => {
    return confirmPassword === "" ? false : !isConfirmPasswordValid;
  }, [confirmPassword, isConfirmPasswordValid]);

  const validateForm = () => {
    let isValid = true;
    
    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    updateFormValidity(isValid);
    return isValid;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:8080/cityspark/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSignupError("");
        updateUserData({ email, password });
        // Redirect to login page after successful signup
        navigate('/login');
      } else {
        setSignupError(data.message || "Failed to create user");
      }
    } catch (error) {
      setSignupError("An error occurred during signup");
    }
  };

  useEffect(() => {
    if (validateForm()) {
      updateUserData({ email, password });
    }
  }, [email, password, confirmPassword]);

  return (
    <Card>
      <CardBody className="gap-4">
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!emailError}
            errorMessage={emailError}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!passwordError}
              errorMessage={passwordError}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              }
            />
          </div>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!confirmPasswordError}
              errorMessage={confirmPasswordError}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="focus:outline-none"
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              }
            />
          </div>
        </div>
        {(emailError || passwordError || confirmPasswordError || signupError) && (
          <AlertCard
            message={emailError || passwordError || confirmPasswordError || signupError}
            type="error"
          />
        )}
        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
      </CardBody>
    </Card>
  );
};

export default SignupForm;
