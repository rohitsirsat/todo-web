// A utility function for handling API requests with loading, success, and error handling

import { FreeApiResponse } from "./FreeApiResponse";

const requestHandler = async (api, setLoading, onSuccess, onError) => {
  // Show loading state if setLoading function is provided
  setLoading && setLoading(true);

  try {
    // Make the API request
    const response = await api(new FreeApiResponse());
    const { data } = response;
    if (data?.success) {
      // Call the onSuccess callback with the response data
      onSuccess(data);
    }
  } catch (error) {
    console.log(error);
    onError(error?.response?.data?.message || "Something went wrong");
  } finally {
    // Hide loading state if setLoading function is provided
    setLoading && setLoading(false);
  }
};

// Check if the code is running in a browser environment
const isBrowser = typeof window !== "undefined";

const classNames = (...className) => {
  return className.filter(Boolean).join(" ");
};

export { requestHandler, isBrowser, classNames };
