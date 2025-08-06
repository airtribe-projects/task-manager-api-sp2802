function validateCreate(req, res, next) {
  const { title, description, completed, priority } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim() === '') {
    errors.push('Title is required and must be a non-empty string.');
  }

  if (!description || typeof description !== 'string' || description.trim() === '') {
    errors.push('Description is required and must be a non-empty string.');
  }

  if (typeof completed !== 'boolean') {
    errors.push('Completed must be a boolean value.');
  }

  if (!['low', 'medium', 'high'].includes(priority?.toLowerCase())) {
    errors.push('Priority must be one of: low, medium, high.');
  }

  if (errors.length) return res.status(400).json({ errors });

  next();
}

function validateUpdate(req, res, next) {
  const { title, description, completed, priority } = req.body;
  const errors = [];

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    errors.push('Title must be a non-empty string if provided.');
  }

  if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
    errors.push('Description must be a non-empty string if provided.');
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    errors.push('Completed must be a boolean value if provided.');
  }

  if (priority !== undefined && !['low', 'medium', 'high'].includes(priority?.toLowerCase())) {
    errors.push('Priority must be one of: low, medium, high if provided.');
  }

  if (errors.length) return res.status(400).json({ errors });

  next();
}

module.exports = {
  validateCreate,
  validateUpdate
};