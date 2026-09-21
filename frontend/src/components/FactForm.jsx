import { useEffect, useState } from 'react';

const emptyState = {
  title: '',
  description: '',
  category: 'Prostate Health',
  source: '',
  sourceUrl: '',
};

export default function FactForm({ categories, initialValues, onSubmit, onCancel, isSubmitting, mode = 'create' }) {
  const [form, setForm] = useState({ ...emptyState, ...initialValues });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({ ...emptyState, ...initialValues });
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = 'Title is required.';
    if (!form.description.trim()) nextErrors.description = 'Description is required.';
    if (!form.category.trim()) nextErrors.category = 'Category is required.';
    if (!form.source.trim()) nextErrors.source = 'Source is required.';
    if (!form.sourceUrl.trim()) nextErrors.sourceUrl = 'Source URL is required.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
  };

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="fact-title">Title</label>
          <input
            id="fact-title"
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title ? <span className="error-banner" style={{ marginTop: '4px', padding: '8px 10px' }}>{errors.title}</span> : null}
        </div>

        <div className="form-field">
          <label htmlFor="fact-category">Category</label>
          <select
            id="fact-category"
            className="select-control"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? <span className="error-banner" style={{ marginTop: '4px', padding: '8px 10px' }}>{errors.category}</span> : null}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="fact-description">Description</label>
        <textarea
          id="fact-description"
          className="textarea-control"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        {errors.description ? <span className="error-banner" style={{ marginTop: '4px', padding: '8px 10px' }}>{errors.description}</span> : null}
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="fact-source">Source</label>
          <input
            id="fact-source"
            className="form-control"
            name="source"
            value={form.source}
            onChange={handleChange}
          />
          {errors.source ? <span className="error-banner" style={{ marginTop: '4px', padding: '8px 10px' }}>{errors.source}</span> : null}
        </div>

        <div className="form-field">
          <label htmlFor="fact-source-url">Source URL</label>
          <input
            id="fact-source-url"
            className="form-control"
            name="sourceUrl"
            value={form.sourceUrl}
            onChange={handleChange}
          />
          {errors.sourceUrl ? <span className="error-banner" style={{ marginTop: '4px', padding: '8px 10px' }}>{errors.sourceUrl}</span> : null}
        </div>
      </div>

      <div className="form-actions" style={{ marginTop: '20px' }}>
        <button type="button" className="secondary-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="primary-btn" disabled={isSubmitting}>
          {isSubmitting ? (mode === 'edit' ? 'Saving...' : 'Creating...') : mode === 'edit' ? 'Save changes' : 'Add health fact'}
        </button>
      </div>
    </form>
  );
}
