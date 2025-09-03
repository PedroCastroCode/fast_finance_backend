export interface typePost {
  messages: Message[];
  deploymentToken: string;
  deploymentId: string;
}

export interface Message {
  is_user: boolean;
  text: string;
}
