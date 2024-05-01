import axios, { AxiosError } from "axios";

const API_URL = "https://bookish-rotary-phone-gp4q5wvjpprfq6w-3000.app.github.dev/api";

export const getCarData = async (Car: string): Promise<CarData> => {
  return new Promise<CarData>((resolve, reject) => {
    axios
      .get(`${API_URL}/Car/${Car}`)
      .then((res) => {
        resolve({
          Car: Car,
          Speed: res.data.Speed,
          Price: res.data.Price,
          Safety: res.data.Safety,
          Colour: res.data.Colour,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("Car not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
