import { render, screen, fireEvent } from "@testing-library/react";
import GameRound from "../components/GameRound"; // adjust path if needed
import React from "react";
import { vi } from "vitest"; // instead of jest

// Mock HexColorPicker (Vitest style)
vi.mock("react-colorful", () => ({
  HexColorPicker: ({ onChange }) => (
    <input
      data-testid="color-picker"
      type="color"
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe("GameRound Component", () => {
  const mockConfig = {
    currentRound: 1,
    player1: "Alice",
    player2: "Bob",
  };

  test("renders round title and target color box", () => {
    render(<GameRound config={mockConfig} onNext={vi.fn()} />);
    expect(screen.getByText("🎨 Round 1")).toBeInTheDocument();
  });

  test("allows Player 1 and Player 2 to lock colors", () => {
    render(<GameRound config={mockConfig} onNext={vi.fn()} />);

    // Player 1's turn
    expect(screen.getByText("Alice's Turn")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("color-picker"), {
      target: { value: "#ff0000" },
    });
    fireEvent.click(screen.getByText("Lock Color"));

    // Player 2's turn
    expect(screen.getByText("Bob's Turn")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("color-picker"), {
      target: { value: "#00ff00" },
    });
    fireEvent.click(screen.getByText("Lock Color"));

    // Show results
    expect(screen.getByText(/Target:/)).toBeInTheDocument();
    expect(screen.getByText(/Alice:/)).toBeInTheDocument();
    expect(screen.getByText(/Bob:/)).toBeInTheDocument();
  });

  test("calls onNext with correct round data", () => {
    const onNextMock = vi.fn();
    render(<GameRound config={mockConfig} onNext={onNextMock} />);

    // P1 picks
    fireEvent.change(screen.getByTestId("color-picker"), {
      target: { value: "#ff0000" },
    });
    fireEvent.click(screen.getByText("Lock Color"));

    // P2 picks
    fireEvent.change(screen.getByTestId("color-picker"), {
      target: { value: "#00ff00" },
    });
    fireEvent.click(screen.getByText("Lock Color"));

    // Next round
    fireEvent.click(screen.getByText("Next Round"));

    expect(onNextMock).toHaveBeenCalledTimes(1);
    expect(onNextMock).toHaveBeenCalledWith(
      expect.objectContaining({
        round: 1,
        p1: expect.objectContaining({ color: "#ff0000" }),
        p2: expect.objectContaining({ color: "#00ff00" }),
      })
    );
  });

  test("resets game state after Next Round", () => {
    const onNextMock = vi.fn();
    const { rerender } = render(
      <GameRound config={{ ...mockConfig, currentRound: 1 }} onNext={onNextMock} />
    );

    // P1 picks
    fireEvent.change(screen.getByTestId("color-picker"), {
      target: { value: "#111111" },
    });
    fireEvent.click(screen.getByText("Lock Color"));

    // P2 picks
    fireEvent.change(screen.getByTestId("color-picker"), {
      target: { value: "#222222" },
    });
    fireEvent.click(screen.getByText("Lock Color"));

    // Capture old target
    const oldTargetText = screen.getByText(/Target:/).textContent;

    // Next round
    fireEvent.click(screen.getByText("Next Round"));

    // Simulate parent updating round
    rerender(<GameRound config={{ ...mockConfig, currentRound: 2 }} onNext={onNextMock} />);

    // Should reset back to Player 1’s turn
    expect(screen.getByText("Alice's Turn")).toBeInTheDocument();

    // Heading should increment
    expect(screen.getByText("🎨 Round 2")).toBeInTheDocument();

    // New target should not be the same text
    expect(screen.queryByText(oldTargetText)).not.toBeInTheDocument();
  });
});
