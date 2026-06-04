'use server';
/**
 * @fileOverview A Genkit flow for recommending personalized herbal teas based on user input.
 *
 * - recommendTea - A function that handles the tea recommendation process.
 * - AIRecipeRecommendationInput - The input type for the recommendTea function.
 * - AIRecipeRecommendationOutput - The return type for the recommendTea function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIRecipeRecommendationInputSchema = z.object({
  currentState: z.string().describe(
    'User\'s current well-being or desired state. Examples: "熬夜疲惫" (tired from staying up late), "午后犯困" (sleepy in the afternoon), "饭后油腻" (greasy after meal), "想喝清爽" (want refreshing), "想喝温润" (want warm), "想要放松" (want to relax).'
  ),
  tastePreference: z.string().describe(
    'User\'s preferred taste. Examples: "花香清爽" (floral and refreshing), "果香微甜" (fruity and slightly sweet), "草本回甘" (herbal with a sweet aftertaste), "温润甘甜" (warm and sweet), "清苦解腻" (refreshing bitter to cut grease), "低甜自然" (low sugar and natural).'
  ),
  drinkingScenario: z.string().describe(
    'User\'s intended drinking scenario. Examples: "上课 / 办公" (class / office), "饭后" (after meal), "逛街" (shopping), "晚间放松" (evening relaxation), "朋友聚会" (friends gathering), "独处阅读" (reading alone).'
  ),
  temperaturePreference: z.string().describe(
    'User\'s preference for hot or cold drink. Examples: "冰饮" (iced drink), "少冰" (less ice), "常温" (room temperature), "热饮" (hot drink).'
  ),
  currentSeason: z.string().describe(
    'Current season or weather perception. Examples: "春日微风" (spring breeze), "夏日炎热" (hot summer), "秋日干燥" (dry autumn), "冬日寒冷" (cold winter), "阴雨潮湿" (overcast and humid), "不确定，让 AI 判断" (uncertain, let AI decide).'
  ),
  avoidTaste: z.string().describe(
    'Tastes the user wants to avoid. Examples: "不要太苦" (not too bitter), "不要太甜" (not too sweet), "不要姜味" (no ginger taste), "不要花香太重" (not too strong floral), "不要浓草本味" (no strong herbal taste), "无特别忌口" (no specific taboos).'
  ),
});
export type AIRecipeRecommendationInput = z.infer<typeof AIRecipeRecommendationInputSchema>;

const AIRecipeRecommendationOutputSchema = z.object({
  teaName: z.string().describe('The recommended tea name in Chinese. Example: "清桂茶选"'),
  englishName: z.string().describe('The English name of the recommended tea. Example: "OSMANTHUS CLEAR BLEND"'),
  matchScore: z.number().describe('A percentage score indicating how well the tea matches the user\'s input. Example: 92'),
  reason: z.string().describe('A concise, one-sentence reason for the recommendation, aligning with SANITEA brand tone. Example: "适合想要清爽、轻盈、带有花草香气的午后状态。桂花与清爽草本调性结合，入口轻柔，尾调回甘。"'),
  tasteTags: z.array(z.string()).describe('Keywords describing the tea\'s taste profile. Examples: ["花香", "清爽", "微甘", "低负担"]').max(5),
  servingSuggestion: z.object({
    temperature: z.string().describe('Suggested serving temperature. Example: "少冰 / 常温"'),
    sweetness: z.string().describe('Suggested sweetness level. Example: "三分甜或无糖"'),
    scenario: z.string().describe('Suggested drinking scenarios. Example: "午后办公、饭后、逛街"'),
  }).describe('Detailed suggestions for enjoying the tea.'),
  herbalIngredients: z.array(z.string()).describe('Key herbal ingredients of the tea. Examples: ["桂花", "菊花", "金银花", "枸杞", "红枣"]').max(5),
  disclaimer: z.string().describe(
    'A fixed disclaimer stating that the recommendation is for reference only and not medical advice. Example: "本推荐仅用于日常茶饮选择参考，不构成医疗建议。如有特殊身体状况、孕期、过敏或正在服药，请先咨询专业人士。"'
  ).default('本推荐仅用于日常茶饮选择参考，不构成医疗建议。如有特殊身体状况、孕期、过敏或正在服药，请先咨询专业人士。'),
});
export type AIRecipeRecommendationOutput = z.infer<typeof AIRecipeRecommendationOutputSchema>;

export async function recommendTea(input: AIRecipeRecommendationInput): Promise<AIRecipeRecommendationOutput> {
  return aiRecipeRecommendationFlow(input);
}

const aiRecipeRecommendationPrompt = ai.definePrompt({
  name: 'aiRecipeRecommendationPrompt',
  input: { schema: AIRecipeRecommendationInputSchema },
  output: { schema: AIRecipeRecommendationOutputSchema },
  prompt: `你是一个专业的山宁 SANITEA AI 选茶顾问，擅长结合东方自然美学、草本理念和年轻化养生概念，为用户推荐符合他们当下状态的健康茶饮。你理解山宁品牌的深蓝黑色调、山水意象、金色植物线稿、简洁高级的风格。

请根据用户提供的信息，为他们推荐一款最适合的山宁茶饮。你的推荐应该避免任何医疗化表述，而是使用“适合”、“调和”、“轻养生”、“日常饮用参考”、“状态匹配”等温和表达。推荐结果必须是 JSON 格式，严格遵循以下输出结构。

用户当前状态：{{{currentState}}}
偏好口感：{{{tastePreference}}}
饮用场景：{{{drinkingScenario}}}
冷热偏好：{{{temperaturePreference}}}
当前季节/天气：{{{currentSeason}}}
避开口味：{{{avoidTaste}}}

请分析以上信息，提供一个单一、精确的茶饮推荐，并填充所有字段。如果用户选择“不确定，让 AI 判断”季节，请根据用户其他偏好给出最合理的推断。

遵循这些推荐规则作为参考（无需严格遵循，但需体现逻辑）：
- 如果用户选择“想喝清爽 / 花香清爽 / 夏日炎热 / 少冰”，推荐“清桂茶选”。
- 如果用户选择“想喝温润 / 热饮 / 冬日寒冷”，推荐“温润如玉”。
- 如果用户选择“果香微甜 / 放松 / 朋友聚会”，推荐“墨韵乌朱”。
- 如果用户选择“饭后油腻 / 清苦解腻”，推荐“清爽草本类茶饮”。

你的推荐应该如同高端茶饮菜单般优雅，而非医疗报告。`,
});

const aiRecipeRecommendationFlow = ai.defineFlow(
  {
    name: 'aiRecipeRecommendationFlow',
    inputSchema: AIRecipeRecommendationInputSchema,
    outputSchema: AIRecipeRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await aiRecipeRecommendationPrompt(input);
    return output!;
  }
);
