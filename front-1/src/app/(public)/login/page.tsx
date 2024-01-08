'use client';

import Image from "next/image";
import BackgroundLogin from "../../../assets/background-login.png";
import ImageLogin from "../../../assets/image-login.png";
import LogoDocumentall from "../../../assets/logo-documentall-2.png";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

type FormSchema = z.infer<typeof formSchema>;

const LoginPage = () => {
  const { replace } = useRouter();
  const onSubmit = async (data: FormSchema) => {

  };

  return (
    <main className="w-full min-h-screen flex flex-row">
      <section
        className="w-full min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${BackgroundLogin.src})`,
        }}
      >
        <div className="flex justify-center items-center w-full h-full">
          <div className="flex flex-col gap-10 justify-center items-center bg-white bg-opacity-20 h-2/3 w-3/6 rounded-lg">
            <Image src={ImageLogin} alt="login" width={300} />
            <p className="text-white font-medium text-lg">
              Seja bem-vindo!
            </p>

            <div className="flex w-full items-center gap-5">
              <div className="w-full h-[1px] bg-white bg-opacity-45"></div>
              <span className="text-nowrap font-light text-xs text-gray-100">
                Logue com
              </span>
              <div className="w-full h-[1px] bg-white bg-opacity-45"></div>
            </div>

            <Button className="p-5">
              <Image alt="logo documentall" src={LogoDocumentall} width={120} />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;