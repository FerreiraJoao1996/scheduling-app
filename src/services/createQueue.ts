import { SQSClient, CreateQueueCommand } from "@aws-sdk/client-sqs";

const client = new SQSClient({
  region: "us-east-1",
  endpoint: "http://localhost:4566", // ou "http://localstack:4566" se rodar dentro do container
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});

async function createQueue() {
  try {
    const command = new CreateQueueCommand({
      QueueName: "orders-queue",
    });
    const response = await client.send(command);
    console.log("✅ Fila criada:", response.QueueUrl);
  } catch (err) {
    console.error("❌ Erro ao criar fila:", err);
  }
}

createQueue();
