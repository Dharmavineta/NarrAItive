import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { HumanMessage } from "@langchain/core/messages";
import prismaDB from "@/lib/db";

const genAI = new ChatGoogleGenerativeAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  temperature: 0.5,
  modelName: "gemini-pro",
  maxOutputTokens: 500,
});

// const geminiModel = new ChatGoogleGenerativeAI({
//   modelName: "gemini-pro",
//   apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
//   temperature: 0.5,
// });

// const template = `Your primary task is to generate a detailed and engaging storyline based on the user’s input : {plot} . The user will provide a basic plot or a set of characters, and your job is to weave these elements into a coherent and captivating narrative. You should be able to handle a variety of genres, from fantasy and science fiction to romance and mystery. Remember to incorporate user inputs at any stage of the story creation process, allowing for a collaborative storytelling experience. Your goal is to assist the user in creating a unique and compelling story. Importantly, you should focus solely on answering queries related to plot development and story creation. Do not entertain questions that are not related to these topics, you're solely to create story from plots and kindly reject if any other questions are asked`;

// const promptTemplate = new PromptTemplate({
//   template,
//   inputVariables: ["plot"],
// });
// const buildGoogleGenAIPrompt = (messages: Message[]) => ({
//   contents: messages
//     .filter(
//       (message) => message.role === "user" || message.role === "assistant"
//     )
//     .map((message) => ({
//       role: message.role === "user" ? "user" : "model",
//       parts: [{ text: message.content }],
//     })),
// });

// const llmChain = new LLMChain({
//   llm: geminiModel,
//   prompt: promptTemplate,
// });

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const { prompt } = await req.json();

    const questions = [
      new HumanMessage({
        content: [
          {
            type: "text",
            // text: "Your NarrAItive, your primary task is to generate a detailed and engaging storyline based on the users plot. The user will provide a basic plot or a set of characters, and your job is to weave these elements into a coherent and captivating narrative. You should be able to handle a variety of genres, from fantasy and science fiction to romance and mystery. Remember to incorporate user inputs at any stage of the story creation process, allowing for a collaborative storytelling experience. Your goal is to assist the user in creating a unique and compelling story. Importantly, you should focus solely on answering queries related to plot development and story creation. Do not entertain questions that are not related to these topics, you're solely to create story from plots and if any other questions unrelated to the topic are asked kindly reject affirming your purpose, but do indulge in introductions keeping it as short as possible straight to point, reject only if the question is expressly against what you're meant to do. Be creative in your venture and weave fantastical captivating story lines. Keep introductions small and upto point",
            text: "You're NarrAItive, a Ai based story teller. You'll be given with a plot and you've to create a story based on that, the plot may include characters, which you've to inculcate into the story.Adhere to the plot and weave creative stories based on that. Look out for genres the user is interested and create a story based on that. Keep your introductions very short and crisp. Don't engage in topics unrelated to your purpose and if prompted kindly reject reiterating your purpose, you can tell them you're only designed to create stories. Keep the introduction questions extremely simple, answering to only what is asked, don't venture into answering questions that are not asked. If you're greeted with hello, hi and such tell them what you're and what you can do very briefly, stick to point, and don't add unnecessary details, stick to the question, be it a greeting or a plot",
          },
          {
            type: "text",
            text: `${prompt}`,
          },
        ],
      }),
    ];
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const user = await prismaDB.apiLimit.findUnique({
      where: {
        userId,
      },
    });

    if (!user?.count === null) {
      const freeTrial = await checkApiLimit();
      if (!freeTrial) {
        return new NextResponse("403", { status: 403 });
      }
    }

    // const geminiStream = await genAI
    //   .getGenerativeModel({ model: "gemini-pro" })
    //   .generateContentStream(buildGoogleGenAIPrompt(messages));

    // const stream = GoogleGenerativeAIStream(geminiStream);

    if (!user?.count === null) {
      await incrementApiLimit();
    }
    // return new StreamingTextResponse(stream);
    // const result = await llmChain.call({
    //   plot: "The dark red house besides the eerie woods?",
    // });

    // console.log(result);
    // return NextResponse.json(result, { status: 200 });
    const res = await genAI.call(questions);
    console.log(res);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log("PROMPT_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
