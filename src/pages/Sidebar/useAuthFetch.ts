import { useAtomValue } from 'jotai';
import { persistentAuthenticationAtom } from './Authentication';

export const useAuthFetch = () => {
  const { token } = useAtomValue(persistentAuthenticationAtom);
  console.log({ token });

  return async (
    url: string,
    options?:
      | {
          headers?: Record<string, string>;
        }
      | undefined
  ) => {
    console.log('fetching URL:', url);
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    return response.json();
  };
};
