/**
 * @fileOverview 本地茶饮推荐逻辑。
 * 代替原本的 Genkit/AI 调用，实现纯前端规则引擎推荐。
 */

export interface TeaRecommendation {
  teaName: string;
  englishName: string;
  matchScore: number;
  reason: string;
  tasteTags: string[];
  servingSuggestion: {
    temperature: string;
    sweetness: string;
    scenario: string;
  };
  herbalIngredients: string[];
  disclaimer: string;
}

const TEA_DATABASE: Record<string, Omit<TeaRecommendation, 'matchScore' | 'reason'>> = {
  '清桂茶选': {
    teaName: '清桂茶选',
    englishName: 'OSMANTHUS CLEAR BLEND',
    tasteTags: ['花香', '清爽', '回甘', '低负担'],
    servingSuggestion: {
      temperature: '少冰 / 常温',
      sweetness: '三分甜或无糖',
      scenario: '午后办公、饭后、逛街',
    },
    herbalIngredients: ['桂花', '菊花', '金银花', '枸杞'],
    disclaimer: '本推荐仅用于日常茶饮选择参考，不构成医疗建议。如有特殊身体状况，请先咨询专业人士。'
  },
  '墨韵乌朱': {
    teaName: '墨韵乌朱',
    englishName: 'INK RHYME BLACK PEARL',
    tasteTags: ['果香', '去腻', '微甜', '深色草本'],
    servingSuggestion: {
      temperature: '冰饮 / 少冰',
      sweetness: '五分甜',
      scenario: '朋友聚会、夏日消暑、饭后',
    },
    herbalIngredients: ['乌梅', '桑葚', '山楂', '甘草'],
    disclaimer: '本推荐仅用于日常茶饮选择参考，不构成医疗建议。如有特殊身体状况，请先咨询专业人士。'
  },
  '温润如玉': {
    teaName: '温润如玉',
    englishName: 'JADE SMOOTHNESS',
    tasteTags: ['温润', '甘甜', '丝滑', '润燥'],
    servingSuggestion: {
      temperature: '热饮 / 常温',
      sweetness: '三分甜',
      scenario: '晚间放松、秋冬季节、独处阅读',
    },
    herbalIngredients: ['雪耳', '百合', '红枣', '莲子'],
    disclaimer: '本推荐仅用于日常茶饮选择参考，不构成医疗建议。如有特殊身体状况，请先咨询专业人士。'
  },
  '姜焙陈皮': {
    teaName: '姜焙陈皮',
    englishName: 'GINGER AGED PEEL',
    tasteTags: ['暖身', '醇厚', '草本', '辛香'],
    servingSuggestion: {
      temperature: '热饮',
      sweetness: '五分甜（建议热饮）',
      scenario: '冬日寒冷、雨天、驱寒暖胃',
    },
    herbalIngredients: ['老姜', '陈皮', '红糖', '桂圆'],
    disclaimer: '本推荐仅用于日常茶饮选择参考，不构成医疗建议。如有特殊身体状况，请先咨询专业人士。'
  }
};

export function getLocalRecommendation(answers: Record<string, string>): TeaRecommendation {
  let recommendedKey = '清桂茶选';
  let matchScore = 88 + Math.floor(Math.random() * 10); // 模拟随机匹配度

  // 简单的规则路由
  if (answers.currentState === '熬夜疲惫' || answers.currentSeason === '冬日寒冷' || answers.temperaturePreference === '热饮') {
    recommendedKey = answers.currentState === '想喝清爽' ? '清桂茶选' : '温润如玉';
    if (answers.currentSeason === '冬日寒冷') recommendedKey = '姜焙陈皮';
  } else if (answers.currentState === '饭后油腻' || answers.currentSeason === '夏日炎热') {
    recommendedKey = '墨韵乌朱';
  } else if (answers.tastePreference === '花香清爽') {
    recommendedKey = '清桂茶选';
  }

  const baseTea = TEA_DATABASE[recommendedKey];
  
  // 动态生成理由，模拟 AI 语气
  const reason = `针对您${answers.currentState}的状态，这款${baseTea.teaName}通过${baseTea.herbalIngredients.slice(0, 2).join('与')}的自然调和，为您带来${baseTea.tasteTags[0]}的体验，非常适合在${answers.drinkingScenario}时引用。`;

  return {
    ...baseTea,
    matchScore,
    reason,
  };
}
