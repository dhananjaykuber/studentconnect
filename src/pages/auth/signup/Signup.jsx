import { useState } from "react";
import FormInput from "../../../components/form/FormInput";
import Button from "../../../components/Button";
import {
  FaEnvelope,
  FaEye,
  FaGithub,
  FaGoogle,
  FaLock,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import Form from "../../../components/form/Form";
import Layout from "../../../components/Layout";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const handleRegister = async () => {
    setUsernameError(null);
    setEmailError(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_DJANGO_API}/authentication/register/`,
        {
          full_name: name,
          user_name: username,
          email: email,
          password: password,
        },
      );

      console.log(res);
    } catch (error) {
      if (error.response?.data?.error[0]?.email) {
        setEmailError(error.response?.data?.error[0]?.email);
      }
      if (error.response?.data?.error[0]?.user_name) {
        setUsernameError(error.response?.data?.error[0]?.user_name);
      }

      console.log(error.response);
    }
  };

  return (
    <Layout>
      <Form label={"Signup"}>
        <FormInput
          label="Full Name"
          placeholder="John Doe"
          type="text"
          required={true}
          value={name}
          onChange={(text) => setName(text)}
          leftIcon={<FaUser className="text-sm text-slate-400" />}
        />
        <FormInput
          label="Username"
          placeholder="johndoe"
          type="text"
          required={true}
          value={username}
          onChange={(text) => setUsername(text)}
          leftIcon={<FaUserAlt className="text-sm text-slate-400" />}
          error={usernameError}
        />
        <FormInput
          label="Email"
          placeholder="studentconnect@gmail.com"
          type="email"
          required={true}
          value={email}
          onChange={(text) => setEmail(text)}
          leftIcon={<FaEnvelope className="text-sm text-slate-400" />}
          error={emailError}
        />
        <FormInput
          label="Password"
          placeholder="Password"
          type="password"
          required={true}
          value={password}
          onChange={(text) => setPassword(text)}
          leftIcon={<FaLock className="text-sm text-slate-400" />}
          rightIcon={<FaEye className="text-sm text-slate-400" />}
        />
        <Button label={"Signup"} radius={"lg"} onclick={handleRegister} />

        <div className="my-4 flex items-center">
          <div className="h-[1.2px] flex-1 bg-slate-400 dark:h-[0.9px]"></div>
          <span className="mx-4 text-xs font-semibold text-slate-500">OR</span>
          <div className="h-[1.2px] flex-1 bg-slate-400 dark:h-[0.9px]"></div>
        </div>
        <div className="flex flex-col">
          <button
            type="button"
            className="mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus:ring-gray-500"
          >
            <FaGithub className="mr-2" />
            Sign up with Github
          </button>
          <button
            type="button"
            className="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
          >
            <FaGoogle className="mr-2" />
            Sign up with Google
          </button>
        </div>
      </Form>
    </Layout>
  );
};

export default Signup;
