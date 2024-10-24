import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Form, FormResponse } from '../types/form';

interface FormStore {
  forms: Form[];
  responses: FormResponse[];
  addForm: (form: Form) => void;
  updateForm: (form: Form) => void;
  deleteForm: (id: string) => void;
  addResponse: (response: FormResponse) => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      forms: [],
      responses: [],
      addForm: (form) =>
        set((state) => ({ forms: [...state.forms, form] })),
      updateForm: (form) =>
        set((state) => ({
          forms: state.forms.map((f) => (f.id === form.id ? form : f)),
        })),
      deleteForm: (id) =>
        set((state) => ({
          forms: state.forms.filter((f) => f.id !== id),
          responses: state.responses.filter((r) => r.formId !== id),
        })),
      addResponse: (response) =>
        set((state) => ({ responses: [...state.responses, response] })),
    }),
    {
      name: 'form-storage',
    }
  )
);