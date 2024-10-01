import OpenAI from "openai";
import { supabase } from "../lib/supabaseClient";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

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

export async function getMessagesForChatRoom(chatRoomId: number) {
  if (!chatRoomId) {
    throw new Error("chatRoomId is required");
  }

  try {
    const { data, error } = await supabase
      .from("messages")
      .select(`id, content, created_at, user_id, is_ai`)
      .eq("chat_room_id", chatRoomId)
      .order("created_at", { ascending: true });

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

export async function sendMessage(
  userId: string | undefined,
  chatRoomId: number,
  content: string | null | undefined,
  isAi?: boolean
) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert({
        chat_room_id: chatRoomId,
        user_id: userId,
        is_ai: isAi,
        content: content,
      })
      .select()
      .single();

    if (error) {
      console.error("Error sending messages:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to sending message:", error);
    throw error;
  }
}

//ai
export async function sendMessageToGPT(message: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "あなたは優秀なアシスタントです。" },
        { role: "user", content: message },
      ],
    });

    const messageFromGPT = completion.choices[0].message.content;

    return messageFromGPT;
  } catch (error) {
    console.error("Error in sendMessageToGPT:", error);
  }
}

export async function createChatRoomForUser(
  userId: string | undefined,
  chatRoomName: string
) {
  try {
    const { data, error } = await supabase
      .from("chat_rooms")
      .insert({
        name: chatRoomName,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      console.error("Error create chatRoom:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to create chatRoom:", error);
    throw error;
  }
}
