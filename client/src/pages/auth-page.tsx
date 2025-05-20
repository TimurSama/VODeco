import { useState } from "react";
import { Redirect } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@shared/auth-schema";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { user, isLoading, loginMutation, registerMutation } = useAuth();

  // Если пользователь уже авторизован, перенаправляем на главную страницу
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full flex-col lg:flex-row">
      {/* Форма аутентификации */}
      <div className="flex flex-1 items-center justify-center p-4">
        <Tabs
          defaultValue={activeTab}
          className="w-full max-w-md"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm isLoading={loginMutation.isPending} onSubmit={loginMutation.mutate} />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm isLoading={registerMutation.isPending} onSubmit={registerMutation.mutate} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Информационная секция */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-[#053642]/90 to-[#053642]/70 p-8 text-white">
        <div className="max-w-xl">
          <h1 className="mb-4 text-4xl font-bold">VODeco - Платформа управления водными ресурсами</h1>
          <p className="mb-6 text-lg">
            Взаимодействуйте с глобальным сообществом для эффективного управления
            водными ресурсами через децентрализованную автономную организацию с использованием
            технологии блокчейн.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FeatureCard
              title="3D Визуализация"
              description="Интерактивная трехмерная карта водных ресурсов по всему миру"
            />
            <FeatureCard
              title="DAO Управление"
              description="Децентрализованное принятие решений для устойчивого управления"
            />
            <FeatureCard
              title="Токенизация"
              description="Инвестиционные возможности через токены блокчейн"
            />
            <FeatureCard
              title="Экологические инициативы"
              description="Поддержка проектов сохранения и восстановления воды"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ isLoading, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Вход в аккаунт</CardTitle>
        <CardDescription>
          Введите ваше имя пользователя и пароль для доступа к платформе.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Имя пользователя</Label>
            <Input
              id="username"
              {...register("username")}
              placeholder="username"
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Вход...
              </>
            ) : (
              "Войти"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

const RegisterForm = ({ isLoading, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
        <CardDescription>
          Введите ваши данные для регистрации на платформе.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="register-username">Имя пользователя</Label>
            <Input
              id="register-username"
              {...register("username")}
              placeholder="username"
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="example@mail.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Имя</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                placeholder="Имя"
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Фамилия</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                placeholder="Фамилия"
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Пароль</Label>
            <Input
              id="register-password"
              type="password"
              {...register("password")}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Регистрация...
              </>
            ) : (
              "Зарегистрироваться"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

const FeatureCard = ({ title, description }) => (
  <div className="rounded-lg bg-[#042e38]/50 p-4 transition-all hover:bg-[#042e38]/80">
    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-200">{description}</p>
  </div>
);

export default AuthPage;