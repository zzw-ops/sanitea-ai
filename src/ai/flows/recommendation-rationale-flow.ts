'use server';
/**
 * @fileOverview A Genkit flow to explain the rationale behind a tea recommendation.
 *
 * - generateRecommendationRationale - A function that generates an explanation for a recommended tea.
 * - RecommendationRationaleInput - The input type for the generateRecommendationRationale function.
 * - RecommendationRationaleOutput - The return type for the generateRecommendationRationale function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommendationRationaleInputSchema = z.object({
  userState: z.array(z.string()).describe('User selected states (e.g., 熬夜疲惫, 想喝清爽).'),
  tastePreference: z.array(z.string()).describe('User selected taste preferences (e.g., 花香清爽, 低甜自然).'),
  drinkingScene: z.array(z.string()).describe('User selected drinking scenes (e.g., 上课 / 办公, 晚间放松).'),
  tempPreference: z.array(z.string()).describe('User selected temperature preferences (e.g., 冰饮, 热饮).'),
  season: z.array(z.string()).describe('User selected season or weather (e.g., 春日微风, 冬日寒冷).'),
  aversion: z.array(z.string()).describe('User selected taste aversions (e.g., 不要太苦, 无特别忌口).'),
  recommendedTea: z.object({
    name: z.string().describe('Name of the recommended tea (e.g., 清桂茶选).'),
    englishName: z.string().optional().describe('English name of the recommended tea.'),
    description: z.string().optional().describe('A brief description of the recommended tea.'),
    flavorKeywords: z.array(z.string()).describe('Keywords describing the tea\u2019s flavor (e.g., 花香, 清爽, 微甘).'),
    suitableStates: z.array(z.string()).describe('States for which the tea is suitable (e.g., 想要清爽, 午后犯困).'),
    ingredients: z.array(z.string()).describe('Key herbal ingredients of the tea (e.g., 桂花, 菊花).'),
    tempSuggestion: z.string().describe('Suggested temperature for the tea (e.g., 少冰 / 常温).'),
    sweetnessSuggestion: z.string().describe('Suggested sweetness level for the tea (e.g., 三分甜或无糖).'),
    sceneSuggestion: z.string().describe('Suggested drinking scenes for the tea (e.g., 午后办公、饭后、逛街).'),
  }).describe('Details of the recommended tea.'),
});
export type RecommendationRationaleInput = z.infer<typeof RecommendationRationaleInputSchema>;

const RecommendationRationaleOutputSchema = z.object({
  rationale: z.string().describe('A concise explanation of why the tea was recommended.'),
});
export type RecommendationRationaleOutput = z.infer<typeof RecommendationRationaleOutputSchema>;

export async function generateRecommendationRationale(input: RecommendationRationaleInput): Promise<RecommendationRationaleOutput> {
  return recommendationRationaleFlow(input);
}

const recommendationRationalePrompt = ai.definePrompt({
  name: 'recommendationRationalePrompt',
  input: { schema: RecommendationRationaleInputSchema },
  output: { schema: RecommendationRationaleOutputSchema },
  prompt: `你是一个新式中药健康茶饮品牌“山宁 SANITEA”的AI选茶顾问，擅长以东方自然美学和年轻化、轻科技感的口吻，为用户提供茶饮推荐理由。

请根据用户提供的状态、口味偏好、饮用场景、冷热偏好、季节和避开的口味，结合推荐茶饮的特点，生成一份简洁、有文化气息且避免医疗化表达的推荐理由。

**重要限制：**
- 页面中不能出现“治疗疾病”、“治愈”、“药效保证”、“改善疾病”等医疗化表述。
- 所有文案应使用“适合”、“调和”、“轻养生”、“日常饮用参考”、“状态匹配”等温和表达。
- 明确提示：推荐仅作为茶饮选择参考，不构成医疗建议。
- 语气要温和、克制、有东方韵味、年轻但不幼稚、有轻科技感，不夸大功效。
- 字数控制在100字以内，重点突出茶饮如何契合用户的核心需求。

**用户输入：**
- 用户状态：{{{userState}}}
- 口味偏好：{{{tastePreference}}}
- 饮用场景：{{{drinkingScene}}}
- 冷热偏好：{{{tempPreference}}}
- 季节：{{{season}}}
- 避开的口味：{{{aversion}}}

**推荐茶饮详情：**
- 名称：{{{recommendedTea.name}}} ({{{recommendedTea.englishName}}})
- 描述：{{{recommendedTea.description}}}
- 口味标签：{{{recommendedTea.flavorKeywords}}}
- 适合状态：{{{recommendedTea.suitableStates}}}
- 主要成分：{{{recommendedTea.ingredients}}}
- 建议温度：{{{recommendedTea.tempSuggestion}}}
- 建议甜度：{{{recommendedTea.sweetnessSuggestion}}}
- 建议场景：{{{recommendedTea.sceneSuggestion}}}

**请生成推荐理由：**`,
});

const recommendationRationaleFlow = ai.defineFlow(
  {
    name: 'recommendationRationaleFlow',
    inputSchema: RecommendationRationaleInputSchema,
    outputSchema: RecommendationRationaleOutputSchema,
  },
  async (input) => {
    const { output } = await recommendationRationalePrompt(input);
    return output!;
  }
);
