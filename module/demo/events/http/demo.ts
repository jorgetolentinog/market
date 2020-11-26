import { SQS } from "aws-sdk";
import response from "@shared/lib/response";

const sqs = new SQS();

const sendMessage = async (bodyJSON: object) => {
  let queue = await sqs
    .getQueueUrl({
      QueueName: "myqueue",
    })
    .promise();

  const params = {
    MessageBody: JSON.stringify(bodyJSON),
    QueueUrl: queue.QueueUrl,
  };

  return sqs.sendMessage(params).promise();
};

export const handler = async () => {
  let queue: any = {};
  let result: any = {};
  try {
    queue = await sqs
      .getQueueUrl({
        QueueName: "myqueue",
      })
      .promise();
    result = await sendMessage({ hello: "world" });
  } catch (error) {
    return response.json({
      error: error,
    });
  }

  return response.json({
    queue,
    result,
  });
};
