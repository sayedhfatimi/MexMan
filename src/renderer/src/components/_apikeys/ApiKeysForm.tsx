import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ICON_SIZE_SMALL } from '@/lib/consts/UI'
import { createApiKeySchema } from '@/lib/schemas/createApiKeySchema'
import type { TAPIKey } from '@/lib/types/vault/TAPIKey'
import { useVault } from '@/lib/vault'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuEye, LuEyeOff, LuPlus, LuRefreshCw } from 'react-icons/lu'
import type { z } from 'zod'

const ApiKeysForm = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const [show, setShow] = useState(false)
  const addKey = useVault.use.addKey()

  const form = useForm<z.infer<typeof createApiKeySchema>>({
    resolver: zodResolver(createApiKeySchema),
    defaultValues: {
      label: '',
      key: '',
      secret: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof createApiKeySchema>): Promise<void> => {
    setSubmitting(true)
    const res = await window.electron.ipcRenderer.invoke(
      'bitmex:authRESTRequest',
      'GET',
      '/api/v1/user',
      data.key,
      data.secret
    )

    if (res.error) {
      form.setError('key', {
        type: 'custom',
        message: res.error.message
      })

      form.setError('secret', {
        type: 'custom',
        message: res.error.message
      })

      setSubmitting(false)

      return
    }

    const apiKey: TAPIKey = {
      ...data,
      id: res.id.toString()
    }
    addKey(apiKey)
    setOpen(false)
    setSubmitting(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group space-x-2" size="sm" variant="outline">
          <LuPlus size={ICON_SIZE_SMALL} className="transition-transform group-hover:scale-125" />
          <span>Add New Key</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New API Key</DialogTitle>
          <DialogDescription>Fill out form below to add a new account API.</DialogDescription>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Label</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="Label" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a name or label for identifying this key.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">API Client ID</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="API Client ID" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will either be labelled API Client ID or API Key.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">API Client Secret</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <div className="relative flex flex-row items-center justify-between">
                      <Input
                        placeholder="API Client Secret"
                        {...field}
                        type={show ? 'text' : 'password'}
                      />
                      <div
                        className="group absolute right-0 inline-flex h-8 w-10 cursor-pointer place-content-center items-center text-muted-foreground hover:text-black dark:hover:text-white"
                        onClick={() => setShow(!show)}
                      >
                        {show ? (
                          <LuEyeOff className="transition-transform group-hover:scale-125" />
                        ) : (
                          <LuEye className="transition-transform group-hover:scale-125" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    This will be labelled API Client Secret or API Secret.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <LuRefreshCw className="mr-2 size-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ApiKeysForm
