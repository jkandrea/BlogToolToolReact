import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the service value proposition and primary tools", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /콘텐츠는 멋지게/ })).toBeInTheDocument();
  expect(screen.getAllByText("동영상 GIF 변환").length).toBeGreaterThan(0);
  expect(screen.getAllByText("이미지 리사이즈").length).toBeGreaterThan(0);
  expect(screen.getAllByText("워터마크 넣기").length).toBeGreaterThan(0);
});
