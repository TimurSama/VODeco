
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  TrendingUp, 
  Gift, 
  Coins, 
  Timer,
  Award,
  DollarSign,
  Percent
} from "lucide-react";
import { tokenService, TokenCalculation, StakingOption } from "@/services/tokenService";

interface TokenCalculatorProps {
  userBalance?: number;
  userStakingPower?: number;
}

const TokenCalculator: React.FC<TokenCalculatorProps> = ({ 
  userBalance = 0, 
  userStakingPower = 0 
}) => {
  const [activeTab, setActiveTab] = useState('rewards');
  const [stakingAmount, setStakingAmount] = useState('1000');
  const [selectedStakingOption, setSelectedStakingOption] = useState('medium');
  const [votingStreak, setVotingStreak] = useState(5);
  const [purchaseAmount, setPurchaseAmount] = useState('500');
  const [selectedTokenType, setSelectedTokenType] = useState('VOD');

  const [calculations, setCalculations] = useState({
    registration: null as TokenCalculation | null,
    voting: null as TokenCalculation | null,
    staking: null as any,
    purchase: null as any
  });

  const stakingOptions = tokenService.getStakingOptions();
  const exchangeRates = tokenService.getExchangeRates();

  useEffect(() => {
    // Обновляем расчеты при изменении параметров
    updateCalculations();
  }, [stakingAmount, selectedStakingOption, votingStreak, purchaseAmount, selectedTokenType]);

  const updateCalculations = () => {
    // Расчет бонуса за регистрацию
    const registration = tokenService.calculateRegistrationBonus(true, true);

    // Расчет награды за голосование
    const voting = tokenService.calculateVotingReward(votingStreak, true);

    // Расчет стейкинга
    const stakingOption = stakingOptions.find(opt => opt.id === selectedStakingOption);
    const staking = stakingOption ? tokenService.calculateStakingReturns(
      parseFloat(stakingAmount) || 0,
      stakingOption.apy + (stakingOption.bonusApy || 0),
      stakingOption.lockPeriod
    ) : null;

    // Расчет покупки
    const basePrice = 1.25; // Базовая цена VOD в USD
    const currentPrice = tokenService.calculateTokenPrice(basePrice, 1.2);
    const purchaseAmountNum = parseFloat(purchaseAmount) || 0;
    const purchase = {
      amount: purchaseAmountNum,
      pricePerToken: currentPrice,
      totalCost: purchaseAmountNum * currentPrice,
      fees: purchaseAmountNum * currentPrice * 0.025, // 2.5% комиссия
      finalCost: purchaseAmountNum * currentPrice * 1.025
    };

    setCalculations({
      registration,
      voting,
      staking,
      purchase
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Заголовок */}
      <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Calculator className="h-5 w-5" />
            Калькулятор токенов VODeco
          </CardTitle>
          <p className="text-foreground/80 text-sm">
            Рассчитайте доходность, награды и стоимость операций с токенами
          </p>
        </CardHeader>
      </Card>

      {/* Основные вкладки */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-background/20 p-1 grid grid-cols-4">
          <TabsTrigger value="rewards" className="flex items-center data-[state=active]:bg-primary/20">
            <Gift className="w-4 h-4 mr-2" />
            Награды
          </TabsTrigger>
          <TabsTrigger value="staking" className="flex items-center data-[state=active]:bg-primary/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Стейкинг
          </TabsTrigger>
          <TabsTrigger value="purchase" className="flex items-center data-[state=active]:bg-primary/20">
            <DollarSign className="w-4 h-4 mr-2" />
            Покупка
          </TabsTrigger>
          <TabsTrigger value="exchange" className="flex items-center data-[state=active]:bg-primary/20">
            <Coins className="w-4 h-4 mr-2" />
            Обмен
          </TabsTrigger>
        </TabsList>

        {/* Вкладка наград */}
        <TabsContent value="rewards" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Бонус за регистрацию */}
            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="h-5 w-5 text-yellow-400" />
                  Бонус за регистрацию
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {calculations.registration && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Базовая награда:</span>
                      <span className="font-semibold">{formatNumber(calculations.registration.baseAmount)} VOD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Множитель:</span>
                      <span className="font-semibold text-green-400">x{calculations.registration.bonusMultiplier}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-foreground">Итого:</span>
                      <span className="text-xl font-bold text-primary">{formatNumber(calculations.registration.finalAmount)} VOD</span>
                    </div>
                    <p className="text-xs text-foreground/60">{calculations.registration.reason}</p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Награда за голосование */}
            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="h-5 w-5 text-blue-400" />
                  Награда за голосование
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-foreground/80 mb-2 block">Серия голосований:</label>
                  <Input 
                    type="number"
                    value={votingStreak}
                    onChange={(e) => setVotingStreak(parseInt(e.target.value) || 0)}
                    min="0"
                    max="50"
                  />
                </div>
                {calculations.voting && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Базовая награда:</span>
                      <span className="font-semibold">{formatNumber(calculations.voting.baseAmount)} VOD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Бонус за серию:</span>
                      <span className="font-semibold text-green-400">x{calculations.voting.bonusMultiplier.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-foreground">Итого:</span>
                      <span className="text-xl font-bold text-primary">{formatNumber(calculations.voting.finalAmount)} VOD</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Дополнительные награды */}
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-accent" />
                Дополнительные награды
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-background/30 rounded-lg border border-primary/10">
                  <h4 className="font-medium text-white mb-2">Ежедневный вход</h4>
                  <p className="text-2xl font-bold text-primary">10-50 VOD</p>
                  <p className="text-xs text-foreground/60">В зависимости от серии</p>
                </div>
                <div className="p-3 bg-background/30 rounded-lg border border-primary/10">
                  <h4 className="font-medium text-white mb-2">Миссии</h4>
                  <p className="text-2xl font-bold text-green-400">25-150 VOD</p>
                  <p className="text-xs text-foreground/60">За выполнение заданий</p>
                </div>
                <div className="p-3 bg-background/30 rounded-lg border border-primary/10">
                  <h4 className="font-medium text-white mb-2">Рефералы</h4>
                  <p className="text-2xl font-bold text-yellow-400">200 VOD</p>
                  <p className="text-xs text-foreground/60">За каждого приглашенного</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Вкладка стейкинга */}
        <TabsContent value="staking" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Калькулятор стейкинга */}
            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Калькулятор стейкинга
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-foreground/80 mb-2 block">Сумма стейкинга (VOD):</label>
                  <Input 
                    type="number"
                    value={stakingAmount}
                    onChange={(e) => setStakingAmount(e.target.value)}
                    placeholder="1000"
                  />
                </div>

                <div>
                  <label className="text-sm text-foreground/80 mb-2 block">Период стейкинга:</label>
                  <Select value={selectedStakingOption} onValueChange={setSelectedStakingOption}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {stakingOptions.map(option => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name} - {option.apy + (option.bonusApy || 0)}% APY
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {calculations.staking && (
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Ежедневный доход:</span>
                      <span className="font-semibold text-green-400">+{formatNumber(calculations.staking.dailyReturn)} VOD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Месячный доход:</span>
                      <span className="font-semibold text-green-400">+{formatNumber(calculations.staking.monthlyReturn)} VOD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Общий доход:</span>
                      <span className="font-semibold text-accent">+{formatNumber(calculations.staking.totalReturn)} VOD</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-foreground">Итоговая сумма:</span>
                      <span className="text-xl font-bold text-primary">{formatNumber(calculations.staking.finalAmount)} VOD</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Опции стейкинга */}
            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  Доступные пулы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stakingOptions.map(option => (
                  <div 
                    key={option.id} 
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedStakingOption === option.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-primary/20 bg-background/30 hover:border-primary/40'
                    }`}
                    onClick={() => setSelectedStakingOption(option.id)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-white">{option.name}</h4>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        {option.apy + (option.bonusApy || 0)}% APY
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-foreground/60">Период:</span>
                        <span className="ml-1">{option.lockPeriod || 'Гибкий'} дней</span>
                      </div>
                      <div>
                        <span className="text-foreground/60">Минимум:</span>
                        <span className="ml-1">{formatNumber(option.minAmount)} VOD</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Вкладка покупки */}
        <TabsContent value="purchase" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Калькулятор покупки */}
            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Покупка токенов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-foreground/80 mb-2 block">Количество токенов:</label>
                  <Input 
                    type="number"
                    value={purchaseAmount}
                    onChange={(e) => setPurchaseAmount(e.target.value)}
                    placeholder="500"
                  />
                </div>

                <div>
                  <label className="text-sm text-foreground/80 mb-2 block">Тип токена:</label>
                  <Select value={selectedTokenType} onValueChange={setSelectedTokenType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VOD">VOD Token</SelectItem>
                      <SelectItem value="VOD_Uzbekistan">VOD Uzbekistan</SelectItem>
                      <SelectItem value="VOD_Aral">VOD Aral</SelectItem>
                      <SelectItem value="H2O">H2O Utility Token</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculations.purchase && (
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Цена за токен:</span>
                      <span className="font-semibold">{formatCurrency(calculations.purchase.pricePerToken)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Стоимость:</span>
                      <span className="font-semibold">{formatCurrency(calculations.purchase.totalCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Комиссия (2.5%):</span>
                      <span className="font-semibold text-yellow-600">{formatCurrency(calculations.purchase.fees)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-foreground">К оплате:</span>
                      <span className="text-xl font-bold text-primary">{formatCurrency(calculations.purchase.finalCost)}</span>
                    </div>
                  </div>
                )}

                <Button className="w-full mt-4" disabled={!purchaseAmount || parseFloat(purchaseAmount) <= 0}>
                  Купить токены
                </Button>
              </CardContent>
            </Card>

            {/* Информация о ценах */}
            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5" />
                  Текущие курсы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-background/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">VOD</span>
                    <span className="text-lg font-bold text-primary">$1.50</span>
                  </div>
                  <p className="text-xs text-green-400">+12.5% за 24ч</p>
                </div>
                <div className="p-3 bg-background/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">VOD_Uzbekistan</span>
                    <span className="text-lg font-bold text-green-400">$1.42</span>
                  </div>
                  <p className="text-xs text-green-400">+8.3% за 24ч</p>
                </div>
                <div className="p-3 bg-background/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">H2O</span>
                    <span className="text-lg font-bold text-blue-400">$0.98</span>
                  </div>
                  <p className="text-xs text-red-400">-2.1% за 24ч</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Вкладка обмена */}
        <TabsContent value="exchange" className="mt-6">
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Курсы обмена токенов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left p-3">Из</th>
                      <th className="text-left p-3">В</th>
                      <th className="text-right p-3">Курс</th>
                      <th className="text-right p-3">Комиссия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(exchangeRates).map(([fromToken, rates]) =>
                      Object.entries(rates).map(([toToken, rate]) => (
                        <tr key={`${fromToken}-${toToken}`} className="border-b border-primary/10">
                          <td className="p-3 font-medium">{fromToken}</td>
                          <td className="p-3 font-medium">{toToken}</td>
                          <td className="p-3 text-right">{rate.toFixed(4)}</td>
                          <td className="p-3 text-right text-yellow-400">0.3%</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokenCalculator;
