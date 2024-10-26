"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
})

interface PhoneNumberProps {
  setPhoneNumber: (value: string) => void
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({ 
    setPhoneNumber 
    }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        phoneNumber: "",
        },
    })

    return (
        <Form {...form}>
        <form className="space-y-8 mt-4">
            <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                    <Input
                    placeholder="Number"
                    {...field}
                    onChange={(e) => {
                        field.onChange(e)
                        setPhoneNumber(e.target.value)
                    }}
                    />
                </FormControl>
                <FormDescription>
                    We will contact you once order is placed
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        </form>
        </Form>
    )
}

export default PhoneNumber;