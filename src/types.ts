export type Stage =
  | 'intro'
  | 'question'
  | 'wait'
  | 'cake'
  | 'cutting'
  | 'letter'
  | 'photos'
  | 'gift'
  | 'wish';

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  isCustom?: boolean;
}

export interface StageInfo {
  id: Stage;
  title: string;
  icon: string;
}
