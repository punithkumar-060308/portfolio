import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import GitHubRepos from '@/components/GitHubRepos';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <GitHubRepos />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
