import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FormList from './components/FormList';
import FormBuilder from './components/FormBuilder';
import FormPreview from './components/FormPreview';
import { useFormStore } from './store/useFormStore';

function App() {
  const { addForm, updateForm } = useFormStore();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/forms" replace />} />
          <Route path="/forms" element={<FormList />} />
          <Route
            path="/forms/new"
            element={
              <FormBuilder
                onSave={(form) => {
                  addForm(form);
                  window.location.href = '/forms';
                }}
              />
            }
          />
          <Route
            path="/forms/:id/edit"
            element={
              <FormBuilder
                onSave={(form) => {
                  updateForm(form);
                  window.location.href = '/forms';
                }}
              />
            }
          />
          <Route path="/forms/:id/preview" element={<FormPreview />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;