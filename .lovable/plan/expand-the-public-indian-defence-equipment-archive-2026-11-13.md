# Expand the public Indian defence equipment archive

## Goal
Broaden the archive into a practical, regularly maintainable reference of major Indian armed-forces weapons, vehicles, aircraft, ships, sensors, and support platforms that are documented in public sources.

## Scope
- Add major publicly documented systems missing from the current collection across Army, Air Force, and Navy, including relevant indigenous and in-service platforms.
- Keep entries factual and high-level; use public specifications, mark uncertain or variant-dependent values, and omit classified, tactical, deployment, vulnerability, and readiness details.
- Give every new system its own relevant image, without reusing an existing or newly added system's photo; respect image licensing and include attribution where required.
- Keep the existing local typed catalog, search, category filters, detail views, comparison behavior, and visible collection totals working.

## Implementation
1. Research candidate systems and basic public facts from official Indian government, service, DRDO, and manufacturer sources; choose broad platform coverage rather than claiming literally exhaustive inventory.
2. Add missing entries and individually sourced images, extending existing categories only where necessary.
3. Add tests for unique IDs/images, public-data scope, and the newly covered categories; run the catalog and routing tests.
4. Verify the catalog in the preview, including filter/search behavior, image loading, detail views, and mobile/desktop layout.

## Technical notes
- Preserve the typed local data model and page-level state; no accounts, database, or persistence are needed.
- Store app imagery through the existing project asset flow and keep source/attribution details with the relevant entries or image credits.
