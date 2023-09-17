const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/locks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/view_locks');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.added-form')
  .addEventListener('click', delButtonHandler);