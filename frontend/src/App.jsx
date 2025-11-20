import { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { userService } from './services/api';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les utilisateurs au démarrage
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      await userService.createUser(userData);
      await fetchUsers();
      alert('Utilisateur créé avec succès !');
    } catch (err) {
      alert('Erreur lors de la création de l\'utilisateur');
      console.error(err);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      await userService.updateUser(editUser.id, userData);
      await fetchUsers();
      setEditUser(null);
      alert('Utilisateur mis à jour avec succès !');
    } catch (err) {
      alert('Erreur lors de la mise à jour de l\'utilisateur');
      console.error(err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await userService.deleteUser(id);
        await fetchUsers();
        alert('Utilisateur supprimé avec succès !');
      } catch (err) {
        alert('Erreur lors de la suppression de l\'utilisateur');
        console.error(err);
      }
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleCancelEdit = () => {
    setEditUser(null);
  };

  const handleSubmit = (userData) => {
    if (editUser) {
      handleUpdateUser(userData);
    } else {
      handleCreateUser(userData);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>📝 Application CRUD - Gestion des Utilisateurs</h1>
      </header>
      
      <main className="container">
        <UserForm
          onSubmit={handleSubmit}
          editUser={editUser}
          onCancelEdit={handleCancelEdit}
        />

        {loading ? (
          <div className="loading">Chargement...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <UserList
            users={users}
            onEdit={handleEdit}
            onDelete={handleDeleteUser}
          />
        )}
      </main>
    </div>
  );
}

export default App;