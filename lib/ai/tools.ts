// Add a new stock tool
import { tool as createTool } from "ai";
import { z } from "zod";

export const weatherTool = createTool({
  description: "Display the weather for a location",
  parameters: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: async function ({ location }) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { weather: "Sunny", temperature: 75, location };
  },
});

export const stockTool = createTool({
  description: "Get price for a stock",
  parameters: z.object({
    symbol: z.string(),
  }),
  execute: async function ({ symbol }) {
    // Simulated API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { symbol, price: 100 };
  },
});

export const billionsTool = createTool({
  description: "Get net worth for a person",
  parameters: z.object({
    name: z.string(),
  }),
  execute: async function ({ name }) {
    // Simulated API call

    const response = await fetch(
      "https://billions-api.nomadcoders.workers.dev/"
    );
    const data = await response.json();
    const person = data.find(
      (person: { name: string }) => person.name === name
    );
    const { netWorth, name: personName } = person;
    if (!person) {
      return { name, status: "failed", netWorth: 0 };
    }
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    return { name, status: "success", netWorth: netWorth };
  },
});

// Update the tools object
export const tools = {
  displayWeather: weatherTool,
  getStockPrice: stockTool,
  getBillions: billionsTool,
};
