import pkg from "mongoose";
const { Schema, model } = pkg

export const TestSchema = new Schema({
  name: { type: String },
  questions: [
    {
      type: {
        question: {
          type: String,
          ref: "question",
          require: [true, "Question is required"],
        },
        options: [
          {
            type: String,
            require: [true, "Option is required"],
            enum: ["Strongly Disagree", "Slightly Disagree", "Disagree", "Neutral", "Slightly Agree", "Agree", "Strongly Agree"],
          },
        ],
        answer: {
          type: String,
          require: [true, "Answer is required"],
          enum: [ "", "Strongly Disagree", "Slightly Disagree", "Disagree", "Neutral", "Slightly Agree", "Agree", "Strongly Agree"],
        },
      },
    },
  ],
  startTime: { type: Date, default: Date.now() },
  duration: { type: Date, default: Date.now(), require: [true, "Duration is required"] },
});

export const TestModel = model("test", TestSchema);