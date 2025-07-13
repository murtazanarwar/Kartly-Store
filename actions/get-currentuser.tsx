"use client"

import { useUser } from "@/hooks/use-user";

export function getCurrentUserId(): string | undefined {
  const userData = useUser();
  return userData.user?.id;
}