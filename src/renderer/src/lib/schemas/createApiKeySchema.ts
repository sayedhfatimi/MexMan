import { z } from 'zod'

export const createApiKeySchema = z.object({
  label: z.string().min(1, 'You must provide a label for this key.').max(255).trim(),
  key: z.string().min(1, 'API Key is required.').max(255).trim(),
  secret: z.string().min(1, 'API Secret is required.').max(255).trim()
})
