import { AxiosResponse } from "axios";
import { http } from "./http-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(username:string,password:string): Promise<AxiosResponse<any>> {
  try {
    console.log(username);
    await AsyncStorage.setItem('@username',username)
    await AsyncStorage.setItem('@password',password)
    const response = await http.post<any>(
      "http://10.0.2.2:5000/users/login",{username:username,password:password}
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function createUser(userData:any): Promise<AxiosResponse<any>> {
  try {
    const response = await http.post<any>(
      "http://10.0.2.2:5000/users/register",userData
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function saveAlarm(setAlarm:any,username:any): Promise<AxiosResponse<any>> {
  try {
    console.log(setAlarm)
    const response = await http.post<any>(
      "http://10.0.2.2:5000/update/alarm",{setAlarm,username}
    );
    return response;
  } catch (error) {
    throw error;
  }
}