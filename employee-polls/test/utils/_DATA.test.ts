import { User } from "../../src/features/models/User";
import {
  getUserList,
  getQuestionList,
  setQuestion,
  setAnswer,
} from "../../src/utils/_DATA";

describe("Question and User Management Tests", () => {
  describe("getUserList", () => {
    it("should retrieve the users data", async () => {
      const users = await getUserList();
      expect(users).toBeDefined();
    });
  });

  describe("getQuestionList", () => {
    it("should retrieve the questions data", async () => {
      const questions = await getQuestionList();
      expect(questions).toBeDefined();
    });
  });

  describe("setQuestion", () => {
    it("should save a new question", async () => {
      const question = {
        optionOneText: "Option One",
        optionTwoText: "Option Two",
        author: {
          id: "johndoe",
          password: '1234',
          name: "John Doe",
          avatarURL: 'avt-3.jpg',
          answers: {},
          questions: [],
        },
      };

      const savedQuestion = await setQuestion(question);
      expect(savedQuestion).toBeDefined();
      expect(savedQuestion.id).toBeDefined();
      expect(savedQuestion.author).toBe(question.author.id);
    });

    it("should reject when required fields are missing", async () => {
      const emptyUser: User = {
        id: "",
        name: "",
        password: "",
        avatarURL: "",
        answers: {},
        questions: [],
      };

      await expect(
        setQuestion({
          optionOneText: "",
          optionTwoText: "",
          author: emptyUser,
        })
      ).rejects.toEqual(
        "Please provide 2 answers of the question and its author"
      );
      await expect(
        setQuestion({
          optionOneText: "Option One",
          optionTwoText: "Option Two",
          author: emptyUser,
        })
      ).rejects.toEqual(
        "Please provide 2 answers of the question and its author"
      );
    });
  });

  describe("setAnswer", () => {
    it("should save a user's answer to a question", async () => {
      const user = {
        authedUser: "johndoe",
        qid: "6ni6ok3ym7mf1p33lnez",
        answer: "optionOne"
      }

      const result = await setAnswer(user);
      expect(result).toBeTruthy();
    });

    it("should reject when required fields are missing", async () => {
      await expect(
        setAnswer({ authedUser: "", qid: "", answer: "" })
      ).rejects.toBeTruthy();
      await expect(
        setAnswer({ authedUser: "johndoe", qid: "", answer: "" })
      ).rejects.toBeTruthy();
    });
  });
});
