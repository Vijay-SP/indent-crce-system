"use client"

import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { ClientResponseError, Record, RecordAuthResponse } from "pocketbase"
import { SubmitHandler, useForm } from "react-hook-form"

import { pb } from "@/lib/pocketbase"
import { cn } from "@/lib/utils"
import { AlertDialogContent } from "@/components/ui/alert-dialog"
import { badgeVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

export default function Page() {
  return (
    <>
      <Tabs
        defaultValue="user"
        className="mx-auto max-w-[600px] px-4 py-12"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>User Login</CardTitle>
              <CardDescription>Users login</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <UserAuthForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>Mumbai University admin login</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <AdminAuthForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

function UserAuthForm() {
  interface UserAuthForm {
    email: string
    password: string
  }

  const { toast } = useToast()

  const form = useForm<UserAuthForm>()

  const onSubmit: SubmitHandler<UserAuthForm> = (data) => {
    pb.collection("users")
      .authWithPassword(data.email, data.password)
      .then((res) => {
        pb.collection("users").update(res.record.id, { is_logged_in: true })
        toast({
          title: `Welcome User`,
          description: "Login Successful",
        })
      })
      .catch((err: ClientResponseError) => {
        toast({
          title: "Failed to authenticate",
          description: err.message,
        })

        form.control.setError("root", {
          type: "custom",
          message: "Invalid email or password",
        })
      })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {form.formState.errors.root?.message && (
          <span className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </span>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={formState.isSubmitting}
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  disabled={formState.isSubmitting}
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Dialog>
          <DialogTrigger
            type="button"
            className="flex w-fit items-center text-xs opacity-50"
          >
            Forgot Password
            <QuestionMarkCircledIcon className="ml-1 h-4 w-4" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send reset password email</DialogTitle>
            </DialogHeader>
            <SendResetPasswordForm />
          </DialogContent>
        </Dialog>

        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting && (
            <Icons.loader className="mr-3 animate-spin" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  )
}

function SendResetPasswordForm() {
  type SendResetPasswordForm = { email: string }

  const form = useForm<SendResetPasswordForm>()

  const onSubmit: SubmitHandler<SendResetPasswordForm> = (data) => {
    pb.collection("users")
      .requestPasswordReset(data.email)
      .then(() => {
        alert("Email sent")
      })
      .catch((err) => {
        alert("Invalid Email" + err.toString())
      })
  }

  return (
    <form>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            required
            className="col-span-3"
            {...form.register("email")}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={form.handleSubmit(onSubmit)} type="button">
          Send
        </Button>
      </div>
    </form>
  )
}

function AdminAuthForm() {
  interface AdminAuthFormType {
    email: string
    password: string
  }

  const { toast } = useToast()

  const form = useForm<AdminAuthFormType>()

  const onSubmit: SubmitHandler<AdminAuthFormType> = (data) => {
    pb.admins
      .authWithPassword(data.email, data.password)
      .then((res) => {
        toast({
          title: "Welcome Admin!",
          description: "Login Successful",
        })
      })
      .catch((err: ClientResponseError) => {
        toast({
          title: "Failed to authenticate",
          description: err.message,
        })

        form.control.setError("root", {
          type: "custom",
          message: "Invalid email or password",
        })
      })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {form.formState.errors.root?.message && (
          <span className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </span>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={formState.isSubmitting}
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  disabled={formState.isSubmitting}
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting && (
            <Icons.loader className="mr-3 animate-spin" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  )
}
