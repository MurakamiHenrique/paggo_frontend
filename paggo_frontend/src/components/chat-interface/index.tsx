import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, MessageSquare, Download } from "lucide-react";
import type { ProcessedDocument, Message } from "@/src/interfaces";
import { chatService } from "../../services/chat-service";
import { Card, CardHeader, CardContent } from "../card";
import { Button } from "../button";
import { theme } from "@/src/theme";
import { Input } from "../input";
import api from "@/src/services/api";
import * as S from "./styles";

interface ChatInterfaceProps {
  document: ProcessedDocument;
  onAddMessage: (message: Message) => void;
  documentId: string;
}

export function ChatInterface({
  document,
  onAddMessage,
  documentId,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(
    document?.chatInteractions || []
  );
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesEndRef.current?.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (document?.chatInteractions) {
      setMessages(document.chatInteractions);
    }
  }, [document?.id, document?.chatInteractions]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setInputValue("");
    setIsLoading(true);

    onAddMessage(userMessage);

    try {
      const response = await chatService.talkToGemini(
        userMessage.content,
        documentId
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setMessages((prev) => [...prev, assistantMessage]);
      onAddMessage(assistantMessage);
    } catch (error) {
      console.error("Failed to get AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDownloadChat = async () => {
  try {
    const response = await api.get(`/documents/${documentId}/download`, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);

    const originalFileName = document.fileName || 'document';
    const baseName = originalFileName.replace(/\.[^/.]+$/, '');
    const downloadFileName = `${baseName}_with_analysis.pdf`;

    const a = globalThis.document.createElement('a');
    a.href = url;
    a.download = downloadFileName;
    globalThis.document.body.appendChild(a);
    a.click();
    globalThis.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading document:', error);
    // Optional: toast or user notification here
  }
};



  return (
    <Card>
      <CardHeader>
        <S.HeaderContainer>
          <S.HeaderContent>
            <S.HeaderTitle>
              <MessageSquare size={20} color={theme.colors.primary} />
              Document Assistant
            </S.HeaderTitle>
          </S.HeaderContent>
          <Button
            variant="outline"
            size="sm"
            disabled={messages.length <= 1}
            onClick={handleDownloadChat}
          >
            <Download size={16} style={{ marginRight: "0.5rem" }} />
            Download Chat
          </Button>
        </S.HeaderContainer>
      </CardHeader>
      <CardContent style={{ padding: 0 }}>
        <S.MessagesContainer>
          {messages.map((message) => (
            <S.MessageContainer
              key={message.id}
              isUser={message.type === "user"}
            >
              {message.type === "assistant" && (
                <S.Avatar isUser={false}>
                  <Bot size={16} color="white" />
                </S.Avatar>
              )}
              <S.MessageBubble isUser={message.type === "user"}>
                <S.MessageText>{message.content}</S.MessageText>
                <S.MessageTime>
                  {message.timestamp.toLocaleString("pt-BR", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </S.MessageTime>
              </S.MessageBubble>
              {message.type === "user" && (
                <S.Avatar isUser={true}>
                  <User size={16} color={theme.colors.text} />
                </S.Avatar>
              )}
            </S.MessageContainer>
          ))}
          {isLoading && (
            <S.TypingContainer>
              <S.Avatar isUser={false}>
                <Bot size={16} color="white" />
              </S.Avatar>
              <S.TypingBubble>
                <S.TypingDot delay={0} />
                <S.TypingDot delay={0.1} />
                <S.TypingDot delay={0.2} />
              </S.TypingBubble>
            </S.TypingContainer>
          )}
          <div ref={messagesEndRef} />
        </S.MessagesContainer>
        <S.InputContainer>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about this document..."
            disabled={isLoading}
            style={{ flex: 1 }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
          >
            <Send size={16} />
          </Button>
        </S.InputContainer>
      </CardContent>
    </Card>
  );
}
