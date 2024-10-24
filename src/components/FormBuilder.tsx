import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, GripVertical, ArrowLeft } from 'lucide-react';
import { Form, FormField, FieldType } from '../types/form';
import { useFormStore } from '../store/useFormStore';

interface FormBuilderProps {
  onSave: (form: Form) => void;
}

export default function FormBuilder({ onSave }: FormBuilderProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { forms } = useFormStore();
  const [form, setForm] = useState<Form>({
    id: crypto.randomUUID(),
    title: '',
    description: '',
    fields: [],
    createdAt: Date.now(),
  });

  useEffect(() => {
    if (id) {
      const existingForm = forms.find(f => f.id === id);
      if (existingForm) {
        setForm(existingForm);
      } else {
        navigate('/forms');
      }
    }
  }, [id, forms, navigate]);

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      type,
      label: '',
      required: false,
      options: type === 'radio' || type === 'checkbox' ? [''] : undefined,
    };
    setForm({ ...form, fields: [...form.fields, newField] });
  };

  const updateField = (index: number, field: FormField) => {
    const newFields = [...form.fields];
    newFields[index] = field;
    setForm({ ...form, fields: newFields });
  };

  const removeField = (index: number) => {
    setForm({ ...form, fields: form.fields.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate('/forms')}
        className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Forms</span>
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Form Title"
            className="text-2xl font-bold w-full border-b-2 border-purple-200 focus:border-purple-500 outline-none px-2 py-1"
            required
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Form Description"
            className="w-full border-b-2 border-purple-200 focus:border-purple-500 outline-none px-2 py-1 resize-none"
            rows={2}
          />
        </div>

        <div className="space-y-4">
          {form.fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-white rounded-lg shadow-sm p-6 space-y-4 relative group"
            >
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                <GripVertical className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) =>
                    updateField(index, { ...field, label: e.target.value })
                  }
                  placeholder="Question"
                  className="text-lg w-full border-b-2 border-purple-200 focus:border-purple-500 outline-none px-2 py-1"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {(field.type === 'radio' || field.type === 'checkbox') && (
                <div className="space-y-2 pl-4">
                  {field.options?.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      {field.type === 'radio' ? (
                        <div className="w-4 h-4 rounded-full border-2 border-purple-500" />
                      ) : (
                        <div className="w-4 h-4 rounded border-2 border-purple-500" />
                      )}
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(field.options || [])];
                          newOptions[optionIndex] = e.target.value;
                          updateField(index, { ...field, options: newOptions });
                        }}
                        placeholder="Option"
                        className="border-b border-gray-300 focus:border-purple-500 outline-none px-2 py-1"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      updateField(index, {
                        ...field,
                        options: [...(field.options || []), ''],
                      })
                    }
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Add Option
                  </button>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) =>
                      updateField(index, { ...field, required: e.target.checked })
                    }
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span>Required</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-4 py-4">
          <button
            type="button"
            onClick={() => addField('text')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Text</span>
          </button>
          <button
            type="button"
            onClick={() => addField('radio')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Multiple Choice</span>
          </button>
          <button
            type="button"
            onClick={() => addField('checkbox')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Checkboxes</span>
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Save Form
          </button>
        </div>
      </form>
    </div>
  );
}