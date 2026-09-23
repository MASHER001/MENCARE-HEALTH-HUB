import { useEffect, useMemo, useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import FactForm from '../components/FactForm';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import { categoryOptions, adminHealthFactsSeed } from '../data/mockData';
import {
  createHealthFact,
  deleteHealthFact,
  getHealthFacts,
  updateHealthFact,
} from '../services/api';

const emptyForm = {
  title: '',
  description: '',
  category: 'Prostate Health',
  source: '',
  sourceUrl: '',
};

export default function AdminHealthFacts() {
  const [facts, setFacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editedFact, setEditedFact] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const loadFacts = async () => {
    setLoading(true);

    try {
      const response = await getHealthFacts();
      const data = Array.isArray(response)
        ? response
        : response?.items || response?.data || adminHealthFactsSeed;

      setFacts(Array.isArray(data) && data.length > 0 ? data : adminHealthFactsSeed);
      setUsingFallback(false);
      setError('');
    } catch (requestError) {
      setFacts(adminHealthFactsSeed);
      setUsingFallback(true);
      setError('Using sample content while the backend endpoint is unavailable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFacts();
  }, []);

  const filteredFacts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return facts.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        !keyword ||
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.source.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, facts, searchTerm]);

  const handleOpenAdd = () => {
    setEditedFact(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (fact) => {
    setEditedFact(fact);
    setIsFormOpen(true);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      if (editedFact?.id) {
        const updated = await updateHealthFact(editedFact.id, values);
        const nextItem = updated && Object.keys(updated).length ? updated : { ...editedFact, ...values };

        setFacts((current) =>
          current.map((item) => (item.id === editedFact.id ? { ...item, ...nextItem } : item)),
        );
        setSuccessMessage('Health fact updated successfully.');
      } else {
        const created = await createHealthFact(values);
        const newItem = created && Object.keys(created).length ? created : { id: Date.now(), ...values };

        setFacts((current) => [newItem, ...current]);
        setSuccessMessage('Health fact added successfully.');
      }

      setIsFormOpen(false);
      setEditedFact(null);
    } catch (requestError) {
      setError(requestError.message || 'Unable to save the health fact.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!pendingDeleteId) {
      return;
    }

    setError('');
    setSuccessMessage('');

    try {
      await deleteHealthFact(pendingDeleteId);
      setFacts((current) => current.filter((item) => item.id !== pendingDeleteId));
      setSuccessMessage('Health fact deleted successfully.');
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete the health fact.');
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-toolbar admin-head-panel">
        <div className="admin-heading-block">
          <span className="admin-kicker">Content management</span>
          <h1 className="admin-heading">Manage health facts</h1>
          <p className="helper-text">Create, review, and update educational content for public health topics.</p>
        </div>

        <button type="button" className="primary-btn" onClick={handleOpenAdd}>
          + Add Health Fact
        </button>
      </div>

      {error ? <div className="error-banner">{error}</div> : null}
      {successMessage ? <div className="success-banner">{successMessage}</div> : null}

      <div className="admin-panel page-card" style={{ marginTop: '20px' }}>
        <div className="toolbar" style={{ marginBottom: '18px' }}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search health facts"
          />
          <CategoryFilter
            options={categoryOptions}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {loading ? (
          <div className="loading-box">Loading health facts...</div>
        ) : null}

        {!loading && filteredFacts.length === 0 ? (
          <div className="empty-state">No health facts found. Add a new fact to get started.</div>
        ) : null}

        {!loading && filteredFacts.length > 0 ? (
          <div className="table-shell">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Source</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFacts.map((fact) => (
                  <tr key={fact.id}>
                    <td>
                      <strong>{fact.title}</strong>
                      <div className="helper-text">{fact.description}</div>
                    </td>
                    <td>{fact.category}</td>
                    <td>
                      {fact.source}
                      <div className="helper-text">{fact.sourceUrl}</div>
                    </td>
                    <td>
                      <div className="inline-actions">
                        <button type="button" className="small-btn" onClick={() => handleOpenEdit(fact)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="danger-btn"
                          onClick={() => setPendingDeleteId(fact.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      {usingFallback ? (
        <div className="helper-text" style={{ width: '100%', marginTop: '14px' }}>
          The admin page is using local mock records until the FastAPI fact routes are available.
        </div>
      ) : null}

      {isFormOpen ? (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ width: 'min(760px, 100%)' }}>
            <div className="modal-header">
              <h3>{editedFact ? 'Edit health fact' : 'Add health fact'}</h3>
              <button type="button" className="small-btn" onClick={() => setIsFormOpen(false)} aria-label="Close form">
                ×
              </button>
            </div>

            <FactForm
              categories={categoryOptions}
              initialValues={editedFact || emptyForm}
              mode={editedFact ? 'edit' : 'create'}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      ) : null}

      {pendingDeleteId !== null ? (
        <ConfirmationModal
          title="Delete health fact"
          message="This action removes the content from the public list. Do you want to continue?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPendingDeleteId(null)}
        />
      ) : null}
    </div>
  );
}
