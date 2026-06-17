import useCalculatorContext from '../../../core/context/useCalculatorContext';
import PreCalculationView from './PreCalculationView';
import PostCalculationView from './PostCalculationView';
import type { ReactNode } from 'react';

interface ResultsSectionProps {
  onViewReceipt: () => void;
}

export function ResultsSection({ onViewReceipt }: ResultsSectionProps): ReactNode {
  const { state } = useCalculatorContext();

  if (state.calculated) {
    return <PostCalculationView onViewReceipt={onViewReceipt} />;
  }

  return <PreCalculationView />;
}
