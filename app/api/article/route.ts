import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"
import * as z from "zod"
// Huseed bui quiz formataa todorhoilj ugj bga heseg
const quizJsonSchema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          options: {
            type: "array",
            items: { type: "string" },
          },
          correctAnswer: {
            type: "integer",
            description: "Correct answer of the questions",
          },
          question: {
            type: "string",
            description: "Quiz question",
          },
        },
        required: ["options", "correctAnswer", "question"],
      },
    },
  },
  required: ["questions"],
} as const;
const quizSchema = z.fromJSONSchema(quizJsonSchema)
export const POST = async (request: Request) => {
  const body = request.json()
  const { content, articleId } = await body
  const client = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  })
  //Gemini ruu huselt ilgeej bga function
  const interaction = await client.interactions.create({
    model: "gemini-3.6-flash",
    //end gemini aas huseed bga zuilee bichne Prompt
    input: `Generate 5 multiple choice questions based on this article: ${content}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: quizJsonSchema, // end bichsen durmee oruulj irj bn
    },
  })
  //Gemini aas irsen string iin JSON bolgoj horvuulj bui heseg
  const quiz = quizSchema.parse(JSON.parse(interaction.output_text!))
  return NextResponse.json({
    message: "Successfully generated quiz",
    quiz,
  })
}
// Bidnii husej bui gemini iin hariult JSON formattai bh heregtei
// [
//     {
//         question:"Sql gej yu ve?",
//         options:["Query language", "Codenii hel"],
//         correctAnswer: 0
//     },
//     {
//         question:"Sql gej yu ve?",
//         options:["Query language", "Codenii hel"],
//         correctAnswer: 0
//     },
//     {
//         question:"Sql gej yu ve?",
//         options:["Query language", "Codenii hel"],
//         correctAnswer: 0
//     },
// ]
//Gemini aas irj bui hariult string type tai ireed bn?
// "/n/n "quiz":"{question:"Sql gej yu ve?",options:["Query language", "Codenii hel"],correctAnswer: 0}"""
// Bid nar frontend deeree tuhain stringiin ashiglaj haruulj chadahgui
// uchirn string deer map ashiglaj hariult bolon asuultiig tusdan haruulj chadahgui
// Tiimees Zod ashiglan irj bui string hariultiig JSON formattai bolgoj bga