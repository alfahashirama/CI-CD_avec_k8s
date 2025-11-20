import { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, editUser, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  useEffect(() => {
    if (editUser) {
      setFormData({
        name: editUser.name,
        email: editUser.email,
        age: editUser.age || ''
      });
    }
  }, [editUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editUser) {
      setFormData({ name: '', email: '', age: '' });
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', age: '' });
    onCancelEdit();
  };

  return (
    <div className="user-form">
      <h2>{editUser ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Entrez le nom"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="exemple@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Âge</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Entrez l'âge"
            min="1"
            max="150"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editUser ? 'Mettre à jour' : 'Ajouter'}
          </button>
          {editUser && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;