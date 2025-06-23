
export interface TokenCalculation {
  baseAmount: number;
  bonusMultiplier: number;
  finalAmount: number;
  reason: string;
}

export interface StakingOption {
  id: string;
  name: string;
  apy: number;
  lockPeriod: number; // в днях
  minAmount: number;
  maxAmount?: number;
  bonusApy?: number; // дополнительный APY за длительный стейкинг
}

export interface TokenReward {
  type: 'registration' | 'vote' | 'mission' | 'referral' | 'daily' | 'staking';
  amount: number;
  multiplier: number;
  description: string;
}

class TokenService {
  // Базовые настройки наград
  private rewardSettings = {
    registration: {
      base: 500,
      referralBonus: 200,
      earlyAdopterMultiplier: 1.5 // до определенной даты
    },
    voting: {
      participationReward: 50,
      correctPredictionBonus: 100,
      streakMultiplier: 0.1 // +10% за каждое последовательное голосование
    },
    missions: {
      exploration: 25,
      dataCollection: 75,
      stakingMission: 150,
      communityAction: 100
    },
    daily: {
      loginBonus: 10,
      streakMultiplier: 0.05 // +5% за каждый день подряд
    },
    staking: {
      compoundFrequency: 'monthly' // как часто начисляются проценты
    }
  };

  // Расчет бонуса за регистрацию
  calculateRegistrationBonus(referralCode?: string, isEarlyAdopter: boolean = false): TokenCalculation {
    const settings = this.rewardSettings.registration;
    let baseAmount = settings.base;
    let bonusMultiplier = 1;

    if (referralCode) {
      baseAmount += settings.referralBonus;
    }

    if (isEarlyAdopter) {
      bonusMultiplier = settings.earlyAdopterMultiplier;
    }

    return {
      baseAmount,
      bonusMultiplier,
      finalAmount: baseAmount * bonusMultiplier,
      reason: this.getRegistrationReason(referralCode, isEarlyAdopter)
    };
  }

  // Расчет награды за голосование
  calculateVotingReward(votingStreak: number, correctPrediction: boolean = false): TokenCalculation {
    const settings = this.rewardSettings.voting;
    let baseAmount = settings.participationReward;
    let bonusMultiplier = 1 + (votingStreak * settings.streakMultiplier);

    if (correctPrediction) {
      baseAmount += settings.correctPredictionBonus;
    }

    return {
      baseAmount,
      bonusMultiplier,
      finalAmount: Math.round(baseAmount * bonusMultiplier),
      reason: this.getVotingReason(votingStreak, correctPrediction)
    };
  }

  // Расчет награды за миссии
  calculateMissionReward(missionType: keyof typeof this.rewardSettings.missions, difficulty: number = 1): TokenCalculation {
    const baseAmount = this.rewardSettings.missions[missionType];
    const bonusMultiplier = difficulty;

    return {
      baseAmount,
      bonusMultiplier,
      finalAmount: baseAmount * bonusMultiplier,
      reason: `Выполнение миссии: ${missionType} (сложность x${difficulty})`
    };
  }

  // Расчет ежедневного бонуса
  calculateDailyBonus(streak: number): TokenCalculation {
    const settings = this.rewardSettings.daily;
    const baseAmount = settings.loginBonus;
    const bonusMultiplier = 1 + (streak * settings.streakMultiplier);

    return {
      baseAmount,
      bonusMultiplier,
      finalAmount: Math.round(baseAmount * bonusMultiplier),
      reason: `Ежедневный вход (${streak} дней подряд)`
    };
  }

  // Расчет доходности стейкинга
  calculateStakingReturns(amount: number, apy: number, lockPeriod: number): {
    dailyReturn: number;
    monthlyReturn: number;
    totalReturn: number;
    finalAmount: number;
  } {
    const dailyRate = apy / 365 / 100;
    const dailyReturn = amount * dailyRate;
    const monthlyReturn = amount * (apy / 12 / 100);
    const totalReturn = amount * (Math.pow(1 + dailyRate, lockPeriod) - 1);
    const finalAmount = amount + totalReturn;

    return {
      dailyReturn,
      monthlyReturn,
      totalReturn,
      finalAmount
    };
  }

