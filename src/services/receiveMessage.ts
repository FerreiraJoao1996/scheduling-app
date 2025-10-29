import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

const client = new SQSClient({
  region: "us-east-1",
  endpoint: "http://localhost:4566", // ou http://localstack:4566 se dentro do container
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});


async function receiveMessages() {
  const queueUrl = "http://localhost:4566/000000000000/orders-queue";

  try {
    const command = new ReceiveMessageCommand({
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 5,
      WaitTimeSeconds: 1,
    });

    const response = await client.send(command);
    if (!response.Messages || response.Messages.length === 0) {
      console.log("⚠️ Nenhuma mensagem na fila");
      return;
    }

    for (const msg of response.Messages) {
      console.log("📩 Mensagem recebida:", msg.Body);

      // Deletar mensagem da fila
      if (msg.ReceiptHandle) {
        await client.send(new DeleteMessageCommand({
          QueueUrl: queueUrl,
          ReceiptHandle: msg.ReceiptHandle,
        }));
        console.log("🗑️ Mensagem deletada");
      }
    }
  } catch (err) {
    console.error("❌ Erro ao receber mensagens:", err);
  }
}

receiveMessages();
