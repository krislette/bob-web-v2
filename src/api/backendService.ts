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

export interface MultimodalApiResponse {
  status: string;
  lyrics: string;
  audio_file_name: string;
  audio_content_type: string;
  audio_file_size: number;
  results: ExplanationResult;
}

export interface AudioOnlyApiResponse {
  status: string;
  audio_file_name: string;
  audio_content_type: string;
  audio_file_size: number;
  results: ExplanationResult;
}

export interface CombinedPredictionResult {
  multimodal: PredictionResult;
  audio_only: PredictionResult;
  performance: {
    total_time_seconds: number;
    multimodal_time_seconds: number;
    audio_only_time_seconds: number;
  };
}

export interface CombinedExplanationResult {
  multimodal: ExplanationResult;
  audio_only: ExplanationResult;
  combined_summary: {
    total_runtime_seconds: number;
    factorization_time_seconds: number;
    source_separation_reused: boolean;
    timestamp: string;
  };
}

export interface CombinedPredictionApiResponse {
  status: string;
  lyrics: string;
  audio_file_name: string;
  audio_content_type: string;
  audio_file_size: number;
  results: CombinedPredictionResult;
}

export interface CombinedExplanationApiResponse {
  status: string;
  lyrics: string;
  audio_file_name: string;
  audio_content_type: string;
  audio_file_size: number;
  results: CombinedExplanationResult;
}

// Get API base URL from env
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const bachOrBotApi = {
  // Multimodal prediction
  async predictMultimodal(
    audioFile: File,
    lyrics: string
  ): Promise<MultimodalApiResponse> {
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    formData.append("lyrics", lyrics);

    const response = await fetch(`${API_BASE_URL}/api/v1/predict/multimodal`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Multimodal prediction failed: ${response.statusText}`);
    }

    return response.json();
  },

  // Audio-only prediction
  async predictAudio(audioFile: File): Promise<AudioOnlyApiResponse> {
    const formData = new FormData();
    formData.append("audio_file", audioFile);

    const response = await fetch(`${API_BASE_URL}/api/v1/predict/audio`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Audio-only prediction failed: ${response.statusText}`);
    }

    return response.json();
  },

  // Multimodal explanation
  async explainMultimodal(
    audioFile: File,
    lyrics: string
  ): Promise<MultimodalApiResponse> {
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    formData.append("lyrics", lyrics);

    const response = await fetch(`${API_BASE_URL}/api/v1/explain/multimodal`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Multimodal explanation failed: ${response.statusText}`);
    }

    return response.json();
  },

  // Audio-only explanation
  async explainAudio(audioFile: File): Promise<AudioOnlyApiResponse> {
    const formData = new FormData();
    formData.append("audio_file", audioFile);

    const response = await fetch(`${API_BASE_URL}/api/v1/explain/audio`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Audio-only explanation failed: ${response.statusText}`);
    }

    return response.json();
  },

  // Combined prediction (both multimodal and audio-only)
  async predictCombined(
    audioFile: File,
    lyrics: string
  ): Promise<CombinedPredictionApiResponse> {
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    formData.append("lyrics", lyrics);

    const response = await fetch(`${API_BASE_URL}/api/v1/predict/combined`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Combined prediction failed: ${response.statusText}`);
    }

    return response.json();
  },

  // Combined explanation (both multimodal and audio-only)
  async explainCombined(
    audioFile: File,
    lyrics: string
  ): Promise<CombinedExplanationApiResponse> {
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    formData.append("lyrics", lyrics);

    const response = await fetch(`${API_BASE_URL}/api/v1/explain/combined`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Combined explanation failed: ${response.statusText}`);
    }

    return response.json();
  },
};
