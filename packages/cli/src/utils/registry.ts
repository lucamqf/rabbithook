import { FetchOptions, ofetch } from "ofetch";

const baseUrl = process.env.COMPONENTS_REGISTRY_URL ?? 'http://52.67.253.42:3000';

export async function fetchRegistry<T>(path: string, plainText?: boolean) {
  const options = plainText ? { parseResponse: text => text } as FetchOptions<"json"> : {};

  const response = await ofetch<T>(`${baseUrl}/${path}`, options);

  return response

}