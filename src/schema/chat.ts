import { z } from 'zod';

export const ChatModelDto = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
  owned_by: z.string().optional(),
  created: z.number().optional(),
  permission: z.array(z.any()).optional(),
});

export type ChatModelDtoType = z.infer<typeof ChatModelDto>;

export const OpenAIChatMessageDto = z.object({
  role: z.enum(['system', 'user', 'assistant', 'function']),
  content: z.string().nullable(),
});

export type OpenAIChatMessageDtoType = z.infer<typeof OpenAIChatMessageDto>;

export const OpenAIChatDto = z.object({
  model: z.string(),
  messages: z.array(OpenAIChatMessageDto).optional(),
});

export type OpenAIChatDtoType = z.infer<typeof OpenAIChatDto>;

export const ChatDto = OpenAIChatDto.extend({
  id: z.string().optional(),
});

export type ChatDtoType = z.infer<typeof ChatDto>;

export const ChatMessageDto = z.object({
  message: z.string().nullable(),
});

export type ChatMessageDtoType = z.infer<typeof ChatMessageDto>;
