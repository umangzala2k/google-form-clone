import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/useFormStore';

export default function FormPreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { forms, addResponse } = useFormStore();
  const form = forms.find((f) => f.id === id);
  
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  if (!form) {
    return <div>Form not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = {
      id: crypto.randomUUID(),
      formId: form.id,
      answers,
      submittedAt: Date.now(),
    };
    
    addResponse(response);
    navigate('/forms');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{form.title}</h1>
        <p className="text-gray-600">{form.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {form.fields.map((field) => (
          <div key={field.id} className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-lg font-medium text-gray-900 mb-4">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === 'text' && (
              <input
                type="text"
                required={field.required}
                onChange={(e) =>
                  setAnswers({ ...answers, [field.id]: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            )}

            {field.type === 'radio' && (
              <div className="space-y-2">
                {field.options?.map((option, index) => (
                  <label key={index} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name={field.id}
                      value={option}
                      required={field.required}
                      onChange={(e) =>
                        setAnswers({ ...answers, [field.id]: e.target.value })
                      }
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {field.type === 'checkbox' && (
              <div className="space-y-2">
                {field.options?.map((option, index) => (
                  <label key={index} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      value={option}
                      onChange={(e) => {
                        const currentAnswers = (answers[field.id] as string[]) || [];
                        const newAnswers = e.target.checked
                          ? [...currentAnswers, option]
                          : currentAnswers.filter((a) => a !== option);
                        setAnswers({ ...answers, [field.id]: newAnswers });
                      }}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}