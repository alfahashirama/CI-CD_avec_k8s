const UserItem = ({ user, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.age || '-'}</td>
      <td>
        <button className="btn btn-edit" onClick={() => onEdit(user)}>
          Modifier
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(user.id)}>
          Supprimer
        </button>
      </td>
    </tr>
  );
};

export default UserItem;