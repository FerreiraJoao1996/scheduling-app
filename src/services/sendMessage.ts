import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const client = new SQSClient({
  region: "us-east-1",
  endpoint: "http://localhost:4566", // ou http://localstack:4566 se dentro do container
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});

async function sendMessage() {
  try {
    const command = new SendMessageCommand({
      QueueUrl: "http://localhost:4566/000000000000/orders-queue",
      MessageBody: JSON.stringify({ orderId: 123, product: "Notebook" }),
    });

    const response = await client.send(command);
    console.log("✅ Mensagem enviada:", response.MessageId);
  } catch (err) {
    console.error("❌ Erro ao enviar mensagem:", err);
  }
}

sendMessage();
