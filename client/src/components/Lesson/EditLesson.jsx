const EditLesson = ({ lesson, onClose }) => {
  console.log(lesson)
  return (
    <div>
      <h1>EditLesson</h1>
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default EditLesson
