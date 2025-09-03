export interface TypeResponse {
  success: boolean;
  result: Result;
}

export interface Result {
  messages: Message[];
  search_results: any[];
  filter_key_values: any;
  score_boost_for_filters: any;
}

export interface Message {
  is_user: boolean;
  text: string;
}
