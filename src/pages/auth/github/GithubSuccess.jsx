import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../../../features/user/userSlice";
import Layout from "../../../components/Layout";

const GithubSuccess = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const code = searchParams.get("code");

    if (user) {
      navigate("/profile");
    }

    const handleSendCode = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_DJANGO_API
          }/authentication/o/auth/github?code=${code}`,
        );
        localStorage.setItem(
          "user",
          JSON.stringify({ token: res.data.token, ...res.data.user }),
        );
        dispatch(setUser({ token: res.data.token, ...res.data.user }));
        navigate("/profile");
      } catch (error) {
        console.log(error);
      }
    };

    handleSendCode();
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-center text-sm font-medium text-gray-900 dark:text-white">
        Loading ...
      </div>
    </Layout>
  );
};

export default GithubSuccess;
