import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/ai";

export interface WorkoutRequest {
  goal: string;
  experience: string;
}

export interface WorkoutResponse {
  plan: string;
}

export async function generateWorkoutPlan(payload: WorkoutRequest): Promise<WorkoutResponse> {
  try {
    const response = await axios.post(`${API_BASE_URL}/workout`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Plan:", response);
    return response.data;
  } catch (error: any) {
    console.error("Error generating workout plan:", error);
    throw new Error(error.response?.data?.message || "Failed to generate workout plan");
  }
}
