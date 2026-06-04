'use server';
/**
 * @fileOverview This file provides a Genkit flow to generate 3-4 alternative tea suggestions
 * based on user preferences, to complement a primary tea recommendation.
 *
 * - alternativeTeaSuggestions - A function to get alternative tea recommendations.
 * - AlternativeTeaSuggestionsInput - The input type for the alternativeTeaSuggestions function.
 * - AlternativeTeaSuggestionsOutput - The return type for the alternativeTeaSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AlternativeTeaSuggestionsInputSchema = z.object({
  currentState: z.string().describe('User\u0027s current state or feeling (e.g., \u0027熬夜疲惫\u0027, \u0027想喝清爽\u0027)').optional(),
  preferredTaste: z.string().describe('User\u0027s preferred taste profile (e.g., \u0027花香清爽\u0027, \u0027温润甘甜\u0027)').optional(),
  drinkingScenario: z.string().describe('User\u0027s intended drinking scenario (e.g., \u0027上课 / 办公\u0027, \u0027晚间放松\u0027)').optional(),
  tempPreference: z.string().describe('User\u0027s preference for cold or hot beverage (e.g., \u0027冰饮\u0027, \u0027热饮\u0027)').optional(),
  seasonWeather: z.string().describe('Current season or weather condition (e.g., \u0027夏日炎热\u0027, \u0027冬日寒冷\u0027)').optional(),
  avoidTaste: z.string().describe('Tastes or ingredients the user wishes to avoid (e.g., \u0027不要太苦\u0027, \u0027不要姜味\u0027)').optional(),
  primaryTeaName: z.string().describe('The name of the primary tea already recommended, to ensure alternatives are distinct but complementary.').optional(),
});

export type AlternativeTeaSuggestionsInput = z.infer<typeof AlternativeTeaSuggestionsInputSchema>;

const AlternativeTeaSuggestionSchema = z.object({
  name: z.string().describe('Chinese name of the alternative tea.'),
  englishName: z.string().describe('English name of the alternative tea.'),
  keywords: z.string().describe('Short keywords describing the tea (e.g., \u0027清爽 / 花香 / 午后\u0027).'),
  suitability: z.string().describe('A brief description of who this tea is suitable for, avoiding medical claims.'),
  mainFlavor: z.string().describe('The main flavor profile of the tea.'),
});

const AlternativeTeaSuggestionsOutputSchema = z.array(AlternativeTeaSuggestionSchema).min(3).max(4);

export type AlternativeTeaSuggestionsOutput = z.infer<typeof AlternativeTeaSuggestionsOutputSchema>;

const alternativeTeaSuggestionsPrompt = ai.definePrompt({
  name: 'alternativeTeaSuggestionsPrompt',
  input: { schema: AlternativeTeaSuggestionsInputSchema },
  output: { schema: AlternativeTeaSuggestionsOutputSchema },
  prompt: `你是一个专业的山宁 SANITEA 茶饮推荐 AI。你的任务是根据用户提供的状态和偏好，推荐 3-4 款与主推荐茶饮（如果提供）风格相近但有所区别的备选茶饮。

所有推荐都必须符合山宁 SANITEA 的品牌理念：东方自然美学、简洁高级、年轻化的新式中药健康茶饮。文案必须温和、克制，不能出现任何医疗化表述，如“治疗疾病”“治愈”“药效保证”等。

请使用“适合”“调和”“轻养生”“日常饮用参考”“状态匹配”等温和表达。

用户当前的状态偏好如下：
{{#if currentState}}  - 状态: {{{currentState}}}{{/if}}
{{#if preferredTaste}}  - 口味偏好: {{{preferredTaste}}}{{/if}}
{{#if drinkingScenario}}  - 饮用场景: {{{drinkingScenario}}}{{/if}}
{{#if tempPreference}}  - 冷热偏好: {{{tempPreference}}}{{/if}}
{{#if seasonWeather}}  - 季节/天气: {{{seasonWeather}}}{{/if}}
{{#if avoidTaste}}  - 避开口味: {{{avoidTaste}}}{{/if}}
{{#if primaryTeaName}}主推荐茶饮为：{{{primaryTeaName}}}，请推荐与其搭配或互补的备选。{{/if}}

请严格按照以下 JSON 格式输出 3-4 款备选茶饮：

示例输出：
[
  {
    "name": "清桂茶选",
    "englishName": "OSMANTHUS CLEAR BLEND",
    "keywords": "清爽 / 花香 / 午后",
    "suitability": "适合想要轻盈口感与自然花香的人群。",
    "mainFlavor": "花香、清爽"
  },
  {
    "name": "温润如玉",
    "englishName": "JADE SMOOTHNESS",
    "keywords": "温润 / 甘甜 / 热饮",
    "suitability": "适合偏好温热、柔和、甜润口感的时刻。",
    "mainFlavor": "温润、甘甜"
  },
  {
    "name": "墨韵乌朱",
    "englishName": "INK RHYME BLACK PEARL",
    "keywords": "果香 / 深色草本 / 微甜",
    "suitability": "适合喜欢层次感与东方果香的人群。",
    "mainFlavor": "果香、微甜"
  }
]

请生成 3-4 款茶饮推荐，不要超过4款，也不要少于3款。
`,
});

const alternativeTeaSuggestionsFlow = ai.defineFlow(
  {
    name: 'alternativeTeaSuggestionsFlow',
    inputSchema: AlternativeTeaSuggestionsInputSchema,
    outputSchema: AlternativeTeaSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await alternativeTeaSuggestionsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate alternative tea suggestions.');
    }
    return output;
  }
);

export async function alternativeTeaSuggestions(
  input: AlternativeTeaSuggestionsInput
): Promise<AlternativeTeaSuggestionsOutput> {
  return alternativeTeaSuggestionsFlow(input);
}
