import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit2, Trash2, FileText } from 'lucide-react';
import { useFormStore } from '../store/useFormStore';

export default function FormList() {
  const navigate = useNavigate();
  const { forms, deleteForm } = useFormStore();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Forms</h1>
        <button
          onClick={() => navigate('/forms/new')}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Create Form</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {forms.map((form) => (
          <div
            key={form.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {form.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(form.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {form.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-gray-500">
                {form.fields.length} questions
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/forms/${form.id}/preview`)}
                  className="p-2 text-gray-600 hover:text-purple-600 rounded-full hover:bg-purple-50"
                >
                  <FileText className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate(`/forms/${form.id}/edit`)}
                  className="p-2 text-gray-600 hover:text-purple-600 rounded-full hover:bg-purple-50"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteForm(form.id)}
                  className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}