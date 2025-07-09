"use server";
import { db } from "@/lib/db";

interface FormState {
  error: string | null;
  success: boolean;
  values?: {
    userId?: string;
    stock?: string;
    action?: "BUY" | "SELL";
    entry?: string;
    exit?: string;
    return?: string;
    status?: "Profit" | "Loss";
    date?: string;
  };
}

export async function addCall(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const userId = formData.get("userId") as string;
  const stock = formData.get("stock") as string;
  const action = formData.get("action") as "BUY" | "SELL";
  const entry = formData.get("entry") as string;
  const exit = formData.get("exit") as string;
  const ret = formData.get("return") as string;
  const status = formData.get("status") as "Profit" | "Loss";
  const date = formData.get("date") as string;

  // Validation
  if (
    !userId ||
    !stock ||
    !action ||
    !entry ||
    !exit ||
    !ret ||
    !status ||
    !date
  ) {
    return {
      error: "All fields are required.",
      success: false,
      values: { userId, stock, action, entry, exit, return: ret, status, date },
    };
  }

  try {
    await db.calls.create({
      data: {
        userId,
        stock,
        action,
        entry,
        exit,
        return: ret,
        status,
        createdAt: new Date(date),
      },
    });
    return { error: null, success: true };
  } catch (e: unknown) {
    console.log(e);
    return {
      error: "Failed to add call.",
      success: false,
      values: { userId, stock, action, entry, exit, return: ret, status, date },
    };
  }
}
