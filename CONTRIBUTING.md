# Contributing to Couple Name Hashtag Maker

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Submitting Changes](#submitting-changes)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/Couplehashtag.git
cd Couplehashtag
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/wdranjeet/Couplehashtag.git
```

### Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Run Development Servers

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm start
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

**Backend tests:**
```bash
cd backend
npm test  # (when tests are added)
```

**Frontend tests:**
```bash
cd frontend
npm test
```

**Manual testing:**
- Test all affected features
- Check responsive design on different screen sizes
- Verify API endpoints work correctly

### 4. Commit Changes

```bash
git add .
git commit -m "Clear description of changes"
```

Commit message format:
```
type: Brief description

Detailed explanation if needed

Fixes #issue_number
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat: Add AI-powered hashtag generation

- Integrate OpenAI API
- Add AI toggle in UI
- Update documentation

Fixes #42
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill in PR template with:
   - Description of changes
   - Screenshots (if UI changes)
   - Testing done
   - Related issues

## Coding Standards

### JavaScript/React Style

**General:**
- Use ES6+ syntax
- Use const/let instead of var
- Semicolons required
- Single quotes for strings
- 2 spaces for indentation

**React Components:**
```javascript
// Functional components with hooks
import React, { useState } from 'react';

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

**Backend API:**
```javascript
// Express routes
router.post('/endpoint', async (req, res) => {
  try {
    // Logic here
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});
```

### CSS Style

- Use BEM naming convention when appropriate
- Mobile-first responsive design
- Use CSS variables for colors/themes
- Keep specificity low

### File Organization

```
backend/
├── src/
│   ├── server.js          # Main server file
│   ├── hashtagGenerator.js # Core logic
│   └── middleware/        # Custom middleware
├── routes/
│   └── hashtags.js        # Route handlers
└── package.json

frontend/
├── public/                # Static files
├── src/
│   ├── components/        # React components
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
└── package.json
```

## Areas for Contribution

### High Priority
- [ ] AI-powered hashtag generation
- [ ] MongoDB/Firebase integration
- [ ] User authentication and favorites
- [ ] Unit and integration tests
- [ ] Accessibility improvements

### Medium Priority
- [ ] More hashtag variation algorithms
- [ ] Multi-language support
- [ ] Additional social platform integrations
- [ ] Analytics dashboard
- [ ] Export hashtags feature

### Low Priority
- [ ] Theme customization
- [ ] Custom hashtag templates
- [ ] Hashtag history
- [ ] Print-friendly format
- [ ] Hashtag statistics

## Submitting Changes

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated if needed
- [ ] Tests pass (when available)
- [ ] Manual testing completed
- [ ] No console errors or warnings
- [ ] Responsive design verified
- [ ] Screenshots included (for UI changes)

### Review Process

1. Maintainers review your PR
2. Address any feedback or requested changes
3. Once approved, PR will be merged
4. Your contribution will be acknowledged

## Reporting Bugs

### Bug Report Template

**Title:** Clear, descriptive title

**Description:**
- What happened?
- What did you expect to happen?
- Steps to reproduce
- Screenshots (if applicable)

**Environment:**
- Browser/Device
- Operating System
- Node.js version (if backend issue)

**Additional Context:**
- Any relevant logs or error messages

## Feature Requests

### Feature Request Template

**Title:** Clear feature description

**Problem:**
- What problem does this solve?
- Who would benefit?

**Proposed Solution:**
- How should it work?
- UI mockups (if applicable)

**Alternatives:**
- Other solutions considered

## Questions?

- Open an issue for questions
- Check existing issues and PRs
- Read documentation first

## Recognition

Contributors will be:
- Listed in README.md
- Credited in release notes
- Acknowledged in the project

Thank you for contributing! 💖
