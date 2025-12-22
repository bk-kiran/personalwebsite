import React, { useState } from 'react'
import './index.css'

const GPACalculator = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: '', credits: '', grade: '' }
  ])
  const [gpa, setGpa] = useState(null)

  // Grade to points mapping (standard 4.0 scale)
  const gradeToPoints = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'D-': 0.7,
    'F': 0.0
  }

  const addRow = () => {
    setCourses([...courses, { id: Date.now(), name: '', credits: '', grade: '' }])
  }

  const removeRow = (id) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id))
    }
  }

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ))
  }

  const calculateGPA = () => {
    let totalPoints = 0
    let totalCredits = 0
    let isValid = true

    courses.forEach(course => {
      const credits = parseFloat(course.credits)
      const grade = course.grade.trim().toUpperCase()

      if (isNaN(credits) || credits <= 0 || !gradeToPoints[grade]) {
        isValid = false
        return
      }

      const points = gradeToPoints[grade]
      totalPoints += points * credits
      totalCredits += credits
    })

    if (!isValid || totalCredits === 0) {
      setGpa(null)
      return
    }

    const calculatedGPA = totalPoints / totalCredits
    setGpa(calculatedGPA.toFixed(2))
  }

  const clearAll = () => {
    setCourses([{ id: Date.now(), name: '', credits: '', grade: '' }])
    setGpa(null)
  }

  const gradeOptions = Object.keys(gradeToPoints)

  return (
    <div className="gpa-calculator">
      <div className="calculator-container">
        <div className="calculator-header">
          <h2>GPA Calculator</h2>
          <p>Calculate your semester GPA based on courses, credits, and letter grades</p>
        </div>

        <div className="table-container">
          <table className="gpa-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Credits</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course.id}>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g., CS 446"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      className="course-name-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="0"
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                      className="credits-input"
                    />
                  </td>
                  <td>
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                      className="grade-select"
                    >
                      <option value="">Select Grade</option>
                      {gradeOptions.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {courses.length > 1 && (
                      <button
                        onClick={() => removeRow(course.id)}
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
              + Add Course
            </button>
            <button onClick={clearAll} className="clear-btn">
              Clear All
            </button>
          </div>
        </div>

        <div className="calculation-section">
          <button onClick={calculateGPA} className="calculate-btn">
            Calculate GPA
          </button>

          {gpa !== null && (
            <div className="result-display">
              <div className="result-label">Semester GPA:</div>
              <div className="result-value">{gpa}</div>
              <div className="result-scale">out of 4.0</div>
            </div>
          )}
        </div>

        <div className="grade-info">
          <h3>Grade Scale</h3>
          <div className="grade-scale-grid">
            {Object.entries(gradeToPoints).map(([grade, points]) => (
              <div key={grade} className="grade-scale-item">
                <span className="grade-letter">{grade}</span>
                <span className="grade-points">{points.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GPACalculator
