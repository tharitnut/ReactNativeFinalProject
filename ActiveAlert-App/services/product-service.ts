import { AxiosResponse } from "axios";
import { http } from "./http-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(
  username: string,
  password: string
): Promise<AxiosResponse<any>> {
  try {
    console.log(username);
    await AsyncStorage.setItem("@username", username);
    await AsyncStorage.setItem("@password", password);
    const response = await http.post<any>("http://10.0.2.2:5000/users/login", {
      username: username,
      password: password,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function register(
  username: string,
  password: string
): Promise<AxiosResponse<any>> {
  try {
    console.log(username);
    const response = await http.post<any>(
      "http://10.0.2.2:5000/users/register",
      { username: username, password: password }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function insertAlarm(
  setAlarm: any,
  username: any,
  startNotifyId: any,
  endNotifyId: any
): Promise<AxiosResponse<any>> {
  try {
    console.log(setAlarm);
    const response = await http.post<any>("http://10.0.2.2:5000/insert/alarm", {
      setAlarm,
      username,
      startNotifyId,
      endNotifyId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteAlarm(
  index: Number | null
): Promise<AxiosResponse<any>> {
  try {
    const username = await AsyncStorage.getItem("@username");
    console.log(index);
    const response = await http.post<any>("http://10.0.2.2:5000/delete/alarm", {
      username,
      index,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function fetchtAlarm(): Promise<AxiosResponse<any>> {
  try {
    const username = await AsyncStorage.getItem("@username");
    const response = await http.get<any>(
      `http://10.0.2.2:5000/api/alarm/${username}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function changeAlert(
  index: any,
  alerts: { [key: number]: boolean }
): Promise<AxiosResponse<any>> {
  try {
    const username = await AsyncStorage.getItem("@username");
    const alert = alerts[index];

    const response = await http.post<any>("http://10.0.2.2:5000/update/alert", {
      username,
      index,
      alert,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getUsername(): Promise<string | null> {
  try {
    const username = await AsyncStorage.getItem("@username");
    return username;
  } catch (error) {
    console.error("Failed to retrieve username from AsyncStorage", error);
    return null;
  }
}

export async function getUserbyName(): Promise<AxiosResponse<any>> {
  try {
    const username = await AsyncStorage.getItem("@username");
    const response = await http.get<any>(
      `http://10.0.2.2:5000/api/user/${username}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function insertProfile(
  formData: any
): Promise<AxiosResponse<any>> {
  try {
    const userId = await AsyncStorage.getItem("@username");
    const response = await http.post(
      `http://10.0.2.2:5000/upload/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error inserting profile:", error);
    throw error;
  }
}
