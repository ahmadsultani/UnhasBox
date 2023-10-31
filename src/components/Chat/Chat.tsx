import {
  IonButton,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonInput,
  IonText,
} from "@ionic/react";
import { chatbubbles, paperPlane } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";

import "@/styles/chat.css";

interface IMessage {
  content: string;
  isUser: boolean;
}

export const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([
    {
      content: "Hello, how can I help you?",
      isUser: false,
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userMessage) return;
    setMessages((prev) => {
      return [
        ...prev,
        {
          content: userMessage,
          isUser: true,
        },
        {
          content: "I'm sorry, I don't understand :(",
          isUser: false,
        },
      ];
    });
    setUserMessage("");
  };

  return (
    <IonFab
      vertical="bottom"
      horizontal="end"
      slot="fixed"
      className="chat__wrapper"
      edge
    >
      <IonFabList className="chat__box-wrapper">
        <div className="chat__box">
          <div className="chat__messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.isUser ? "chat__message" : "chat__message-admin"
                }`}
              >
                <IonText color="medium">
                  <p className="chat__message-user">
                    {message.isUser ? "You" : "Customer Service"}
                  </p>
                </IonText>
                <p className="chat__message-box">{message.content}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form className="chat__input-box" onSubmit={handleSubmit}>
            <IonInput
              placeholder="Type a message..."
              fill="outline"
              color="primary"
              type="text"
              value={userMessage}
              onIonInput={(e) => setUserMessage(e.detail.value!)}
              className="chat__input"
            />
            <IonButton fill="clear" className="ion-no-padding" type="submit">
              <IonIcon icon={paperPlane} style={{ fontSize: "28px" }} />
            </IonButton>
          </form>
        </div>
      </IonFabList>
      <IonFabButton onClick={toggleChat}>
        <IonIcon icon={chatbubbles} />
      </IonFabButton>
    </IonFab>
  );
};
