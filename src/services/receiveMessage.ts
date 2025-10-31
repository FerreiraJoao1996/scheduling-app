import {
  ReceiveMessageCommand,
  DeleteMessageCommand,
  GetQueueUrlCommand,
} from "@aws-sdk/client-sqs";
import { sqsClient } from "../clients/sqsClient";

export async function receiveMessages(queueName: string) {
  try {
    const { QueueUrl } = await sqsClient.send(
      new GetQueueUrlCommand({ QueueName: queueName })
    );

    if (!QueueUrl) {
      console.error(`❌ Fila "${queueName}" não encontrada.`);
      return;
    }

    const receiveCommand = new ReceiveMessageCommand({
      QueueUrl,
      MaxNumberOfMessages: 5,
      WaitTimeSeconds: 10,
      VisibilityTimeout: 30,
    });

    const response = await sqsClient.send(receiveCommand);

    if (!response.Messages || response.Messages.length === 0) {
      console.log(`⚠️ Nenhuma mensagem na fila "${queueName}"`);
      return;
    }

    for (const message of response.Messages) {
      console.log(`📩 Mensagem recebida da fila "${queueName}":`, message.Body);

      try {
        await sqsClient.send(
          new DeleteMessageCommand({
            QueueUrl,
            ReceiptHandle: message.ReceiptHandle!,
          })
        );
        console.log("🗑️ Mensagem processada e removida com sucesso");
      } catch (processError) {
        console.error("❌ Erro ao processar mensagem:", processError);
      }
    }
  } catch (err) {
    console.error("❌ Erro ao receber mensagens:", err);
  }
}
