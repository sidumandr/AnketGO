import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SurveyForm from '../components/survey/SurveyForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SurveyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSurvey();
  }, [id]);

  const fetchSurvey = async () => {
    try {
      const response = await axios.get(`/api/surveys/${id}`);
      setSurvey(response.data);
    } catch (error) {
      toast.error('Failed to fetch survey');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (answers) => {
    setSubmitting(true);
    try {
      await axios.post('/api/responses', {
        surveyId: id,
        answers
      });
      toast.success('Survey submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit survey');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!survey) {
    return (
      <div className="alert alert-danger">
        Survey not found or you don't have permission to access it.
      </div>
    );
  }

  return (
    <div>
      <SurveyForm
        survey={survey}
        onSubmit={handleSubmit}
        loading={submitting}
      />
    </div>
  );
};

export default SurveyPage; 