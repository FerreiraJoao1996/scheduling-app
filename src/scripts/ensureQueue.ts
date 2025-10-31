import {
  GetQueueUrlCommand,
  CreateQueueCommand,
} from "@aws-sdk/client-sqs";
import { sqsClient } from "../clients/sqsClient";

async function ensureQueue(queueName: string) {
  try {
    const getCommand = new GetQueueUrlCommand({ QueueName: queueName });
    const { QueueUrl } = await sqsClient.send(getCommand);
    console.log(`✅ Fila "${queueName}" já existe: ${QueueUrl}`);
  } catch (err: any) {
    if (err.name === "QueueDoesNotExist") {
      const createCommand = new CreateQueueCommand({
        QueueName: queueName,
        Attributes: {
          VisibilityTimeout: "30",
          MessageRetentionPeriod: "86400",
        },
      });

      const { QueueUrl } = await sqsClient.send(createCommand);
      console.log(`🆕 Fila criada: ${queueName} → ${QueueUrl}`);
    } else {
      console.error(`❌ Erro ao criar/verificar fila "${queueName}":`, err);
    }
  }
}

const queues = [
  "service-queue",
  "reserve-queue"
];

(async () => {
  console.log("🚀 Verificando/criando filas SQS...");
  for (const queueName of queues) {
    await ensureQueue(queueName);
  }
  console.log("✅ Todas as filas estão prontas!");
})();
