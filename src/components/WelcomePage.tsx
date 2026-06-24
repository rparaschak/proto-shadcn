import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  Boxes,
  Lock,
  Layers,
  Wand2,
  ArrowRight,
  MousePointerClick,
  PanelsTopLeft,
  FileText,
  Users,
  Lightbulb,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { modules } from '@/modules/registry'

const steps = [
  {
    icon: Wand2,
    title: 'Describe a feature',
    body: 'Tell Claude what you want to see. One feature per chat keeps each prototype focused.',
  },
  {
    icon: Boxes,
    title: 'Watch it become a module',
    body: 'The feature is built as its own self-contained module — its own pages, data, and content.',
  },
  {
    icon: PanelsTopLeft,
    title: 'Switch between modules',
    body: 'Use the grid menu in the header (top-left) to jump between every feature that has been built.',
  },
]

const concepts = [
  {
    icon: Boxes,
    title: 'Modules',
    body: 'Each feature is one module. They all show up in the menu so you can jump between them.',
  },
  {
    icon: Lock,
    title: 'Isolation',
    body: 'Modules never share data or state. Each feature is fully self-contained.',
  },
  {
    icon: Sparkles,
    title: 'Business logic',
    body: "A feature's business logic persists only within its own module — it never leaks out to the others.",
  },
  {
    icon: Layers,
    title: 'Consistent design',
    body: 'Every feature is built from the same set of UI building blocks, so all prototypes look and feel consistent.',
  },
]

function HeroSection() {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <Badge variant="secondary" className="gap-1.5">
        <Sparkles className="w-3 h-3" />
        Rapid feature prototyping
      </Badge>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">Welcome to Proto Shadcn</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        A playground where product people describe a feature and watch it get built in real time.
        Every feature is an isolated module you can reach from the menu in the header.
      </p>
    </div>
  )
}

function FeatureDevelopmentSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold">Feature development</h2>
      <p className="mt-1 text-muted-foreground">
        Describe what you want, and watch it get built — one feature at a time.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {steps.map((step, i) => (
          <Card key={step.title} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <step.icon className="w-4 h-4" />
                </div>
                <span className="text-2xl font-bold text-muted-foreground/30">{i + 1}</span>
              </div>
              <CardTitle className="mt-2 text-base">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{step.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function ConceptsSection() {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Core concepts
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {concepts.map((concept) => (
          <div
            key={concept.title}
            className="flex gap-4 rounded-xl border bg-card p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <concept.icon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{concept.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{concept.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function DocumentsSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold">Documents</h2>
      <p className="mt-1 text-muted-foreground">
        Capture the thinking behind a feature, right next to it.
      </p>
      <div className="mt-5 rounded-xl border bg-card p-5">
        <div className="flex gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <FileText className="w-4 h-4" />
          </div>
          <div className="space-y-3 text-sm">
            <p>
              Alongside any feature, you can ask for a document — a brief, notes, a spec —
              to be created. It persists as an artifact of that module and shows up in the
              module's sidebar under{' '}
              <span className="font-medium text-foreground">Documents</span>.
            </p>
            <p className="text-muted-foreground">
              It's a simple way to capture the thinking behind a prototype, so the intent
              travels right along with the feature.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold">Team work</h2>
      <p className="mt-1 text-muted-foreground">
        Save your work and share it with everyone.
      </p>
      <div className="mt-5 rounded-xl border bg-card p-5">
        <div className="flex gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Users className="w-4 h-4" />
          </div>
          <div className="space-y-3 text-sm">
            <p>
              When a feature is ready, you can ask to save and share it — it's committed and
              published so the whole team has it.
            </p>
            <p className="text-muted-foreground">
              Everyone's prototypes live in one place. Start a session with the latest and
              you'll see what teammates have built, and they'll see yours.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function CreativeSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold">Be creative</h2>
      <p className="mt-1 text-muted-foreground">
        This isn't a fixed tool — you can shape how it works.
      </p>
      <div className="mt-5 rounded-xl border bg-card p-5">
        <div className="flex gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="space-y-3 text-sm">
            <p>
              Adjust the rules and conventions, or set up reusable skills and agents that
              make future work faster and more consistent — tailored to how your team works.
            </p>
            <p className="text-muted-foreground">
              If something should behave differently, just ask. The platform bends to fit you,
              not the other way around.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ModulesSection() {
  const navigate = useNavigate()

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Explore the modules
        </h2>
        <span className="text-xs text-muted-foreground">
          {modules.length} built
        </span>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {modules.map((module) => (
          <Card
            key={module.id}
            onClick={() => navigate(module.path)}
            className="cursor-pointer transition-colors hover:border-blue-600/50 hover:bg-accent/40"
          >
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <module.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base">{module.name}</CardTitle>
                  <CardDescription className="mt-1">{module.description}</CardDescription>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default function WelcomePage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 space-y-12">
      <HeroSection />

      {/* Three main blocks */}
      <FeatureDevelopmentSection />
      <DocumentsSection />
      <TeamSection />
      <CreativeSection />

      {/* Reference */}
      <div className="border-t pt-12 space-y-12">
        <ConceptsSection />
        <ModulesSection />
      </div>

      <div className="flex flex-col items-center gap-3 border-t pt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Ready to look around? Open the first module or pick one from the menu.
        </p>
        <Button onClick={() => navigate(modules[0]?.path ?? '/')} className="gap-2">
          <MousePointerClick className="w-4 h-4" />
          Open {modules[0]?.name ?? 'a module'}
        </Button>
      </div>
    </div>
  )
}
