"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .max(15, { message: "Phone number must be at most 15 characters" })
    .regex(/^\+?\d+$/, { message: "Phone number must contain only digits and may start with a +" }),
});

type FormValues = z.infer<typeof formSchema>;

interface PhoneNumberProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({ value, onChange }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { phoneNumber: value },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    form.setValue("phoneNumber", val);
    const parsed = formSchema.safeParse({ phoneNumber: val });
    if (parsed.success) {
      onChange(val);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-2">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. +11234567890"
                  {...field}
                  onChange={handleChange}
                />
              </FormControl>
              <FormDescription>
                We may contact you once the order is placed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default PhoneNumber;
