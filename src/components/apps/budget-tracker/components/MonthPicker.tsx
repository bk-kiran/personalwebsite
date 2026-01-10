import React from 'react';
import { getMonthDisplay, getPreviousMonth, getNextMonth } from '../utils';

interface MonthPickerProps {
  currentMonth: string;
  onMonthChange: (month: string) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ currentMonth, onMonthChange }) => {
  const handlePrevious = () => {
    onMonthChange(getPreviousMonth(currentMonth));
  };

  const handleNext = () => {
    onMonthChange(getNextMonth(currentMonth));
  };

  return (
    <div className="month-picker">
      <button className="month-nav-btn" onClick={handlePrevious} aria-label="Previous month">
        ←
      </button>
      <span className="month-display">{getMonthDisplay(currentMonth)}</span>
      <button className="month-nav-btn" onClick={handleNext} aria-label="Next month">
        →
      </button>
    </div>
  );
};

export default MonthPicker;

