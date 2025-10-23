import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

export interface WorkoutRequest {
  goal: string;
  experience: string;
}

export interface WorkoutResponse {
  plan: string;
}

export async function generateWorkoutPlan(payload: WorkoutRequest): Promise<WorkoutResponse> {
  try {
    const response = await axios.post(`${API_BASE_URL}/workout/generate`, payload, {
      withCredentials: true,
    });
    console.log("Plan:", response);
    // return response.data;
    // ✅ Access nested data safely
    const planText = response.data?.plan?.plan || "";
    return { plan: planText };

  } catch (error: any) {
    console.error("Error generating workout plan:", error);
    throw new Error(error.response?.data?.message || "Failed to generate workout plan");
  }
}
