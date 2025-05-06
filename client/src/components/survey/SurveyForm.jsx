import React from 'react';

const SurveyForm = ({ survey, onSubmit, loading }) => {
  const [answers, setAnswers] = React.useState({});

  const handleChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'text':
        return (
          <div className="mb-3">
            <label className="form-label">{question.text}</label>
            <input
              type="text"
              className="form-control"
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              required={question.required}
            />
          </div>
        );

      case 'textarea':
        return (
          <div className="mb-3">
            <label className="form-label">{question.text}</label>
            <textarea
              className="form-control"
              rows="3"
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              required={question.required}
            />
          </div>
        );

      case 'radio':
        return (
          <div className="mb-3">
            <label className="form-label">{question.text}</label>
            <div>
              {question.options.map((option) => (
                <div className="form-check" key={option.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question_${question.id}`}
                    id={`option_${option.id}`}
                    value={option.id}
                    checked={answers[question.id] === option.id}
                    onChange={() => handleChange(question.id, option.id)}
                    required={question.required}
                  />
                  <label className="form-check-label" htmlFor={`option_${option.id}`}>
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="mb-3">
            <label className="form-label">{question.text}</label>
            <div>
              {question.options.map((option) => (
                <div className="form-check" key={option.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`option_${option.id}`}
                    value={option.id}
                    checked={answers[question.id]?.includes(option.id) || false}
                    onChange={(e) => {
                      const currentAnswers = answers[question.id] || [];
                      const newAnswers = e.target.checked
                        ? [...currentAnswers, option.id]
                        : currentAnswers.filter(id => id !== option.id);
                      handleChange(question.id, newAnswers);
                    }}
                  />
                  <label className="form-check-label" htmlFor={`option_${option.id}`}>
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="mb-3">
            <label className="form-label">{question.text}</label>
            <select
              className="form-select"
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              required={question.required}
            >
              <option value="">Select an option</option>
              {question.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  if (!survey) {
    return <div>Loading survey...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">{survey.title}</h3>
          <p className="card-text mb-4">{survey.description}</p>
          
          {survey.questions.map((question) => (
            <div key={question.id} className="mb-4">
              {renderQuestion(question)}
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Submitting...
              </>
            ) : (
              'Submit Survey'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SurveyForm; 