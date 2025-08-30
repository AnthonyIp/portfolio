import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Timeline } from '../../components/Timeline';

// Mock des icônes
vi.mock('lucide-react', () => ({
  Briefcase: ({ className }: { className?: string }) => (
    <div data-testid='briefcase-icon' className={className}>
      Briefcase
    </div>
  ),
  GraduationCap: ({ className }: { className?: string }) => (
    <div data-testid='graduation-icon' className={className}>
      GraduationCap
    </div>
  ),
  MapPin: ({ className }: { className?: string }) => (
    <div data-testid='map-pin-icon' className={className}>
      MapPin
    </div>
  ),
}));

const mockTimelineItems = [
  {
    type: 'education' as const,
    year: '2023',
    title: 'Master en Informatique',
    institution: 'Université de Paris',
    location: 'Paris, France',
    description: 'Formation en développement web moderne',
    tech: ['React', 'TypeScript'],
    skills: ['Architecture', 'DevOps'],
  },
  {
    type: 'work' as const,
    year: '2022',
    title: 'Développeur Full-Stack',
    institution: 'Tech Company',
    location: 'Lyon, France',
    description: "Développement d'applications web",
    tech: ['Node.js', 'MongoDB'],
    skills: ['Agile', 'CI/CD'],
  },
];

describe('Timeline Component', () => {
  it('renders timeline title and subtitle', () => {
    render(
      <Timeline
        isDarkMode={false}
        title='Mon Parcours'
        subtitle='Mon expérience professionnelle'
        items={mockTimelineItems}
      />
    );

    expect(screen.getByText('Mon Parcours')).toBeInTheDocument();
    expect(
      screen.getByText('Mon expérience professionnelle')
    ).toBeInTheDocument();
  });

  it('renders timeline items correctly', () => {
    render(
      <Timeline
        isDarkMode={false}
        title='Mon Parcours'
        subtitle='Mon expérience professionnelle'
        items={mockTimelineItems}
      />
    );

    expect(screen.getByText('Master en Informatique')).toBeInTheDocument();
    expect(screen.getByText('Développeur Full-Stack')).toBeInTheDocument();
    expect(screen.getByText('Université de Paris')).toBeInTheDocument();
    expect(screen.getByText('Tech Company')).toBeInTheDocument();
  });

  it('displays correct icons for different item types', () => {
    render(
      <Timeline
        isDarkMode={false}
        title='Mon Parcours'
        subtitle='Mon expérience professionnelle'
        items={mockTimelineItems}
      />
    );

    expect(screen.getByTestId('graduation-icon')).toBeInTheDocument();
    expect(screen.getByTestId('briefcase-icon')).toBeInTheDocument();
  });

  it('renders technology and skills tags', () => {
    render(
      <Timeline
        isDarkMode={false}
        title='Mon Parcours'
        subtitle='Mon expérience professionnelle'
        items={mockTimelineItems}
      />
    );

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Architecture')).toBeInTheDocument();
    expect(screen.getByText('DevOps')).toBeInTheDocument();
  });

  it('applies dark mode styles correctly', () => {
    render(
      <Timeline
        isDarkMode={true}
        title='Mon Parcours'
        subtitle='Mon expérience professionnelle'
        items={mockTimelineItems}
      />
    );

    const section = screen.getByRole('region');
    expect(section).toHaveClass('bg-gray-900/60');
  });

  it('applies light mode styles correctly', () => {
    render(
      <Timeline
        isDarkMode={false}
        title='Mon Parcours'
        subtitle='Mon expérience professionnelle'
        items={mockTimelineItems}
      />
    );

    const section = screen.getByRole('region');
    expect(section).toHaveClass('bg-gray-100/60');
  });
});
