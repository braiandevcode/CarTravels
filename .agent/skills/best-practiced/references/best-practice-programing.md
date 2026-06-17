## BEST PRACTICE PROGRAMING

### 1. SOFTWARE DESIGN PRINCIPLES
- Single Responsibility Principle (SRP)
- Separation of Concerns (SoC)
- Modularity / Componentization
- Anti-pattern "God Object" (Blob)
- Un archivo debe ser tan corto como sea posible para hacer una sola cosa bien, y tan largo como sea necesario para no fragmentar esa misma lógica de forma antinatural.

### 2. Heuristics and Accepted Ranges (Practice Analysis)
- **Per File / Class**: The general rule is that a file should have between 100 and 500 lines. If a file exceeds 1000 lines, it's a strong indicator that the file should be refactored and split.
- **By Function / Method**: Functions should be much shorter. The rule of thumb suggests between 10 and 50 lines per function. If a function is taller than a monitor (you have to scroll to read it all), it’s probably doing too much.
- **Line width:** the standard is usually between 100 and 120 characters per line to avoid eye strain from reading side to side.


### 3. Verificación de Supuestos y Casos Límite
To justify these practices, it's crucial to separate the concept of 'machine optimization' from 'human optimization,' and consider where these general rules might fail.