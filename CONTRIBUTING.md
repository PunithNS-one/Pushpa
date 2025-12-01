# Contributing to MicroSync

Thank you for your interest in contributing to MicroSync! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We aim to maintain a welcoming environment for all contributors.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, browser)

### Suggesting Features

Feature requests are welcome! Please open an issue with:
- Clear description of the feature
- Use case and benefits
- Any implementation ideas

### Submitting Pull Requests

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   git clone https://github.com/YOUR_USERNAME/MicroSync.git
   cd MicroSync
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the code style guidelines
   - Write clear commit messages
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   # Backend
   cd backend
   npm run build
   npm run dev
   
   # Frontend
   cd frontend
   npm run build
   npm run dev
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

## Development Guidelines

### Code Style

**TypeScript/JavaScript:**
- Use TypeScript for type safety
- Follow ESLint rules
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

**React:**
- Use functional components with hooks
- Keep components small and reusable
- Use proper prop types
- Follow React best practices

**Styling:**
- Use Tailwind CSS utility classes
- Follow existing design patterns
- Ensure responsive design
- Test on multiple screen sizes

### Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/config changes

Examples:
```
feat: add image upload support
fix: resolve CORS issue in production
docs: update installation instructions
style: format code with prettier
refactor: simplify PIN generation logic
```

### Project Structure

**Backend:**
```
backend/src/
├── config/       # Configuration files
├── controllers/  # Request handlers
├── services/     # Business logic
├── routes/       # API routes
├── middleware/   # Custom middleware
└── server.ts     # Entry point
```

**Frontend:**
```
frontend/src/
├── api/          # API client
├── components/   # Reusable components
├── pages/        # Page components
├── hooks/        # Custom hooks
├── utils/        # Utility functions
└── App.tsx       # Main component
```

### Adding New Features

1. **Backend API Endpoint:**
   - Add service function in `services/`
   - Add controller in `controllers/`
   - Add route in `routes/`
   - Update API documentation

2. **Frontend Feature:**
   - Create component in `components/` or `pages/`
   - Add API call in `api/client.ts`
   - Update routing if needed
   - Add proper error handling

### Testing

**Manual Testing:**
- Test all user flows
- Test error scenarios
- Test on different browsers
- Test on mobile devices

**API Testing:**
```bash
# Health check
curl http://localhost:4000/api/health

# Create session
curl -X POST http://localhost:4000/api/create \
  -H "Content-Type: application/json" \
  -d '{"type":"text","content":"Test","ttlSeconds":600}'

# Fetch session
curl -X POST http://localhost:4000/api/fetch \
  -H "Content-Type: application/json" \
  -d '{"pin":"123456"}'
```

## Feature Ideas

Here are some features you could contribute:

### High Priority
- [ ] Image upload and sharing
- [ ] End-to-end encryption
- [ ] Progressive Web App (PWA)
- [ ] Dark mode toggle
- [ ] Multi-language support

### Medium Priority
- [ ] File upload support
- [ ] Custom PIN option
- [ ] PIN history (optional)
- [ ] Analytics dashboard
- [ ] Email notifications

### Low Priority
- [ ] Voice message support
- [ ] Video sharing
- [ ] Collaborative editing
- [ ] Pin favorites
- [ ] Social sharing options

## Questions?

Feel free to:
- Open an issue for questions
- Join discussions
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to MicroSync! 🎉
