import { NextRequest, NextResponse } from 'next/server';
import { AllPostsDocument } from '/graphql';
import { apiQuery } from 'dato-nextjs-utils/api';

const handler = async (req: NextRequest, res: NextRequest) => {

  
  const { posts } = await apiQuery(AllPostsDocument)

  return NextResponse.json(posts);
};

export default handler;

export const config = {
  runtime: 'experimental-edge',
};