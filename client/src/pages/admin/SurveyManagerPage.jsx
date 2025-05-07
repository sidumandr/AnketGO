import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const SurveyManagerPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [{ text: '', type: 'text', required: true, options: [] }]
  });

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get('/api/admin/surveys');
      setSurveys(response.data);
    } catch (error) {
      toast.error('Failed to fetch surveys');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setFormData({ ...formData, questions: newQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { text: '', type: 'text', required: true, options: [] }
      ]
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options.push('');
    setFormData({ ...formData, questions: newQuestions });
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options = newQuestions[questionIndex].options.filter(
      (_, i) => i !== optionIndex
    );
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/surveys', formData);
      toast.success('Survey created successfully');
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        questions: [{ text: '', type: 'text', required: true, options: [] }]
      });
      fetchSurveys();
    } catch (error) {
      toast.error('Failed to create survey');
    }
  };

  const handleDelete = async (surveyId) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      try {
        await axios.delete(`/api/admin/surveys/${surveyId}`);
        toast.success('Survey deleted successfully');
        fetchSurveys();
      } catch (error) {
        toast.error('Failed to delete survey');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Survey Manager</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create New Survey'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title h5 mb-4">Yeni Anket Oluştur</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Başlık</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Açıklama</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <h4 className="h6 mb-3">Questions</h4>
              {formData.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title h6 mb-0">Question {questionIndex + 1}</h5>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeQuestion(questionIndex)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Soru Metni</label>
                      <input
                        type="text"
                        className="form-control"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(questionIndex, 'text', e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Soru Tipi</label>
                      <select
                        className="form-select"
                        value={question.type}
                        onChange={(e) => handleQuestionChange(questionIndex, 'type', e.target.value)}
                      >
                        <option value="text">Text</option>
                        <option value="textarea">Text Area</option>
                        <option value="radio">Radio</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="select">Select</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`required-${questionIndex}`}
                          checked={question.required}
                          onChange={(e) => handleQuestionChange(questionIndex, 'required', e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor={`required-${questionIndex}`}>
                          Required
                        </label>
                      </div>
                    </div>

                    {(question.type === 'radio' || question.type === 'checkbox' || question.type === 'select') && (
                      <div className="mb-3">
                        <label className="form-label">Options</label>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="input-group mb-2">
                            <input
                              type="text"
                              className="form-control"
                              value={option}
                              onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                              required
                            />
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => removeOption(questionIndex, optionIndex)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => addOption(questionIndex)}
                        >
                          Add Option
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-outline-primary mb-3"
                onClick={addQuestion}
              >
                Soru Ekle
              </button>

              <div>
                <button type="submit" className="btn btn-primary">
                  Anket Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <h3 className="card-title h5 mb-4">Mevcut Anketler</h3>
          {surveys.length === 0 ? (
            <p className="text-muted">Anket bulunamadı.</p>
          ) : (
            <div className="list-group">
              {surveys.map((survey) => (
                <div key={survey.id} className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{survey.title}</h5>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(survey.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <p className="mb-1">{survey.description}</p>
                  <small className="text-muted">
                    {survey.questions.length} questions
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyManagerPage; 