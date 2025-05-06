import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [evaluation, setEvaluation] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const [userResponse, responsesResponse] = await Promise.all([
        axios.get(`/api/admin/users/${id}`),
        axios.get(`/api/admin/users/${id}/responses`)
      ]);
      setUser(userResponse.data);
      setResponses(responsesResponse.data);
    } catch (error) {
      toast.error('Failed to fetch user data');
      navigate('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluationSubmit = async (responseId) => {
    setSaving(true);
    try {
      await axios.post(`/api/admin/responses/${responseId}/evaluate`, {
        evaluation
      });
      toast.success('Evaluation saved successfully');
      fetchUserData(); // Refresh data
    } catch (error) {
      toast.error('Failed to save evaluation');
    } finally {
      setSaving(false);
      setEvaluation('');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="alert alert-danger">
        User not found
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Details</h2>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/admin/users')}
        >
          Back to Users
        </button>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title h5">User Information</h3>
              <div className="mb-3">
                <strong>Name:</strong> {`${user.firstName} ${user.lastName}`}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="mb-3">
                <strong>Username:</strong> {user.username}
              </div>
              <div className="mb-3">
                <strong>Role:</strong>{' '}
                <span className={`badge ${user.isAdmin ? 'bg-primary' : 'bg-secondary'}`}>
                  {user.isAdmin ? 'Admin' : 'User'}
                </span>
              </div>
              <div className="mb-3">
                <strong>Status:</strong>{' '}
                <span className={`badge ${user.active ? 'bg-success' : 'bg-danger'}`}>
                  {user.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title h5 mb-4">Survey Responses</h3>
              
              {responses.length === 0 ? (
                <p className="text-muted">No responses found for this user.</p>
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
                      
                      <div className="mt-3">
                        <h6>Answers:</h6>
                        {response.answers.map((answer, index) => (
                          <div key={index} className="mb-2">
                            <strong>{answer.question.text}:</strong>{' '}
                            {Array.isArray(answer.value) 
                              ? answer.value.join(', ')
                              : answer.value}
                          </div>
                        ))}
                      </div>

                      <div className="mt-3">
                        <h6>Evaluation:</h6>
                        {response.evaluation ? (
                          <p className="mb-2">{response.evaluation}</p>
                        ) : (
                          <div className="mb-3">
                            <textarea
                              className="form-control"
                              rows="3"
                              placeholder="Enter evaluation..."
                              value={evaluation}
                              onChange={(e) => setEvaluation(e.target.value)}
                            />
                            <button
                              className="btn btn-primary mt-2"
                              onClick={() => handleEvaluationSubmit(response.id)}
                              disabled={saving || !evaluation.trim()}
                            >
                              {saving ? 'Saving...' : 'Save Evaluation'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
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

export default UserDetailPage; 