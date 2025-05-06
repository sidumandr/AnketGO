import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DashboardPage = () => {
  const [surveys, setSurveys] = useState({
    assigned: [],
    completed: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get('/api/surveys/dashboard');
      setSurveys(response.data);
    } catch (error) {
      toast.error('Failed to fetch surveys');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="card-title h5 mb-0">Assigned Surveys</h3>
            </div>
            <div className="card-body">
              {surveys.assigned.length === 0 ? (
                <p className="text-muted">No surveys assigned to you.</p>
              ) : (
                <div className="list-group">
                  {surveys.assigned.map((survey) => (
                    <Link
                      key={survey.id}
                      to={`/survey/${survey.id}`}
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{survey.title}</h5>
                        <small className="text-muted">
                          Due: {new Date(survey.dueDate).toLocaleDateString()}
                        </small>
                      </div>
                      <p className="mb-1">{survey.description}</p>
                      <small className="text-muted">
                        {survey.questions.length} questions
                      </small>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="card-title h5 mb-0">Completed Surveys</h3>
            </div>
            <div className="card-body">
              {surveys.completed.length === 0 ? (
                <p className="text-muted">You haven't completed any surveys yet.</p>
              ) : (
                <div className="list-group">
                  {surveys.completed.map((survey) => (
                    <Link
                      key={survey.id}
                      to={`/my-answers/${survey.id}`}
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{survey.title}</h5>
                        <small className="text-muted">
                          Completed: {new Date(survey.completedAt).toLocaleDateString()}
                        </small>
                      </div>
                      <p className="mb-1">{survey.description}</p>
                      {survey.evaluation && (
                        <small className="text-success">
                          Evaluation: {survey.evaluation}
                        </small>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 