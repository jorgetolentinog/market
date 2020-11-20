import { APIGatewayProxyEvent, Context } from 'aws-lambda';

import { connectToDatabase } from '@shared/lib/mongo';
import response from '@shared/lib/response';

import { Post } from '../../models';

export const handler = async (
  _event: APIGatewayProxyEvent,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDatabase();

  await Post.create({ title: "demo", date: new Date() });
  const posts = await Post.find({}, { title: 1, date: 1 });

  return response.json(posts);
};
