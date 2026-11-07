import { describe, expect, it } from "vitest";
import { toggleCompareSelection } from "@/data/equipment";

describe("equipment comparison selection", () => {
  it("allows no more than three systems", () => {
    expect(toggleCompareSelection(["tejas-mk1a", "ins-vikrant", "arjun-mk1a"], "kalvari-class")).toEqual([
      "tejas-mk1a",
      "ins-vikrant",
      "arjun-mk1a",
    ]);
  });

  it("removes an already selected system", () => {
    expect(toggleCompareSelection(["tejas-mk1a", "ins-vikrant"], "tejas-mk1a")).toEqual(["ins-vikrant"]);
  });
});