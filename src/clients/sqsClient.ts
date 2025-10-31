import { SQSClient } from "@aws-sdk/client-sqs";
import { env } from "../shared/env/env";

export const sqsClient = new SQSClient({
  region: env.AWS_REGION,
  endpoint: env.AWS_ENDPOINT,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_KEY_ID,
  },
})