import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { LoginRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../../../hooks/users/useLogin";
import useTitle from "../../../hooks/useTitle";
import { Link, useNavigate } from "react-router-dom";
import Section from "../../../components/UI/Section/Section";
import {
  boxSX,
  buttonSX,
  loginFormSX,
  sectionStyles,
} from "../../../utils/StylesHelper/LoginRegister";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync, isPending } = useLogin();
  const { loginUser } = useAuth();
  const theme = useTheme();
  const navigateTo = useNavigate();

  useTitle("Login | Flow - SPA and Fitness");

  const onSubmit = async (data: { email: string; password: string }) => {
    mutateAsync(data)
      .then((data) => {
        loginUser(data.token);
        toast.success("Login successful!");
        const redirectPath = new URLSearchParams(location.search).get("continue") || "/home";
        navigateTo(redirectPath);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.response?.status === 403) {
          toast.error("Email or password is invalid");
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <Section bgColor={theme.palette.secondary.dark} style={sectionStyles}>
      <Box sx={boxSX(theme, false)}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Box component="form" sx={loginFormSX} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="input-email"
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email", {
              required: "Email is required!",
            })}
            error={errors.email?.message?.length ? true : false}
            helperText={errors.email?.message}
            type="email"
            autoComplete="email"
          />
          <FormControl variant="outlined" fullWidth error={!!errors.password}>
            <InputLabel htmlFor="outlined-adornment-password" error={!!errors.password}>
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((isShown) => !isShown)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              {...register("password", {
                required: "Password is required!",
              })}
              error={!!errors.password}
              autoComplete="current-password"
            />
            <FormHelperText error={!!errors.password}>{errors.password?.message}</FormHelperText>
          </FormControl>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Don't have an account?
            <Button
              component={Link}
              to="/register"
              sx={{ marginLeft: 1, color: theme.palette.primary.main }}
            >
              Register here
            </Button>
          </Typography>
          <Button
            variant="contained"
            startIcon={<LoginRounded />}
            type="submit"
            size="medium"
            sx={buttonSX(theme, false)}
            disabled={isPending}
          >
            {isPending ? <CircularProgress size={24} color="inherit" /> : "Log-in"}
          </Button>
        </Box>
      </Box>
    </Section>
  );
}

export default Login;
