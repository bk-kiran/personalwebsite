import React, { useState } from 'react'
import './index.css'

const GradeCalculator = () => {
  const [components, setComponents] = useState([
    { id: 1, name: '', grade: '', weightage: '' }
  ])
  const [overallPercentage, setOverallPercentage] = useState(null)

  const addRow = () => {
    setComponents([...components, { id: Date.now(), name: '', grade: '', weightage: '' }])
  }

  const removeRow = (id) => {
    if (components.length > 1) {
      setComponents(components.filter(comp => comp.id !== id))
    }
  }

  const updateComponent = (id, field, value) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ))
  }

  const calculatePercentage = () => {
    let totalWeightedPoints = 0
    let totalWeightage = 0
    let isValid = true

    components.forEach(comp => {
      const grade = parseFloat(comp.grade)
      const weightage = parseFloat(comp.weightage)

      if (isNaN(grade) || isNaN(weightage) || grade < 0 || weightage < 0) {
        isValid = false
        return
      }

      totalWeightedPoints += (grade * weightage) / 100
      totalWeightage += weightage
    })

    if (!isValid || totalWeightage === 0) {
      setOverallPercentage(null)
      return
    }

    const percentage = (totalWeightedPoints / totalWeightage) * 100
    setOverallPercentage(percentage.toFixed(2))
  }

  const clearAll = () => {
    setComponents([{ id: Date.now(), name: '', grade: '', weightage: '' }])
    setOverallPercentage(null)
  }

  return (
    <div className="grade-calculator">
      <div className="calculator-container">
        <div className="calculator-header">
          <h2>Grade Calculator</h2>
          <p>Calculate your overall course percentage based on component grades and weightages</p>
        </div>

        <div className="table-container">
          <table className="grade-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Grade (%)</th>
                <th>Weightage (%)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {components.map((comp, index) => (
                <tr key={comp.id}>
                  <td>
                    <input
                      type="text"
                      placeholder={`Component ${index + 1}`}
                      value={comp.name}
                      onChange={(e) => updateComponent(comp.id, 'name', e.target.value)}
                      className="component-name-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="0.00"
                      value={comp.grade}
                      onChange={(e) => updateComponent(comp.id, 'grade', e.target.value)}
                      className="grade-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="0.00"
                      value={comp.weightage}
                      onChange={(e) => updateComponent(comp.id, 'weightage', e.target.value)}
                      className="weightage-input"
                    />
                  </td>
                  <td>
                    {components.length > 1 && (
                      <button
                        onClick={() => removeRow(comp.id)}
                        className="remove-btn"
                        aria-label="Remove row"
                      >
                        ×
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="table-actions">
            <button onClick={addRow} className="add-row-btn">
              + Add Component
            </button>
            <button onClick={clearAll} className="clear-btn">
              Clear All
            </button>
          </div>
        </div>

        <div className="calculation-section">
          <button onClick={calculatePercentage} className="calculate-btn">
            Calculate Overall Percentage
          </button>

          {overallPercentage !== null && (
            <div className="result-display">
              <div className="result-label">Overall Percentage:</div>
              <div className="result-value">{overallPercentage}%</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GradeCalculator
