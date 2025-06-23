
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatTokenAmount } from '@/lib/utils';
import { useWallet } from '@/context/WalletContext';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { 
  RefreshCw, 
  ArrowUp, 
  ArrowDown, 
  Globe, 
  Droplet, 
  Mountain,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  Plus,
  Minus
} from 'lucide-react';

interface TokenData {
  symbol: string;
  name: string;
  balance: number;
  staked: number;
  earned: number;
  price: number;
  change24h: number;
  icon: React.ReactNode;
  color: string;
}

interface Props {
  onRefresh: () => void;
}

export default function TokenBalance({ onRefresh }: Props) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [tokens, setTokens] = useState<TokenData[]>([
    {
      symbol: 'VOD',
      name: 'VODeco',
      balance: user ? 1250.50 : 0,
      staked: user ? 500.00 : 0,
      earned: user ? 45.32 : 0,
      price: 1.50,
      change24h: 12.5,
      icon: <Globe className="h-5 w-5" />,
      color: 'blue'
    },
    {
      symbol: 'VOD_UZ',
      name: 'VOD Uzbekistan',
      balance: user ? 432.18 : 0,
      staked: user ? 200.00 : 0,
      earned: user ? 18.75 : 0,
      price: 1.42,
      change24h: 8.3,
      icon: <Mountain className="h-5 w-5" />,
      color: 'green'
    },
    {
      symbol: 'H2O',
      name: 'Water Token',
      balance: user ? 678.92 : 0,
      staked: user ? 1000.00 : 0,
      earned: user ? 62.15 : 0,
      price: 0.98,
      change24h: -2.1,
      icon: <Droplet className="h-5 w-5" />,
      color: 'cyan'
    }
  ]);

  const [portfolio, setPortfolio] = useState({
    totalValue: 0,
    totalChange24h: 0,
    totalStaked: 0,
    totalEarned: 0
  });

  useEffect(() => {
    calculatePortfolio();
  }, [tokens]);

  useEffect(() => {
    if (user) {
      loadUserTokens();
    }
  }, [user]);

  const calculatePortfolio = () => {
    const totalValue = tokens.reduce((sum, token) => sum + (token.balance * token.price), 0);
    const totalStaked = tokens.reduce((sum, token) => sum + (token.staked * token.price), 0);
    const totalEarned = tokens.reduce((sum, token) => sum + (token.earned * token.price), 0);
    
    // Расчет общего изменения за 24ч (взвешенное по стоимости)
    const totalChange24h = tokens.reduce((sum, token) => {
      const tokenValue = token.balance * token.price;
      const weightedChange = (tokenValue / totalValue) * token.change24h;
      return sum + weightedChange;
    }, 0);

    setPortfolio({
      totalValue,
      totalChange24h: isNaN(totalChange24h) ? 0 : totalChange24h,
      totalStaked,
      totalEarned
    });
  };

  const loadUserTokens = async () => {
    try {
      setIsLoading(true);
      
      // Загружаем токены пользователя с сервера
      const response = await fetch('/api/user/tokens', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const userTokens = await response.json();
        
        // Обновляем состояние токенов данными пользователя
        setTokens(prev => prev.map(token => {
          const userToken = userTokens.find((ut: any) => ut.tokenSymbol === token.symbol);
          if (userToken) {
            return {
              ...token,
              balance: userToken.balance || 0,
              staked: userToken.staked || 0,
              earned: userToken.earned || 0
            };
          }
          return token;
        }));
      }
    } catch (error) {
      console.error('Error loading user tokens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTokenData = async (tokenSymbol: string, balance: number, staked: number, earned: number) => {
    try {
      const response = await fetch('/api/user/tokens/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          tokenSymbol,
          balance,
          staked,
          earned
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save token data');
      }

      toast({
        title: "Данные сохранены",
        description: `Информация о ${tokenSymbol} токенах обновлена`
      });
    } catch (error) {
      toast({
        title: "Ошибка сохранения",
        description: "Не удалось сохранить данные о токенах",
        variant: "destructive"
      });
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await loadUserTokens();
    onRefresh();
    
    toast({
      title: "Балансы обновлены",
      description: "Актуальная информация о токенах загружена"
    });
  };

  const updateTokenBalance = (tokenSymbol: string, newBalance: number) => {
    setTokens(prev => prev.map(token => {
      if (token.symbol === tokenSymbol) {
        const updatedToken = { ...token, balance: newBalance };
        // Сохраняем в базу данных
        saveTokenData(tokenSymbol, newBalance, token.staked, token.earned);
        return updatedToken;
      }
      return token;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Уведомление для незарегистрированных пользователей */}
      {!user && (
        <Card className="border border-primary/20 bg-primary/5 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h4 className="font-medium text-primary">Демонстрационный кошелек</h4>
              <p className="text-sm text-foreground/60">
                Показаны доступные токены и функции. После регистрации у вас будет персональный кошелек с реальными балансами.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <Badge variant="outline">Покупка токенов</Badge>
                <Badge variant="outline">Стейкинг</Badge>
                <Badge variant="outline">Обмен</Badge>
                <Badge variant="outline">История транзакций</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Общий баланс портфеля */}
      <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Портфель</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="text-foreground/60 hover:text-foreground"
              >
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="text-foreground/60 hover:text-foreground"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold">
                {showBalance ? `$${portfolio.totalValue.toFixed(2)}` : '••••••'}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {portfolio.totalChange24h >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  portfolio.totalChange24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {portfolio.totalChange24h >= 0 ? '+' : ''}{portfolio.totalChange24h.toFixed(2)}%
                </span>
                <span className="text-foreground/60 text-sm">за 24ч</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary/10">
              <div className="text-center">
                <div className="text-sm text-foreground/60">В стейкинге</div>
                <div className="font-medium">
                  {showBalance ? `$${portfolio.totalStaked.toFixed(2)}` : '••••'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-foreground/60">Заработано</div>
                <div className="font-medium text-green-500">
                  {showBalance ? `$${portfolio.totalEarned.toFixed(2)}` : '••••'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-foreground/60">Всего токенов</div>
                <div className="font-medium">{tokens.length}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Список токенов */}
      <div className="space-y-4">
        {tokens.map((token) => (
          <Card key={token.symbol} className="border border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full bg-${token.color}-500/10`}>
                    <div className={`text-${token.color}-500`}>
                      {token.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">{token.name}</h3>
                    <p className="text-sm text-foreground/60">{token.symbol}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-medium">
                    {showBalance ? formatTokenAmount(token.balance) : '••••••'}
                  </div>
                  <div className="text-sm text-foreground/60">
                    {showBalance ? `$${(token.balance * token.price).toFixed(2)}` : '••••'}
                  </div>
                </div>
              </div>

              {/* Детальная информация */}
              <div className="mt-4 pt-4 border-t border-primary/10">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-foreground/60">Цена</div>
                    <div className="font-medium">${token.price.toFixed(3)}</div>
                    <div className={`text-xs ${
                      token.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-foreground/60">В стейкинге</div>
                    <div className="font-medium">
                      {showBalance ? formatTokenAmount(token.staked) : '••••'}
                    </div>
                    <div className="text-xs text-foreground/60">
                      {showBalance ? `$${(token.staked * token.price).toFixed(2)}` : '••••'}
                    </div>
                  </div>
                  <div>
                    <div className="text-foreground/60">Заработано</div>
                    <div className="font-medium text-green-500">
                      {showBalance ? `+${formatTokenAmount(token.earned)}` : '••••'}
                    </div>
                    <div className="text-xs text-foreground/60">
                      {showBalance ? `$${(token.earned * token.price).toFixed(2)}` : '••••'}
                    </div>
                  </div>
                </div>

                {/* Прогресс-бар стейкинга */}
                {token.staked > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-foreground/60 mb-1">
                      <span>Прогресс стейкинга</span>
                      <span>{((token.earned / token.staked) * 100).toFixed(1)}% доходность</span>
                    </div>
                    <Progress 
                      value={Math.min((token.earned / token.staked) * 100, 100)} 
                      className="h-2"
                    />
                  </div>
                )}

                {/* Быстрые действия */}
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <ArrowUp className="h-3 w-3" />
                    Отправить
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <ArrowDown className="h-3 w-3" />
                    Получить
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Plus className="h-3 w-3" />
                    Стейкинг
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Кнопка добавления токена */}
      <Card className="border border-dashed border-primary/30 bg-card/40 backdrop-blur-sm">
        <CardContent className="pt-6">
          <Button variant="ghost" className="w-full h-20 flex-col gap-2 text-foreground/60 hover:text-foreground">
            <Plus className="h-6 w-6" />
            <span>Добавить токен</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
