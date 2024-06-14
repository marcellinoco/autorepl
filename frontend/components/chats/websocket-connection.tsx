import { Dispatch, FC, SetStateAction, useEffect } from "react";

interface WebSocketConnectionProps {
  socket: WebSocket | null;
  url: string;
  setSocket: Dispatch<SetStateAction<WebSocket | null>>;
  onMessage: (event: MessageEvent) => void;
  onClose: () => void;
  onOpen: () => void;
}

const WebSocketConnection: FC<WebSocketConnectionProps> = ({
  socket,
  setSocket,
  onOpen,
  onClose,
  onMessage,
  url,
}) => {
  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket(url);
      newSocket.onmessage = onMessage;
      newSocket.onclose = onClose;
      newSocket.onopen = onOpen;
      setSocket(newSocket);

      return () => {
        if (newSocket.readyState === WebSocket.OPEN) {
          newSocket.close();
        }
      };
    }
  }, [socket, setSocket, onOpen, onClose, onMessage, url]);

  return null;
};

export default WebSocketConnection;
