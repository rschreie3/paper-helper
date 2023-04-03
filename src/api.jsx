import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-SyvpP0eqpaYC00bvn1QojFnP",
  apiKey: process.env.sk - Og3eE8HtEJM5o7Y2UiYPT3BlbkFJ2MDOc5QEVzj012yxmmaI,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();
