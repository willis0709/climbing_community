'use server';
/**
 * @fileOverview Provides automated analysis for climbing videos, offering difficulty ratings and suggestions.
 *
 * - analyzeClimbingVideo - Analyzes a climbing video to provide a difficulty rating and suggestions.
 * - AnalyzeClimbingVideoInput - The input type for the analyzeClimbingVideo function.
 * - AnalyzeClimbingVideoOutput - The return type for the analyzeClimbingVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeClimbingVideoInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A climbing video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  routeDescription: z
    .string()
    .optional()
    .describe('Optional description of the climbing route.'),
  climberExperience: z
    .string()
    .optional()
    .describe('Optional description of the climber experience level.'),
});
export type AnalyzeClimbingVideoInput = z.infer<typeof AnalyzeClimbingVideoInputSchema>;

const AnalyzeClimbingVideoOutputSchema = z.object({
  difficultyRating: z
    .string()
    .describe('The difficulty rating of the climbing route.'),
  suggestions: z
    .string()
    .describe('Suggestions for improving climbing technique on the route.'),
});
export type AnalyzeClimbingVideoOutput = z.infer<typeof AnalyzeClimbingVideoOutputSchema>;

export async function analyzeClimbingVideo(
  input: AnalyzeClimbingVideoInput
): Promise<AnalyzeClimbingVideoOutput> {
  return analyzeClimbingVideoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeClimbingVideoPrompt',
  input: {schema: AnalyzeClimbingVideoInputSchema},
  output: {schema: AnalyzeClimbingVideoOutputSchema},
  prompt: `You are an expert climbing coach providing analysis of climbing videos.

  Analyze the provided climbing video and provide a difficulty rating and suggestions for improvement.

  Consider the following information:
  Route Description: {{{routeDescription}}}
  Climber Experience: {{{climberExperience}}}
  Video: {{media url=videoDataUri}}

  Provide a difficulty rating (e.g., 5.10a, V4) and specific, actionable suggestions based on the climber's movements in the video.
  difficultyRating: 
  suggestions:`,
});

const analyzeClimbingVideoFlow = ai.defineFlow(
  {
    name: 'analyzeClimbingVideoFlow',
    inputSchema: AnalyzeClimbingVideoInputSchema,
    outputSchema: AnalyzeClimbingVideoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
