import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { UserInterface, LoginData, RegisterData } from "@shared/auth-schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type TempSession = {
  id: number;
  sessionId: string;
  tokensCollected: number;
  activitiesCompleted: number;
  startedAt: string;
  lastActiveAt: string;
};

type AuthContextType = {
  user: UserInterface | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  tempSession: TempSession | null;
  guestTokens: number;
  loginMutation: UseMutationResult<UserInterface, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<UserInterface, Error, RegisterData>;
  addGuestTokens: (amount: number, activityType?: string) => Promise<void>;
  createTempSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [tempSession, setTempSession] = useState<TempSession | null>(null);
  const [guestTokens, setGuestTokens] = useState(0);
  
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<UserInterface | null, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Создание временной сессии для гостей
  const createTempSession = async () => {
    if (!user && !tempSession) {
      try {
        const res = await apiRequest("POST", "/api/temp-session/create");
        const session = await res.json();
        setTempSession(session);
        setGuestTokens(session.tokensCollected || 0);
        localStorage.setItem('guestSessionId', session.sessionId);
      } catch (error) {
        console.error("Error creating temp session:", error);
      }
    }
  };

  // Добавление токенов для гостей
  const addGuestTokens = async (amount: number, activityType: string = 'exploration') => {
    if (!user && tempSession) {
      try {
        const res = await apiRequest("POST", `/api/temp-session/${tempSession.sessionId}/tokens`, {
          tokensToAdd: amount,
          activityType
        });
        const updatedSession = await res.json();
        setTempSession(updatedSession);
        setGuestTokens(updatedSession.tokensCollected);
      } catch (error) {
        console.error("Error adding guest tokens:", error);
      }
    }
  };

  // Инициализация гостевой сессии при загрузке
  useEffect(() => {
    if (!user && !tempSession) {
      const savedSessionId = localStorage.getItem('guestSessionId');
      if (savedSessionId) {
        // Попытаться восстановить существующую сессию
        apiRequest("GET", `/api/temp-session/${savedSessionId}`)
          .then(res => res.json())
          .then(session => {
            setTempSession(session);
            setGuestTokens(session.tokensCollected || 0);
          })
          .catch(() => {
            // Если сессия не найдена, создать новую
            createTempSession();
          });
      } else {
        createTempSession();
      }
    }
  }, [user, tempSession]);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: async (user: UserInterface) => {
      queryClient.setQueryData(["/api/user"], user);
      
      // Конвертируем временную сессию если есть
      if (tempSession && guestTokens > 0) {
        try {
          await apiRequest("POST", `/api/temp-session/${tempSession.sessionId}/convert`);
          toast({
            title: "Токены перенесены",
            description: `${guestTokens} токенов добавлены на ваш аккаунт!`,
          });
        } catch (error) {
          console.error("Error converting temp session:", error);
        }
      }
      
      // Очищаем гостевую сессию
      setTempSession(null);
      setGuestTokens(0);
      localStorage.removeItem('guestSessionId');
      
      toast({
        title: "Успешный вход",
        description: `Добро пожаловать, ${user.username || 'пользователь'}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка входа",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const res = await apiRequest("POST", "/api/register", data);
      return await res.json();
    },
    onSuccess: async (user: UserInterface) => {
      queryClient.setQueryData(["/api/user"], user);
      
      // Конвертируем временную сессию если есть
      if (tempSession && guestTokens > 0) {
        try {
          await apiRequest("POST", `/api/temp-session/${tempSession.sessionId}/convert`);
          toast({
            title: "Токены перенесены",
            description: `${guestTokens} токенов добавлены на ваш аккаунт!`,
          });
        } catch (error) {
          console.error("Error converting temp session:", error);
        }
      }
      
      // Очищаем гостевую сессию
      setTempSession(null);
      setGuestTokens(0);
      localStorage.removeItem('guestSessionId');
      
      toast({
        title: "Регистрация успешна",
        description: "Ваш аккаунт был успешно создан",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка регистрации",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      // Создаем новую гостевую сессию после выхода
      createTempSession();
      toast({
        title: "Выход выполнен",
        description: "Вы успешно вышли из системы",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка выхода",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        error,
        isAuthenticated: !!user,
        tempSession,
        guestTokens,
        loginMutation,
        logoutMutation,
        registerMutation,
        addGuestTokens,
        createTempSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
}