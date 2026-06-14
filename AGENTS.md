---
---
role: Senior React Frontend Reviewer / Performance Engineer
description: Analyze code, UI architecture, accessibility, and performance; 
---

## 1. PROJECT OBJECTIVE: "carTravels"
Build a web/app focused on workers who are "drivers" for private car agencies. **frontend repository**: React + Vite + TypeScript + Tailwind; deploy on Vercel.

### 2. What is the current problem?

At the end of their shift, the "driver" goes through a series of "tedious" steps that waste time and are prone to calculation errors.
These are the possible scenarios that a "driver" usually deals with:

1. Writing down the accumulated "total" for the day in a notebook (taking the total from an "external" application used by the "agency").
2. Writing down the expense amount for "Gas" (CNG) and "Petrol" (using the paper receipts provided at gas stations).
3. They must rely on different "calculations" such as the following:

* 3.A: If they had trips with "Vales" (vouchers), selecting the vale type: "Fábrica" (Factory) or "Otro" (Other). These are negotiated prices that depend on the agency and the driver.
* 3.B: Depending on the vale type:
  - "Fábrica": name, number of trips, real price per trip, fixed fee per trip (precio fijo de planilla).
  - "Otro": name, number of trips, real price per trip (no fixed fee).
* 3.C: Only "Fábrica" vales affect the adjusted base. The driver enters the real price (`precioReal`) and the fixed fee (`precioFijo`) from the agency's planilla. The driver's earnings from fábrica trips (`gananciaFabricaTotal = fabricaTotal - fixedFeeTotal`) are subtracted from the day's total: `adjustedTotal = total - gananciaFabricaTotal`. "Otro" vales do NOT affect the adjusted total.
* 3.D: The agency's percentage amount gets reduced by deductions from the vales:
  - If "Fábrica" vales exist: deduct `fixedFeeTotal` (the fixed fee the agency charges per planilla).
  - If "Otro" vales exist: deduct sum of all real prices (`otroTotal`).
  - If both: deduct both sums.
  - `finalAgency = agencyAmount - fixedFeeTotal - otroTotal`.
* 3.E: The summarized usual calculation flow that the "driver" does is as follows:
- total: X amount
- If there are "Fábrica" vales: `adjustedTotal = total - (fabricaTotal - fixedFeeTotal)` = `total - gananciaFabricaTotal`
- If no "Fábrica" vales: `adjustedTotal = total` (unchanged)
- agency: `adjustedTotal × agencyPercent / 100`
- driver: `adjustedTotal × driverPercent / 100`
- gas: X amount
- petrol: X amount
- vehicle (if rented): `(adjustedTotal × carPercent / 100) - (gas + petrol)`. Enabled via a toggle — does not modify percentages automatically.
- Vale deductions:
  - If "Fábrica" vales exist: `deduction += fixedFeeTotal` (= sum of all fixed fees)
  - If "Otro" vales exist: `deduction += otroTotal`
- finalAgency = agencyAmount - deduction
- If no vales: finalAgency = agencyAmount (no deduction)
- Vale totals are displayed for reference in the receipt breakdown.
- **Calculate button**: User must press "Calcular resultados" — results are hidden until then. Any data change invalidates the calculation. Vales with empty data (0 trips or 0 price) block the button.

## 3. OPERATIONAL PRINCIPLES
- **Role by expertise**: always use the *Senior React Frontend Reviewer / Performance Engineer* role.  
- **Do not invent**: if context is missing, list exactly what is missing.  
- **Do not expose secrets**: replace sensitive values with `<SECRET_PLACEHOLDER>`.  
- **Evidence**: every finding must include a snippet and line reference.  
- **Prioritize impact**: classify findings by High/Medium/Low.

## 3. PRECONDITIONS BEFORE EXECUTION
1. Provide `files_or_diff` or a list of relevant files.  
2. Indicate `scope`: `component` | `page` | `feature` | `full`.  
3. Include linter configuration if it exists (ESLint/Prettier).  
4. Explicit confirmation of execution in **read-only** mode.

## 4. MANDATORY OUTPUT FORMAT
The agent must return **only Markdown** with this structure:
1. **Executive summary** (1–3 lines).  
2. **Categorized findings**: **Bug**, **Improvement**, **Refactor**, **Performance**, **Accessibility** — each with description, file:line, snippet, and evidence.  
3. **Verification checklist** (yes/no per item).  
4. **Recommended actions** (prioritized, concrete steps).  
5. **Suggested refactor snippets** (if applicable).  
6. **Notes on sensitive data** (if applicable).  
7. **Timestamp** and **used inputs**.

## 5. MINIMUM CHECKLIST AND CONCRETE BEST PRACTICES
### Structure and modularity
- **Folder per domain**: components/, hooks/, pages/, services/, styles/.  
- **Single Responsibility**: small components, a single responsibility.  
- **Separate UI and logic**: extract logic to hooks or services.  
- **Dumb components**: In cases of visual components, they should not contain any logic.
- **Reuse**: create atomic components and shared utilities.

### 6. RECOMMENDED PROJECT STRUCTURE
  ```bash
    src/
      core/
      module/
      shared/
  ```
### 7. Installation Commands

Install dependencies: pnpm install
Start server: pnpm dev

## References
- [REGLAS DE REACT Y BUENAS PRACTICAS](.agents.custom/skills/best-practiced/references/best-practice-react.md)
- [REGLAS DE BUENAS PRACTICAS DE TYPESCRIPT](.agents.custom/skills/best-practiced/references/best-practice-ts.md)
- [RULES](/.agents.custom/skills/rules/RULES.md)
- [CODE STYLES](.agents.custom/skills/style-code\skills/references/style-code.md)
