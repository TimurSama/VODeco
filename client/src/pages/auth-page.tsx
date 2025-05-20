import { useState } from "react";
import { Redirect } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@shared/auth-schema";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
            <TabsTrigger value="login">{t('common.login')}</TabsTrigger>
            <TabsTrigger value="register">{t('common.register')}</TabsTrigger>
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
          <h1 className="mb-4 text-4xl font-bold">{t('auth.welcome')}</h1>
          <p className="mb-6 text-lg">
            {t('auth.platformDescription', 'Взаимодействуйте с глобальным сообществом для эффективного управления водными ресурсами через децентрализованную автономную организацию с использованием технологии блокчейн.')}
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FeatureCard
              title={t('auth.features.visualization', '3D Визуализация')}
              description={t('auth.features.visualizationDesc', 'Интерактивная трехмерная карта водных ресурсов по всему миру')}
            />
            <FeatureCard
              title={t('auth.features.governance', 'DAO Управление')}
              description={t('auth.features.governanceDesc', 'Децентрализованное принятие решений для устойчивого управления')}
            />
            <FeatureCard
              title={t('auth.features.tokenization', 'Токенизация')}
              description={t('auth.features.tokenizationDesc', 'Инвестиционные возможности через токены блокчейн')}
            />
            <FeatureCard
              title={t('auth.features.eco', 'Экологические инициативы')}
              description={t('auth.features.ecoDesc', 'Поддержка проектов сохранения и восстановления воды')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ isLoading, onSubmit }) => {
  const { t } = useTranslation();
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

  // Обработчик входа через Google
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  // Обработчик входа через Telegram
  const handleTelegramLogin = () => {
    // Здесь будет логика для вызова Telegram авторизации
    // Перенаправляем запрос на TelegramLogin виджет или наш собственный endpoint
    // В данный момент просто заглушка для демонстрации
    alert("Авторизация через Telegram будет доступна в ближайшее время");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('auth.loginTitle')}</CardTitle>
        <CardDescription>
          {t('auth.welcome')}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">{t('auth.username')}</Label>
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
            <Label htmlFor="password">{t('auth.password')}</Label>
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
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t('auth.orLoginWith', 'Или войдите через')}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full flex items-center gap-2"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              {t('auth.google', 'Google')}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full flex items-center gap-2"
              onClick={handleTelegramLogin}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#229ED9">
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"></path>
              </svg>
              {t('auth.telegram', 'Telegram')}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('common.login')}...
              </>
            ) : (
              t('common.login')
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

const RegisterForm = ({ isLoading, onSubmit }) => {
  const { t } = useTranslation();
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
        <CardTitle>{t('auth.registerTitle')}</CardTitle>
        <CardDescription>
          {t('auth.createAccount')}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="register-username">{t('auth.username')}</Label>
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
            <Label htmlFor="email">{t('auth.email')}</Label>
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
              <Label htmlFor="firstName">{t('auth.firstName')}</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                placeholder={t('auth.firstName')}
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t('auth.lastName')}</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                placeholder={t('auth.lastName')}
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">{t('auth.password')}</Label>
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('common.register')}...
              </>
            ) : (
              t('common.register')
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