  // Доступные опции стейкинга
  getStakingOptions(): StakingOption[] {
    return [
      {
        id: 'flexible',
        name: 'Гибкий стейкинг',
        apy: 5.2,
        lockPeriod: 0,
        minAmount: 100,
        maxAmount: 50000
      },
      {
        id: 'short',
        name: 'Краткосрочный (30 дней)',
        apy: 8.5,
        lockPeriod: 30,
        minAmount: 500,
        maxAmount: 100000
      },
      {
        id: 'medium',
        name: 'Среднесрочный (90 дней)',
        apy: 12.3,
        lockPeriod: 90,
        minAmount: 1000,
        maxAmount: 250000,
        bonusApy: 2.0
      },
      {
        id: 'long',
        name: 'Долгосрочный (180 дней)',
        apy: 18.7,
        lockPeriod: 180,
        minAmount: 2500,
        maxAmount: 500000,
        bonusApy: 4.5
      },
      {
        id: 'premium',
        name: 'Премиум (365 дней)',
        apy: 25.0,
        lockPeriod: 365,
        minAmount: 10000,
        bonusApy: 7.0
      }
    ];
  }

  // Расчет цены токена в зависимости от спроса
  calculateTokenPrice(basePrice: number, demandMultiplier: number = 1): number {
    // Простая модель: цена растет с увеличением спроса
    return basePrice * demandMultiplier;
  }

  // Получение текущих курсов обмена между токенами
  getExchangeRates(): Record<string, Record<string, number>> {
    return {
      'VOD': {
        'VOD_Uzbekistan': 0.95,
        'VOD_Aral': 1.10,
        'VOD_Ural': 0.78,
        'H2O': 1.47
      },
      'VOD_Uzbekistan': {
        'VOD': 1.05,
        'VOD_Aral': 1.16,
        'VOD_Ural': 0.82,
        'H2O': 1.55
      },
      'H2O': {
        'VOD': 0.68,
        'VOD_Uzbekistan': 0.65,
        'VOD_Aral': 0.75,
        'VOD_Ural': 0.53
      }
    };
  }

  // Вспомогательные методы для генерации описаний
  private getRegistrationReason(referralCode?: string, isEarlyAdopter?: boolean): string {
    let reason = 'Регистрация в экосистеме VODeco';
    if (referralCode) reason += ' + бонус за реферала';
    if (isEarlyAdopter) reason += ' + бонус раннего участника';
    return reason;
  }

  private getVotingReason(streak: number, correctPrediction: boolean): string {
    let reason = 'Участие в голосовании DAO';
    if (streak > 0) reason += ` (серия ${streak})`;
    if (correctPrediction) reason += ' + бонус за правильное предсказание';
    return reason;
  }

  // Валидация транзакций
  validatePurchase(amount: number, tokenType: string): { valid: boolean; message?: string } {
    if (amount <= 0) {
      return { valid: false, message: 'Сумма должна быть больше 0' };
    }

    const minPurchase = 50; // Минимальная покупка
    if (amount < minPurchase) {
      return { valid: false, message: `Минимальная покупка: ${minPurchase} VOD` };
    }

    return { valid: true };
  }

  validateStaking(amount: number, optionId: string): { valid: boolean; message?: string } {
    const option = this.getStakingOptions().find(opt => opt.id === optionId);
    
    if (!option) {
      return { valid: false, message: 'Неверная опция стейкинга' };
    }

    if (amount < option.minAmount) {
      return { valid: false, message: `Минимальная сумма: ${option.minAmount} VOD` };
    }

    if (option.maxAmount && amount > option.maxAmount) {
      return { valid: false, message: `Максимальная сумма: ${option.maxAmount} VOD` };
    }

    return { valid: true };
  }
}

export const tokenService = new TokenService();
export default tokenService;
