import React from "react"

import { useState, useRef, useEffect } from 'react';

import { X } from "lucide-react";

const API_BASE_URL = import.meta.env.REACT_APP_API_URL;


import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
} from '@/components/ai-elements/prompt-input';
import { Loader } from '@/components/ai-elements/loader';

import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationText,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselPrev,
  InlineCitationCarouselNext,
  InlineCitationSource,
  InlineCitationQuote,
} from '@/components/ai-elements/inline-citation';

export function ChatInterface({ uploadedFile, onRemoveFile }) {
const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("ready"); // ready | submitted

//   const messagesEndRef = useRef(null);

//   // Logic to autoscroll to bottom after messages are submitted
//   useEffect(() => {
//   if (status !== "submitted" && messagesEndRef.current) {
//     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//   }
//   }, [messages, status]);

  const handleSubmit = async ({ text }) => {
    if (!text || !text.trim()) return;

    const question = text.trim();

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
    ]);

    setInput("");
    setStatus("submitted");

    try {
      const res = await fetch(`${API_BASE_URL}/qa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          file: uploadedFile?.name, 
        }),
      });

      if (!res.ok) {
        throw new Error("QA request failed");
      }

      const result = await res.json();

      // Append assistant response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result.answer,
          citations: result.citations, 
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong while answering your question.",
        },
      ]);
    } finally {
      setStatus("ready");
    }
  };

{/* Component to render answer with interactive inline citations */}

function AnswerWithCitations({ answer, citations }) {
  return (
    <p className="leading-relaxed">
      {answer.split(/(\[C\d+\])/).map((part, index) => {
        const match = part.match(/\[(C\d+)\]/);

        if (match) {
          const citationKey = match[1];
          const citation = citations?.[citationKey];

          if (!citation) return part;

          return (
            <InlineCitation key={index}>
              <InlineCitationCard>
               <InlineCitationCardTrigger label={citationKey}/>
                {/* <InlineCitationText>
                    [{citationKey}]
                </InlineCitationText> */}
                <InlineCitationCardBody>
                  <InlineCitationQuote>
                    {citation.snippet}
                  </InlineCitationQuote>
                </InlineCitationCardBody>
               </InlineCitationCard>
            </InlineCitation>
          );
        }

        return part;
      })}
    </p>
  );
}


  return (
    <div className="flex flex-col h-full">
       {/* Conversation Area */}
     <div className="flex-1 overflow-y-auto">
      <Conversation className="h-full">
        <ConversationContent>
          {messages.map((message, index) => (
            <Message key={index} from={message.role}>
              <MessageContent>
               {message.role === "assistant" && message.citations ? (
               <AnswerWithCitations
                answer={message.content}
                citations={message.citations}
               />
               ) : (
               <MessageResponse>{message.content}</MessageResponse>
               )}
               </MessageContent>
            </Message>
          ))}

          {/* Loading indicator */}
          {status === "submitted" && <Loader />}
        </ConversationContent>

        <ConversationScrollButton />
      </Conversation>
      
     </div>
      
        {/* Uploaded File Display */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/50">
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-md">
          <span className="text-sm font-medium text-foreground truncate">{uploadedFile.name}</span>
          <button
            onClick={onRemoveFile}
            className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
       </div>

      {/* Input Area */}
      <PromptInput onSubmit={handleSubmit} className="mt-4">
        <PromptInputBody>
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the document..."
          />
        </PromptInputBody>

        <PromptInputFooter>
          <PromptInputSubmit
            disabled={!input || status === "submitted"}
            status={status}
          />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}