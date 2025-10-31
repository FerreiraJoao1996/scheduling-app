import {
  SendMessageCommand,
  GetQueueUrlCommand,
} from "@aws-sdk/client-sqs";
import { sqsClient } from "clients/sqsClient";

export async function sendMessage(queueName: string, body: any) {
  try {
    const { QueueUrl } = await sqsClient.send(
      new GetQueueUrlCommand({ QueueName: queueName })
    );

    if (!QueueUrl) {
      console.error(`❌ Fila "${queueName}" não encontrada.`);
      return;
    }

    const sendCommand = new SendMessageCommand({
      QueueUrl,
      MessageBody: JSON.stringify(body),
    });

    const response = await sqsClient.send(sendCommand);
    console.log(`✅ Mensagem enviada para "${queueName}":`, response.MessageId);

    return response.MessageId;
  } catch (err: any) {
    if (err.name === "QueueDoesNotExist") {
      console.error(`❌ A fila "${queueName}" não existe!`);
    } else {
      console.error("❌ Erro ao enviar mensagem:", err);
    }
    throw err;
  }
}
