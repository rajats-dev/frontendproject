import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  questions: Question[];
};

interface Question {
  question: string;
  answer: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    const text = req.body;
    const questions = generateQues(50, text);
    const data: Data = {
      questions: questions,
    };
    res.status(200).json(data);
  }
}

function generateQues(num: number, text: string) {
  const ques = [];
  for (let i = 0; i < num; i++) {
    ques.push({
      question: `This is question no. ${
        i + 1
      } consists of ${text} in the request`,
      answer: `This is answer no. ${i + 1} consists of ${text} in the request`,
    });
  }
  return ques;
}
