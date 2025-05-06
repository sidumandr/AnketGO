import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MyAnswersPage = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const response = await axios.get('/api/responses/my-answers');
      setResponses(response.data);
    } catch (error) {
      toast.error('Failed to fetch your answers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2 className="mb-4">My Answers</h2>
      
      {responses.length === 0 ? (
        <div className="alert alert-info">
          You haven't completed any surveys yet.
        </div>
      ) : (
        <div className="list-group">
          {responses.map((response) => (
            <div key={response.id} className="list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{response.survey.title}</h5>
                <small className="text-muted">
                  Submitted: {new Date(response.submittedAt).toLocaleDateString()}
                </small>
              </div>
              <p className="mb-1">{response.survey.description}</p>
              
              <div className="mt-3">
                <h6>Your Answers:</h6>
                {response.answers.map((answer, index) => (
                  <div key={index} className="mb-2">
                    <strong>{answer.question.text}:</strong>{' '}
                    {Array.isArray(answer.value) 
                      ? answer.value.join(', ')
                      : answer.value}
                  </div>
                ))}
              </div>

              {response.evaluation && (
                <div className="mt-3">
                  <h6>Evaluation:</h6>
                  <p className="mb-0">{response.evaluation}</p>
                </div>
              )}

              <div className="mt-3">
                <Link
                  to={`/survey/${response.survey.id}`}
                  className="btn btn-outline-primary btn-sm"
                >
                  View Survey
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAnswersPage; 