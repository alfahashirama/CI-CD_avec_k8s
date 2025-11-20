const db = require('../config/database');

class User {
  // Récupérer tous les utilisateurs
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM users ORDER BY created_at DESC');
    return rows;
  }

  // Récupérer un utilisateur par ID
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  // Créer un nouvel utilisateur
  static async create(userData) {
    const { name, email, age } = userData;
    const [result] = await db.query(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age]
    );
    return { id: result.insertId, name, email, age };
  }

  // Mettre à jour un utilisateur
  static async update(id, userData) {
    const { name, email, age } = userData;
    await db.query(
      'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
      [name, email, age, id]
    );
    return this.findById(id);
  }

  // Supprimer un utilisateur
  static async delete(id) {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = User;