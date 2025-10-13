/**
 * Adjusts the raw model confidence to a more realistic confidence score
 * with VERY aggressive spreading for high-confidence predictions.
 * Uses deterministic scaling based on fine-grained decimal analysis.
 *
 * @param rawConfidence - The raw confidence from the model (0-100)
 * @param modelAccuracy - The model's actual accuracy (default 97%)
 * @returns Adjusted confidence score (0-100)
 */
export function adjustConfidenceScore(
  rawConfidence: number,
  modelAccuracy: number = 97
): number {
  // For very high confidences (99%+), spread across 70-97% range (27 point spread)
  if (rawConfidence >= 99) {
    // Get the decimal portion: 99.99947 -> 0.99947
    const afterDecimal = (rawConfidence - 99) * 100; // Convert to 0-100 scale

    // Use the last few digits to create variation
    // Take a hash-like approach using the decimal digits
    const seed = Math.floor(afterDecimal * 10000) % 100; // 0-99

    // Map to 70-97 range (27 point spread)
    const adjustedScore = 70 + (seed / 100) * 27;

    return Math.round(adjustedScore);
  }
  // For 95-99% range
  else if (rawConfidence >= 95) {
    const decimal = (rawConfidence % 1) * 100; // Get decimal part
    const seed = Math.floor(decimal * 100) % 100;
    const adjustedScore = 65 + (seed / 100) * 20; // 65-85 range

    return Math.round(adjustedScore);
  }
  // For below 95%
  else {
    const adjustedScore = rawConfidence * 0.7; // Scale down by 30% (very aggressive)
    return Math.round(Math.min(adjustedScore, modelAccuracy));
  }
}
