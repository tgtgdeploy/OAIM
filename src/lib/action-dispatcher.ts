import { supabase } from "@/lib/supabase";

export type ActionType =
  | "RECORD_SALE"
  | "TAG_LEAD"
  | "CREATE_FOLLOW_UP"
  | "UPDATE_CONTACT"
  | "CREATE_BOOKING"
  | "CREATE_RESERVATION"
  | "LOG_EXPENSE"
  | "SEND_REMINDER"
  | "NONE";

export interface ActionPayload {
  type: ActionType;
  payload: Record<string, unknown>;
}

export interface ActionResult {
  success: boolean;
  type: ActionType;
  message: string;
  data?: unknown;
}

interface ActionContext {
  tenantId: string;
}

const handlers: Record<string, (payload: Record<string, unknown>, ctx: ActionContext) => Promise<ActionResult>> = {
  RECORD_SALE: async (payload, ctx) => {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        tenant_id: ctx.tenantId,
        contact_id: payload.contact_id as string,
        total: String(payload.total ?? "0"),
        status: "confirmed",
        channel: "ai_chat",
        items: payload.items as Record<string, unknown>[],
      })
      .select()
      .single();
    if (error) return { success: false, type: "RECORD_SALE", message: error.message };
    return { success: true, type: "RECORD_SALE", message: `Order recorded: ${(data as { id: string }).id}`, data };
  },

  TAG_LEAD: async (payload, ctx) => {
    const { error } = await supabase
      .from("contacts")
      .update({ tags: payload.tags as string[] })
      .eq("id", payload.contact_id as string)
      .eq("tenant_id", ctx.tenantId);
    if (error) return { success: false, type: "TAG_LEAD", message: error.message };
    return { success: true, type: "TAG_LEAD", message: `Contact tagged: ${(payload.tags as string[]).join(", ")}` };
  },

  CREATE_FOLLOW_UP: async (payload, ctx) => {
    const { data, error } = await supabase
      .from("follow_ups")
      .insert({
        tenant_id: ctx.tenantId,
        contact_id: payload.contact_id as string,
        message: payload.message as string,
        scheduled_at: payload.scheduled_at as string,
        type: "automated",
        status: "pending",
      })
      .select()
      .single();
    if (error) return { success: false, type: "CREATE_FOLLOW_UP", message: error.message };
    return { success: true, type: "CREATE_FOLLOW_UP", message: "Follow-up scheduled", data };
  },

  UPDATE_CONTACT: async (payload, ctx) => {
    const updates: Record<string, unknown> = {};
    if (payload.name) updates.name = payload.name;
    if (payload.phone) updates.phone = payload.phone;
    if (payload.email) updates.email = payload.email;
    if (payload.stage) updates.stage = payload.stage;

    const { error } = await supabase
      .from("contacts")
      .update(updates)
      .eq("id", payload.contact_id as string)
      .eq("tenant_id", ctx.tenantId);
    if (error) return { success: false, type: "UPDATE_CONTACT", message: error.message };
    return { success: true, type: "UPDATE_CONTACT", message: "Contact updated" };
  },

  CREATE_BOOKING: async (payload, ctx) => {
    const { data, error } = await supabase
      .from("appointments")
      .insert({
        tenant_id: ctx.tenantId,
        client_name: payload.client_name as string,
        service: payload.service as string,
        therapist: payload.therapist as string,
        date: payload.date as string,
        time: payload.time as string,
        duration: payload.duration as string,
        status: "confirmed",
      })
      .select()
      .single();
    if (error) return { success: false, type: "CREATE_BOOKING", message: error.message };
    return { success: true, type: "CREATE_BOOKING", message: "Booking created", data };
  },

  CREATE_RESERVATION: async (payload, ctx) => {
    const { data, error } = await supabase
      .from("reservations")
      .insert({
        tenant_id: ctx.tenantId,
        guest_name: payload.guest_name as string,
        date: payload.date as string,
        time: payload.time as string,
        pax: payload.pax as number,
        status: "confirmed",
        note: payload.note as string,
      })
      .select()
      .single();
    if (error) return { success: false, type: "CREATE_RESERVATION", message: error.message };
    return { success: true, type: "CREATE_RESERVATION", message: "Reservation created", data };
  },

  LOG_EXPENSE: async (_payload, _ctx) => {
    return { success: true, type: "LOG_EXPENSE", message: "Expense logged (placeholder)" };
  },

  SEND_REMINDER: async (_payload, _ctx) => {
    return { success: true, type: "SEND_REMINDER", message: "Reminder queued (placeholder)" };
  },

  NONE: async () => {
    return { success: true, type: "NONE", message: "No action required" };
  },
};

export async function dispatchAction(action: ActionPayload, context: ActionContext): Promise<ActionResult> {
  const handler = handlers[action.type];
  if (!handler) {
    return { success: false, type: action.type, message: `Unknown action type: ${action.type}` };
  }
  try {
    return await handler(action.payload, context);
  } catch (err) {
    return {
      success: false,
      type: action.type,
      message: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
