import { render, screen } from "@testing-library/react";
import Home from "../components/Home";

describe("Home Component", () => {
  test("renders the game title", () => {
    render(<Home onStart={() => {}} />);
    expect(screen.getByText("COLOR GRID")).toBeInTheDocument();
  });

  test("renders the start button", () => {
    render(<Home onStart={() => {}} />);
    expect(screen.getByText("Start Game")).toBeInTheDocument();
  });
});
