import moment from "moment";
import { formatQuestionTime } from "../../src/utils/datetimeUtil"; // Import the function to be tested

describe("formatQuestionTime", () => {
  test("format timestamp correctly", () => {
    const timestamp = 1482579767190;
    const formattedTime = formatQuestionTime(timestamp);
    expect(formattedTime).toBe("06:42:PM | 12:24:2016");
  });

  test("format today's timestamp correctly", () => {
    // Get the current date and time
    const today = moment();
    const timestamp = today.valueOf(); // Unix timestamp in milliseconds
    const formattedTime = formatQuestionTime(timestamp);

    const expectedFormat = today.format("hh:mm:A | MM:DD:YYYY");

    expect(formattedTime).toEqual(expectedFormat);
  });
});
