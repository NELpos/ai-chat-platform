import { Metadata } from "next";

import { AlertsForm } from "./alerts-form";
import { fetchDefaultSettings } from "./actions";

export const metadata: Metadata = {
  title: "Settings",
  description: "This is the personal settings page",
};

export default async function Settings() {
  const defaultValues = await fetchDefaultSettings();

  return defaultValues ? <AlertsForm defaultValues={defaultValues} /> : null;
}
