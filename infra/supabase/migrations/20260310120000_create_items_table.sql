-- Create the items table
CREATE TABLE public.items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'frontend',
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- SELECT: users can only read their own items
CREATE POLICY "Users can view own items"
  ON public.items FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: users can only insert items for themselves
CREATE POLICY "Users can insert own items"
  ON public.items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: users can only update their own items
CREATE POLICY "Users can update own items"
  ON public.items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: users can only delete their own items
CREATE POLICY "Users can delete own items"
  ON public.items FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes for common queries
CREATE INDEX idx_items_user_id ON public.items(user_id);
CREATE INDEX idx_items_category ON public.items(category);

-- Trigger function to seed demo items for new users (SECURITY DEFINER to bypass RLS)
CREATE OR REPLACE FUNCTION public.seed_user_items()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.items (user_id, title, description, category, priority, status)
  VALUES
    -- Frontend tasks (9)
    (NEW.id, 'Implement dark mode toggle', 'Add theme switching with system preference detection and persistent user choice', 'frontend', 'high', 'active'),
    (NEW.id, 'Build responsive navigation', 'Create a mobile-first navigation with hamburger menu and breadcrumbs', 'frontend', 'high', 'completed'),
    (NEW.id, 'Create reusable form components', 'Build TextField, Select, Checkbox, and RadioGroup with validation support', 'frontend', 'high', 'completed'),
    (NEW.id, 'Add skeleton loading states', 'Implement shimmer skeleton screens for all data-loading views', 'frontend', 'medium', 'active'),
    (NEW.id, 'Implement pull-to-refresh', 'Add pull-to-refresh gesture on scrollable lists with haptic feedback', 'frontend', 'medium', 'active'),
    (NEW.id, 'Build onboarding carousel', 'Create a swipeable intro flow with animated illustrations and skip button', 'frontend', 'low', 'archived'),
    (NEW.id, 'Optimize image lazy loading', 'Implement progressive image loading with blur-up placeholder technique', 'frontend', 'medium', 'completed'),
    (NEW.id, 'Add keyboard shortcuts overlay', 'Build a modal showing available keyboard shortcuts for power users', 'frontend', 'low', 'active'),
    (NEW.id, 'Create animated page transitions', 'Implement shared element transitions between list and detail views', 'frontend', 'medium', 'active'),

    -- Backend tasks (9)
    (NEW.id, 'Set up CI/CD pipeline', 'Configure GitHub Actions for automated testing, linting, and deployment', 'backend', 'high', 'completed'),
    (NEW.id, 'Implement rate limiting', 'Add rate limiting middleware to prevent API abuse on public endpoints', 'backend', 'high', 'active'),
    (NEW.id, 'Create database migration system', 'Set up versioned migrations with rollback support and seed data', 'backend', 'high', 'completed'),
    (NEW.id, 'Add request validation middleware', 'Build Zod-based request validation for all API endpoints', 'backend', 'medium', 'completed'),
    (NEW.id, 'Implement webhook handlers', 'Create webhook endpoint for payment provider callbacks with signature verification', 'backend', 'medium', 'active'),
    (NEW.id, 'Set up error monitoring', 'Integrate Sentry for error tracking with source maps and release tracking', 'backend', 'medium', 'active'),
    (NEW.id, 'Build email notification service', 'Create templated email system for user notifications and transactional emails', 'backend', 'low', 'archived'),
    (NEW.id, 'Optimize database queries', 'Profile and optimize slow queries, add missing indexes and query caching', 'backend', 'high', 'active'),
    (NEW.id, 'Implement API versioning', 'Add URL-based API versioning with deprecation headers and migration guides', 'backend', 'low', 'active'),

    -- Design tasks (9)
    (NEW.id, 'Design onboarding flow', 'Create wireframes and high-fidelity mockups for the first-time user experience', 'design', 'high', 'completed'),
    (NEW.id, 'Create icon library', 'Design and export a consistent set of custom icons in multiple sizes', 'design', 'medium', 'completed'),
    (NEW.id, 'Build design system documentation', 'Document color palette, typography scale, spacing, and component usage guidelines', 'design', 'high', 'active'),
    (NEW.id, 'Design empty state illustrations', 'Create friendly illustrations for empty lists, no results, and error states', 'design', 'medium', 'active'),
    (NEW.id, 'Conduct usability audit', 'Review all screens for accessibility, touch targets, and navigation consistency', 'design', 'high', 'active'),
    (NEW.id, 'Create motion design guidelines', 'Define animation timing, easing curves, and transition patterns for the app', 'design', 'low', 'active'),
    (NEW.id, 'Design notification center', 'Create mockups for in-app notification feed with read/unread states', 'design', 'medium', 'archived'),
    (NEW.id, 'Build color theme generator', 'Create a tool for generating accessible color palettes from brand colors', 'design', 'low', 'completed'),
    (NEW.id, 'Design data visualization components', 'Create chart and graph component designs for analytics dashboard', 'design', 'medium', 'active'),

    -- DevOps tasks (8)
    (NEW.id, 'Configure load balancer', 'Set up nginx reverse proxy with SSL termination and health checks', 'devops', 'high', 'completed'),
    (NEW.id, 'Set up monitoring dashboard', 'Configure Grafana dashboards for CPU, memory, request latency, and error rates', 'devops', 'high', 'active'),
    (NEW.id, 'Implement auto-scaling policies', 'Configure horizontal pod autoscaler based on CPU and request metrics', 'devops', 'medium', 'active'),
    (NEW.id, 'Create disaster recovery plan', 'Document backup procedures, recovery steps, and RTO/RPO targets', 'devops', 'high', 'active'),
    (NEW.id, 'Set up log aggregation', 'Configure centralized logging with structured logs and alerting rules', 'devops', 'medium', 'completed'),
    (NEW.id, 'Implement blue-green deployment', 'Set up zero-downtime deployment strategy with automated rollback', 'devops', 'medium', 'active'),
    (NEW.id, 'Configure secrets management', 'Set up HashiCorp Vault for secure secrets storage and rotation', 'devops', 'high', 'completed'),
    (NEW.id, 'Build infrastructure as code templates', 'Create Terraform modules for reproducible infrastructure provisioning', 'devops', 'low', 'archived');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.seed_user_items();
