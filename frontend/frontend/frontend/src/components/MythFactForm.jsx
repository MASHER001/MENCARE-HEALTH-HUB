import { useEffect, useState } from 'react';

const emptyState = {
  myth: '',
  fact: '',
  explanation: '',
  category: 'Prostate Health',
  source: '',
  sourceUrl: '',
};

export default function MythFactForm({ categories, initialValues, onSubmit, onCancel, isSubmitting, mode = 'create' }) {
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

    if (!form.myth.trim()) nextErrors.myth = 'Myth is required.';
    if (!form.fact.trim()) nextErrors.fact = 'Fact is required.';
    if (!form.explanation.trim()) nextErrors.explanation = 'Explanation is required.';
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

    onSubmit({
      ...form,
      myth: form.myth.trim(),
      fact: form.fact.trim(),
      explanation: form.explanation.trim(),
    });
  };

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="myth-text">Myth</label>
          <textarea
            id="myth-text"
            className="textarea-control"
            name="myth"
            value={form.myth}
            onChange={handleChange}
          />
          {errors.myth ? <span className="error-banner" style={{ marginTop: '4px', padding: '8px 10px' }}>{errors.myth}</span> : null}
        </div>

        <div className="form-field">
          <label htmlFor="fact-text">Fact</label>
          <textarea
            id="fact-text"
            className="textarea-control"
            name="fact"
            value={form.fact}
            onChange={handleChange}
          />
          {errors.fact ? <span className="error-banner" style={{ marginTop: '4px', padding: '8px 10px' }}>{errors.fact}</span> : null}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="myth-explanation">Explanation</label>
        <textarea
          id="myth-explanation"
          className="textarea-control"
          name="explanation"
          value={form.explanation}
          onChange={handleChange}
        />
        {errors.explanation ? <span className="error-banner" style={{ marginTop: '4px', padding: '8px 10px' }}>{errors.explanation}</span> : null}
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="myth-category">Category</label>
          <select
            id="myth-category"
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

        <div className="form-field">
          <label htmlFor="myth-source">Source</label>
          <input
            id="myth-source"
            className="form-control"
            name="source"
            value={form.source}
            onChange={handleChange}
          />
          {errors.source ? <span className="error-banner" style={{ marginTop: '4px', padding: '8px 10px' }}>{errors.source}</span> : null}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="myth-source-url">Source URL</label>
        <input
          id="myth-source-url"
          className="form-control"
          name="sourceUrl"
          value={form.sourceUrl}
          onChange={handleChange}
        />
        {errors.sourceUrl ? <span className="error-banner" style={{ marginTop: '4px', padding: '8px 10px' }}>{errors.sourceUrl}</span> : null}
      </div>

      <div className="form-actions" style={{ marginTop: '20px' }}>
        <button type="button" className="secondary-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="primary-btn" disabled={isSubmitting}>
          {isSubmitting ? (mode === 'edit' ? 'Saving...' : 'Creating...') : mode === 'edit' ? 'Save changes' : 'Add myth/fact'}
        </button>
      </div>
    </form>
  );
}
