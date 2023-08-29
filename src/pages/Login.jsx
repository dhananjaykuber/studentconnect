import { useState } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { FaEnvelope, FaEye, FaGithub, FaGoogle, FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form className="shadow-lg rounded-md p-10">
        <div className="text-xl font-semibold mb-5">Login</div>
        <FormInput
          label="Email"
          placeholder="studentconnect@gmail.com"
          type="email"
          required={true}
          name="email"
          onChange={(text) => setEmail(text)}
          leftIcon={<FaEnvelope className="text-slate-400 text-sm" />}
        />
        <FormInput
          label="Password"
          placeholder="Password"
          type="password"
          required={true}
          name="password"
          leftIcon={<FaLock className="text-slate-400 text-sm" />}
          rightIcon={<FaEye className="text-slate-400 text-sm" />}
        />
        <Button label={'Login'} />

        <div className="flex items-center my-4">
          <div className="bg-slate-400 flex-1 h-[1.2px]"></div>
          <span className="mx-4 text-xs font-semibold text-slate-500">OR</span>
          <div className="bg-slate-400 flex-1 h-[1.2px]"></div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            type="button"
            class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
          >
            <FaGithub className="mr-2" />
            Sign in with Github
          </button>
          <button
            type="button"
            class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
