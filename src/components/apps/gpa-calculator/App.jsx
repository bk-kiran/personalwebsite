import React, { useState, useEffect } from 'react'
import './index.css'

const STORAGE_KEY = 'gpa-calculator-data'

const GPACalculator = () => {
  // Load from localStorage or use default
  const getInitialSemesters = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Ensure we have valid data structure
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Migrate old "Default Semester" names to "Semester X" format
          const migrated = parsed.map((sem, index) => {
            if (sem.name && sem.name.includes('Default Semester')) {
              const semesterNum = index + 1
              return { ...sem, name: `Semester ${semesterNum}` }
            }
            return sem
          })
          // Save migrated data back to localStorage
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
          return migrated
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    }
    // Default state
    return [
      { 
        id: Date.now(), 
        name: 'Semester 1', 
        courses: [{ id: Date.now() + 1, name: '', credits: '', grade: '' }] 
      }
    ]
  }

  const [semesters, setSemesters] = useState(getInitialSemesters)

  // Save to localStorage whenever semesters change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(semesters))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [semesters])

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

  const addSemester = () => {
    const semesterNumber = semesters.length + 1
    const name = `Semester ${semesterNumber}`
    
    setSemesters([...semesters, {
      id: Date.now(),
      name,
      courses: [{ id: Date.now() + 1, name: '', credits: '', grade: '' }]
    }])
  }

  const removeSemester = (semesterId) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(sem => sem.id !== semesterId))
    }
  }

  const updateSemesterName = (semesterId, newName) => {
    setSemesters(semesters.map(sem =>
      sem.id === semesterId ? { ...sem, name: newName } : sem
    ))
  }

  const addCourse = (semesterId) => {
    setSemesters(semesters.map(sem =>
      sem.id === semesterId
        ? { ...sem, courses: [...sem.courses, { id: Date.now(), name: '', credits: '', grade: '' }] }
        : sem
    ))
  }

  const removeCourse = (semesterId, courseId) => {
    setSemesters(semesters.map(sem =>
      sem.id === semesterId
        ? { ...sem, courses: sem.courses.filter(c => c.id !== courseId).length > 0 
            ? sem.courses.filter(c => c.id !== courseId)
            : [{ id: Date.now(), name: '', credits: '', grade: '' }] }
        : sem
    ))
  }

  const updateCourse = (semesterId, courseId, field, value) => {
    setSemesters(semesters.map(sem =>
      sem.id === semesterId
        ? {
            ...sem,
            courses: sem.courses.map(course =>
              course.id === courseId ? { ...course, [field]: value } : course
            )
          }
        : sem
    ))
  }

  const calculateSemesterGPA = (courses) => {
    let totalPoints = 0
    let totalCredits = 0
    let hasValidCourse = false

    courses.forEach(course => {
      const credits = parseFloat(course.credits)
      const grade = course.grade ? course.grade.trim().toUpperCase() : ''

      if (!isNaN(credits) && credits > 0 && grade && gradeToPoints[grade] !== undefined) {
        const points = gradeToPoints[grade]
        totalPoints += points * credits
        totalCredits += credits
        hasValidCourse = true
      }
    })

    if (!hasValidCourse || totalCredits === 0) return null
    return (totalPoints / totalCredits).toFixed(2)
  }

  const calculateCumulativeGPA = () => {
    let totalPoints = 0
    let totalCredits = 0
    let hasValidCourse = false

    semesters.forEach(semester => {
      semester.courses.forEach(course => {
        const credits = parseFloat(course.credits)
        const grade = course.grade ? course.grade.trim().toUpperCase() : ''

        if (!isNaN(credits) && credits > 0 && grade && gradeToPoints[grade] !== undefined) {
          const points = gradeToPoints[grade]
          totalPoints += points * credits
          totalCredits += credits
          hasValidCourse = true
        }
      })
    })

    if (!hasValidCourse || totalCredits === 0) return null
    return (totalPoints / totalCredits).toFixed(2)
  }

  const clearAll = () => {
    setSemesters([{
      id: Date.now(),
      name: 'Semester 1',
      courses: [{ id: Date.now() + 1, name: '', credits: '', grade: '' }]
    }])
  }

  const gradeOptions = Object.keys(gradeToPoints)
  const cumulativeGPA = calculateCumulativeGPA()

  return (
    <div className="gpa-calculator">
      <div className="calculator-container">
        <div className="calculator-header">
          <h2>Cumulative GPA Calculator</h2>
          <p>Track your GPA across multiple semesters and calculate your cumulative GPA</p>
          <p className="scale-info">GPA calculated on a 4.0 point scale</p>
        </div>

        {/* Cumulative GPA Display */}
        {cumulativeGPA !== null && (
          <div className="cumulative-gpa-section">
            <div className="cumulative-gpa-display">
              <div className="cumulative-label">Cumulative GPA</div>
              <div className="cumulative-value">{cumulativeGPA}</div>
              <div className="cumulative-scale">on a 4.0 point scale</div>
            </div>
          </div>
        )}

        {/* Semesters */}
        <div className="semesters-container">
          {semesters.map((semester, semIndex) => {
            const semesterGPA = calculateSemesterGPA(semester.courses)
            
            return (
              <div key={semester.id} className="semester-card">
                <div className="semester-header">
                  <input
                    type="text"
                    value={semester.name}
                    onChange={(e) => updateSemesterName(semester.id, e.target.value)}
                    className="semester-name-input"
                    placeholder="Semester Name"
                  />
                  {semesterGPA !== null && (
                    <div className="semester-gpa-badge">
                      Semester GPA: <span className="semester-gpa-value">{semesterGPA}</span> 
                    </div>
                  )}
                  {semesters.length > 1 && (
                    <button
                      onClick={() => removeSemester(semester.id)}
                      className="remove-semester-btn"
                      aria-label="Remove semester"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="semester-courses">
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
                      {semester.courses.map((course) => (
                        <tr key={course.id}>
                          <td>
                            <input
                              type="text"
                              placeholder="e.g., CS 446"
                              value={course.name}
                              onChange={(e) => updateCourse(semester.id, course.id, 'name', e.target.value)}
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
                              onChange={(e) => updateCourse(semester.id, course.id, 'credits', e.target.value)}
                              className="credits-input"
                            />
                          </td>
                          <td>
                            <select
                              value={course.grade}
                              onChange={(e) => updateCourse(semester.id, course.id, 'grade', e.target.value)}
                              className="grade-select"
                            >
                              <option value="">Select Grade</option>
                              {gradeOptions.map(grade => (
                                <option key={grade} value={grade}>{grade}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            {semester.courses.length > 1 && (
                              <button
                                onClick={() => removeCourse(semester.id, course.id)}
                                className="remove-btn"
                                aria-label="Remove course"
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
                    <button 
                      onClick={() => addCourse(semester.id)} 
                      className="add-row-btn"
                    >
                      + Add Course
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Global Actions */}
        <div className="global-actions">
          <button onClick={addSemester} className="add-semester-btn">
            + Add Semester
          </button>
          <button onClick={clearAll} className="clear-btn">
            Clear All
          </button>
        </div>

        {/* Grade Scale Info */}
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
