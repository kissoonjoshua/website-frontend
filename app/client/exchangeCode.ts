import axios from "axios";

export const exchangeCode = async (code: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_DB_URL}/exchangecode`,
      { code }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
