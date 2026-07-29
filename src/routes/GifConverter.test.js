import { clampEndTime, clampStartTime } from "./GifConverter";

describe("GIF clip boundaries", () => {
  test("keeps the start handle before the end handle", () => {
    expect(clampStartTime(8, 6, 12)).toBe(5.9);
    expect(clampStartTime(-2, 6, 12)).toBe(0);
  });

  test("keeps the end handle after the start handle and inside the video", () => {
    expect(clampEndTime(2, 4, 12)).toBe(4.1);
    expect(clampEndTime(20, 4, 12)).toBe(12);
  });
});
