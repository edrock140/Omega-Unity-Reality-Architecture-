
export interface ImageState {
  original: string | null;
  edited: string | null;
  loading: boolean;
  error: string | null;
}

export interface EditRequest {
  prompt: string;
  image: string; // base64
}
