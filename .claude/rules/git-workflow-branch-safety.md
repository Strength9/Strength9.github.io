# Git Workflow & Branch Safety

> Category: git_workflow | Version: 2

# Git Workflow & Branch Safety

## Branch Strategy
- **Work on `development`** (or feature branches off it) — never commit directly to `main`
- Before starting work, verify branch: `git branch --show-current`
- If on `main`, switch immediately: `git checkout development`

## Commit & Push
- Commit at logical checkpoints (completed checklist items, features, fixes)
- Message format: `feat(scope): description`, `fix(scope): description`
- Push to `development` or feature branch — never `git push origin main`
- Never commit half-working OAuth flows, broken migrations, or untested code

## Merging to Production
- All merges to `main` happen via **GitHub Pull Requests only**
- PR must pass CI checks and be reviewed before merge
- After merge, sync development: `git checkout development && git pull origin main`

## GitHub Repository Setup
- **Branch protection on `main`**: require PR reviews, require status checks, no bypass
- **Default branch**: set to `development` so clones start on the right branch

## Nexus Stage Template for Development Projects

```
1. Planning & Setup        — requirements, tech spec, environment, branch verification
2. Development             — implementation, self-review, unit tests
3. Testing & QA            — functional testing, integration, edge cases (manual verification)
4. Deployment Preparation  — create PR, code review, CI checks, merge to main
5. Deployment & Monitoring — production deploy, smoke test, verify logs
```

Each stage should have checklist items tracked in Nexus. The QA stage requires manual sign-off before proceeding to deployment.

## Claude Code Integration
When executing commands from Nexus:
1. Verify branch (switch to `development` if needed)
2. Pull latest changes
3. Implement and test
4. Commit and push to `development`
5. Mark Nexus checklist items complete
6. Add stage notes for context

