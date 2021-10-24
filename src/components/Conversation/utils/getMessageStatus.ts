import { GraphQLError } from "graphql";
import { MessageFragment } from "../../../graphql/types";

export const getMessageStatus = (
  message?: MessageFragment | null,
  errors?: readonly GraphQLError[]
) => {
  if (errors) {
    return "ERROR";
  }

  if (message?.id.includes("temp-id")) {
    return "SENDING";
  }

  return "SENT";
};
