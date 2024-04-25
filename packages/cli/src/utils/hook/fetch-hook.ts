import { fetchRegistry } from "../registry";

export async function fetchHook(name: string): Promise<string | null> {
  try {
    const response = await fetchRegistry<string>(name, true);

    return response;
  } catch (err: any) {
    if (err.status === 404) {
      return null;
    }

    throw new Error("Error fetching hook.")
  }
}