import LoginForm from "../../components/Authentication/LoginForm";
import { Center } from "@chakra-ui/react";
import { useContext, useEffect, useLayoutEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

function Login() {
  const { userData, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (userId) {
      navigate("/home");
    }
  }, [userId]);

  return (
    <div className="bg-white h-full overflow-hidden w-full">
      <LoginForm />
    </div>
  );
}

export default Login;
