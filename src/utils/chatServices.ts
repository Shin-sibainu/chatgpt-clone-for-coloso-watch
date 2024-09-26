import { supabase } from "../lib/supabaseClient";

export async function getChatRoomsForUser(userId: string) {
  if (!userId) {
    throw new Error("userId is required");
  }

  try {
    const { data, error } = await supabase
      .from("chat_rooms")
      .select(
        `
            id,
            name,
            created_at
          `
      )
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching chat rooms:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in getChatRoomsForUser:", error);
    throw error;
  }
}

export async function getMessagesForChatRoom(chatRoomId: string, limit = 20) {
  if (!chatRoomId) {
    throw new Error("chatRoomId is required");
  }

  try {
    const { data, error } = await supabase
      .from("messages")
      .select(`id, content, created_at, user_id, is_ai`)
      .eq("chat_room_id", chatRoomId)
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in getMessagesForChatRoom:", error);
    throw error;
  }
}
