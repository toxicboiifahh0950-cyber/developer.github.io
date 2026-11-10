import { describe, expect, it } from "vitest";
import { filterEquipment, toggleCompareSelection } from "@/data/equipment";

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

describe("equipment catalog filters", () => {
  it("filters the catalog to two Navy systems", () => {
    expect(filterEquipment("Navy", "").map((item) => item.name)).toEqual([
      "INS Vikrant",
      "Kalvari-class Submarine",
    ]);
  });

  it("finds BrahMos by name", () => {
    expect(filterEquipment("All", "BrahMos").map((item) => item.name)).toEqual(["BrahMos"]);
  });
});