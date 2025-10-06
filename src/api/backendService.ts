export interface PredictionResult {
  probability: number;
  label: number;
  prediction: string;
}

export interface ExplanationFeature {
  rank: number;
  modality: string;
  feature_text: string;
  weight: number;
  importance: number;
}

export interface ExplanationResult {
  prediction: {
    class: number;
    class_name: string;
    confidence: number;
    probabilities: number[];
  };
  explanations: ExplanationFeature[];
  summary: {
    total_features_analyzed: number;
    audio_features_count: number;
    lyrics_features_count: number;
    runtime_seconds: number;
    samples_generated: number;
    timestamp: string;
  };
}

export interface ApiResponse<T> {
  status: string;
  lyrics: string;
  audio_file_name: string;
  audio_content_type: string;
  audio_file_size: number;
  results: T;
}

// Get API base URL from env
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const bachOrBotApi = {
  async predict(
    audioFile: File,
    lyrics: string
  ): Promise<ApiResponse<PredictionResult>> {
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    formData.append("lyrics", lyrics);

    const response = await fetch(`${API_BASE_URL}/api/v1/predict`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Prediction failed: ${response.statusText}`);
    }

    return response.json();
  },

  async explain(
    audioFile: File,
    lyrics: string
  ): Promise<ApiResponse<ExplanationResult>> {
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    formData.append("lyrics", lyrics);

    const response = await fetch(`${API_BASE_URL}/api/v1/explain`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Explanation failed: ${response.statusText}`);
    }

    return response.json();
  },
};
