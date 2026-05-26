import { CalculatorProvider } from "../../core/context/CalculatorContext";
import CalculatorContent from "../calculator/CalculationContent";

const HomePage = () => {
  return (
    <CalculatorProvider>
      <CalculatorContent />
    </CalculatorProvider>
  )
}

export default HomePage;