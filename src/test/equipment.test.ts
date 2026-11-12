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
  it("shows only Navy systems in the Navy filter", () => {
    const results = filterEquipment("Navy", "");
    expect(results.map((item) => item.name)).toContain("INS Vikramaditya");
    expect(results.every((item) => item.branch === "Navy")).toBe(true);
  });

  it("finds BrahMos by name", () => {
    expect(filterEquipment("All", "BrahMos").map((item) => item.name)).toEqual(["BrahMos"]);
  });

  it("includes aircraft across military branches in the aircraft filter", () => {
    const results = filterEquipment("Aircraft", "");
    expect(results.map((item) => item.name)).toContain("Rafale");
    expect(results.map((item) => item.name)).toContain("ALH Dhruv");
    expect(results.every((item) => item.group === "Aircraft")).toBe(true);
  });

  it("includes dedicated artillery and small-arms categories", () => {
    expect(filterEquipment("Artillery", "").map((item) => item.name)).toContain("Pinaka MBRL");
    expect(filterEquipment("Small arms", "").map((item) => item.name)).toContain("INSAS Rifle");
  });
});