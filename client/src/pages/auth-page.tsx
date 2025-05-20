import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, loginSchema } from "@shared/schema";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const { user, isLoading, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Редирект, если пользователь уже авторизован
  if (user && !isLoading) {
    setLocation("/");
    return null;
  }

  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen p-4 md:gap-12">
      <div className="w-full md:w-1/2 max-w-md">
        <Card className="w-full backdrop-blur-sm bg-background/70 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {activeTab === "login" ? "Войти в VODeco" : "Регистрация в VODeco"}
            </CardTitle>
            <CardDescription className="text-center">
              {activeTab === "login" 
                ? "Войдите, чтобы получить доступ к платформе экологического управления водными ресурсами." 
                : "Создайте аккаунт для участия в экосистеме VODeco."
              }
            </CardDescription>
          </CardHeader>
          <Tabs 
            defaultValue="login" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as "login" | "register")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      <div className="hidden md:block w-full md:w-1/2 space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter text-primary">
            Добро пожаловать в VODeco
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Децентрализованная платформа для экологического мониторинга и управления водными ресурсами
          </p>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center">
            <div className="bg-background/70 backdrop-blur-sm p-6 rounded-lg border border-primary/20">
              <h3 className="text-lg font-medium text-primary mb-2">DAO Управление</h3>
              <p className="text-sm text-muted-foreground">
                Участвуйте в децентрализованном принятии решений по экологическим проектам
              </p>
            </div>
            <div className="bg-background/70 backdrop-blur-sm p-6 rounded-lg border border-primary/20">
              <h3 className="text-lg font-medium text-primary mb-2">Мониторинг Ресурсов</h3>
              <p className="text-sm text-muted-foreground">
                Отслеживайте состояние водных ресурсов в режиме реального времени
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const { toast } = useToast();
  const { loginMutation } = useAuth();
  const [_, setLocation] = useLocation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    loginMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Успешный вход",
          description: "Добро пожаловать в VODeco!",
        });
        setLocation("/");
      },
      onError: (error) => {
        toast({
          title: "Ошибка входа",
          description: error.message || "Проверьте email и пароль",
          variant: "destructive",
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="yourmail@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full" 
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Вход...
            </>
          ) : (
            "Войти"
          )}
        </Button>
        <div className="text-center text-sm mt-4">
          <p className="text-muted-foreground">
            Еще нет аккаунта?{" "}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => document.querySelector('[value="register"]')?.dispatchEvent(new MouseEvent('click'))}
            >
              Зарегистрируйтесь
            </button>
          </p>
        </div>
      </form>
    </Form>
  );
}

function RegisterForm() {
  const { toast } = useToast();
  const { registerMutation } = useAuth();
  const [_, setLocation] = useLocation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    // Убираем confirmPassword при отправке
    const { confirmPassword, ...userData } = values;
    
    registerMutation.mutate(userData, {
      onSuccess: () => {
        toast({
          title: "Регистрация успешна",
          description: "Добро пожаловать в VODeco!",
        });
        setLocation("/");
      },
      onError: (error) => {
        toast({
          title: "Ошибка регистрации",
          description: error.message || "Пожалуйста, проверьте введенные данные",
          variant: "destructive",
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="yourmail@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтверждение пароля</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full" 
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Регистрация...
            </>
          ) : (
            "Зарегистрироваться"
          )}
        </Button>
        <div className="text-center text-sm mt-4">
          <p className="text-muted-foreground">
            Уже есть аккаунт?{" "}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => document.querySelector('[value="login"]')?.dispatchEvent(new MouseEvent('click'))}
            >
              Войдите
            </button>
          </p>
        </div>
      </form>
    </Form>
  );
}