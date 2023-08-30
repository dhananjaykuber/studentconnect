import { useState } from "react";
import FormInput from "../components/form/FormInput";
import Button from "../components/Button";
import { FaEnvelope, FaEye, FaGithub, FaGoogle, FaLock } from "react-icons/fa";
import Form from "../components/form/Form";

const Signup = () => {
  const [email, setEmail] = useState("");

  return (
    <Form label={"Signup"}>
      <FormInput
        label="Email"
        placeholder="studentconnect@gmail.com"
        type="email"
        required={true}
        name="email"
        onChange={(text) => setEmail(text)}
        leftIcon={<FaEnvelope className="text-sm text-slate-400" />}
      />
      <FormInput
        label="Password"
        placeholder="Password"
        type="password"
        required={true}
        name="password"
        leftIcon={<FaLock className="text-sm text-slate-400" />}
        rightIcon={<FaEye className="text-sm text-slate-400" />}
      />
      <Button label={"Signup"} radius={"lg"} />

      <div className="my-4 flex items-center">
        <div className="h-[1.2px] flex-1 bg-slate-400 dark:h-[0.9px]"></div>
        <span className="mx-4 text-xs font-semibold text-slate-500">OR</span>
        <div className="h-[1.2px] flex-1 bg-slate-400 dark:h-[0.9px]"></div>
      </div>
      <div className="flex flex-col">
        <button
          type="button"
          class="mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500"
        >
          <FaGithub className="mr-2" />
          Sign up with Github
        </button>
        <button
          type="button"
          class="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
        >
          <FaGoogle className="mr-2" />
          Sign up with Google
        </button>
      </div>
    </Form>
  );
};

export default Signup;
