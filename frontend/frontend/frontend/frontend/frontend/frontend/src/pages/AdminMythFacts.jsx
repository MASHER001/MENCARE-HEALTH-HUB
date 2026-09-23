import { useEffect, useMemo, useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import MythFactForm from '../components/MythFactForm';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import { categoryOptions, adminMythFactsSeed } from '../data/mockData';
import {
  createMythFact,
  deleteMythFact,
  getMythFacts,
  updateMythFact,
} from '../services/api';

const emptyForm = {
  myth: '',
  fact: '',
  explanation: '',
  category: 'Prostate Health',
  source: '',
  sourceUrl: '',
};

export default function AdminMythFacts() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const loadItems = async () => {
    setLoading(true);

    try {
      const response = await getMythFacts();
      const data = Array.isArray(response)
        ? response
        : response?.items || response?.data || adminMythFactsSeed;

      setItems(Array.isArray(data) && data.length > 0 ? data : adminMythFactsSeed);
      setUsingFallback(false);
      setError('');
    } catch (requestError) {
      setItems(adminMythFactsSeed);
      setUsingFallback(true);
      setError('Using sample myth-versus-fact content while the backend endpoint is unavailable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredItems = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        !keyword ||
        item.myth.toLowerCase().includes(keyword) ||
        item.fact.toLowerCase().includes(keyword) ||
        item.explanation.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.source.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, items, searchTerm]);

  const handleOpenAdd = () => {
    setEditedItem(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditedItem(item);
    setIsFormOpen(true);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      if (editedItem?.id) {
        const updated = await updateMythFact(editedItem.id, values);
        const nextItem = updated && Object.keys(updated).length ? updated : { ...editedItem, ...values };

        setItems((current) =>
          current.map((item) => (item.id === editedItem.id ? { ...item, ...nextItem } : item)),
        );
        setSuccessMessage('Myth/fact updated successfully.');
      } else {
        const created = await createMythFact(values);
        const newItem = created && Object.keys(created).length ? created : { id: Date.now(), ...values };

        setItems((current) => [newItem, ...current]);
        setSuccessMessage('Myth/fact added successfully.');
      }

      setIsFormOpen(false);
      setEditedItem(null);
    } catch (requestError) {
      setError(requestError.message || 'Unable to save the myth/fact entry.');
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
      await deleteMythFact(pendingDeleteId);
      setItems((current) => current.filter((item) => item.id !== pendingDeleteId));
      setSuccessMessage('Myth/fact deleted successfully.');
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete the myth/fact entry.');
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-toolbar admin-head-panel">
        <div className="admin-heading-block">
          <span className="admin-kicker">Content management</span>
          <h1 className="admin-heading">Manage myth and fact content</h1>
          <p className="helper-text">Add, edit, and remove educational myth-versus-fact entries for the public site.</p>
        </div>

        <button type="button" className="primary-btn" onClick={handleOpenAdd}>
          + Add Myth/Fact
        </button>
      </div>

      {error ? <div className="error-banner">{error}</div> : null}
      {successMessage ? <div className="success-banner">{successMessage}</div> : null}

      <div className="admin-panel page-card" style={{ marginTop: '20px' }}>
        <div className="toolbar" style={{ marginBottom: '18px' }}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search myth/fact content"
          />
          <CategoryFilter
            options={categoryOptions}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {loading ? (
          <div className="loading-box">Loading myth/fact entries...</div>
        ) : null}

        {!loading && filteredItems.length === 0 ? (
          <div className="empty-state">No myth/fact entries match this search. Add one to begin.</div>
        ) : null}

        {!loading && filteredItems.length > 0 ? (
          <div className="table-shell">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Myth</th>
                  <th>Fact</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.myth}</td>
                    <td>{item.fact}</td>
                    <td>{item.category}</td>
                    <td>
                      <div className="inline-actions">
                        <button type="button" className="small-btn" onClick={() => handleOpenEdit(item)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="danger-btn"
                          onClick={() => setPendingDeleteId(item.id)}
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
          The admin page is using local mock records until the FastAPI myth/fact routes are available.
        </div>
      ) : null}

      {isFormOpen ? (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ width: 'min(760px, 100%)' }}>
            <div className="modal-header">
              <h3>{editedItem ? 'Edit myth/fact entry' : 'Add myth/fact entry'}</h3>
              <button type="button" className="small-btn" onClick={() => setIsFormOpen(false)} aria-label="Close form">
                ×
              </button>
            </div>

            <MythFactForm
              categories={categoryOptions}
              initialValues={editedItem || emptyForm}
              mode={editedItem ? 'edit' : 'create'}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      ) : null}

      {pendingDeleteId !== null ? (
        <ConfirmationModal
          title="Delete myth/fact entry"
          message="This removes the myth-versus-fact content from the public experience. Do you want to continue?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPendingDeleteId(null)}
        />
      ) : null}
    </div>
  );
}
