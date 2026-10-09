import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project, ProjectMeta } from '@/types/project';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled Project',
        description: data.description || '',
        category: data.category || 'AI / ML',
        technologies: data.technologies || [],
        image: data.image || '/images/projects/project-one.png',
        featured: Boolean(data.featured),
        year: data.year || '2026',
        role: data.role || 'Lead Designer & Engineer',
        client: data.client || 'Open Source / Lab',
        liveUrl: data.liveUrl || '#',
        githubUrl: data.githubUrl || '#',
      } as ProjectMeta;
    });

  return allProjectsData.sort((a, b) => (a.year < b.year ? 1 : -1));
}

export function getFeaturedProjects(): ProjectMeta[] {
  const projects = getAllProjects();
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
    let fileContents = '';

    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } else {
      const mdPath = path.join(projectsDirectory, `${slug}.md`);
      if (fs.existsSync(mdPath)) {
        fileContents = fs.readFileSync(mdPath, 'utf8');
      } else {
        return null;
      }
    }

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled Project',
      description: data.description || '',
      category: data.category || 'AI / ML',
      technologies: data.technologies || [],
      image: data.image || '/images/projects/project-one.png',
      featured: Boolean(data.featured),
      year: data.year || '2026',
      role: data.role || 'Lead Designer & Engineer',
      client: data.client || 'Open Source / Lab',
      liveUrl: data.liveUrl || '#',
      githubUrl: data.githubUrl || '#',
      content,
      overview: data.overview,
      problem: data.problem,
      solution: data.solution,
      results: data.results,
      metrics: data.metrics,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}
