import { createContext } from "react";
import type { AuthProviderValue, TabProviderValue } from "../types";

export const AuthContext = createContext<AuthProviderValue | null>(null);

export const TabContext = createContext<TabProviderValue | null>(null);
