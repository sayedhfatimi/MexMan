import { configureStore } from "@reduxjs/toolkit";
import reducer from "./accounts";

export default function () {
  return configureStore({ reducer });
}
