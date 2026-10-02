import { ElementRef } from '@angular/core';

let gsapRegistered = false;

/**
 * Runs the portfolio entrance/scroll animations as progressive enhancement.
 *
 * Design guarantees:
 * - Content is fully visible via CSS before this runs. GSAP only animates it;
 *   if GSAP fails to load or `prefers-reduced-motion` is set, everything stays visible.
 * - All tweens/ScrollTriggers are created inside a `gsap.context` scoped to the host,
 *   so the caller can `revert()` them on component destroy to avoid leaks.
 *
 * Returns a cleanup function (safe to call even if nothing was set up).
 */
export async function runPortfolioAnimations(
  host: ElementRef<HTMLElement>
): Promise<() => void> {
  const noop = () => undefined;

  if (
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return noop;
  }

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger')
  ]);

  if (!gsapRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    gsapRegistered = true;
  }

  const root = host.nativeElement;
  const ease = 'expo.out';

  const context = gsap.context(() => {
    gsap.from('.hero-reveal', {
      y: 40,
      opacity: 0,
      duration: 0.85,
      stagger: 0.12,
      ease
    });

    gsap.from('.hero-scene-wrap', {
      opacity: 0,
      scale: 0.9,
      y: 24,
      duration: 0.9,
      delay: 0.3,
      ease
    });

    gsap.utils.toArray<HTMLElement>('.pf-section-header').forEach((target) => {
      gsap.from(target, {
        scrollTrigger: {
          trigger: target,
          start: 'top 84%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease
      });
    });

    const mm = gsap.matchMedia(root);

    // Desktop animations (> 768px): coordinated entrance across columns
    mm.add('(min-width: 769px)', () => {
      const aboutGrid = root.querySelector('.about-grid');
      if (aboutGrid) {
        const aboutTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: aboutGrid,
            start: 'top 82%'
          }
        });

        aboutTimeline
          .from('.profile-card', {
            x: -44,
            y: 18,
            rotateY: -8,
            opacity: 0,
            duration: 0.9,
            ease
          })
          .from(
            '.about-copy-line',
            {
              y: 34,
              opacity: 0,
              duration: 0.74,
              stagger: 0.1,
              ease
            },
            '-=0.58'
          )
          .from(
            '.info-row',
            {
              x: -22,
              opacity: 0,
              duration: 0.62,
              stagger: 0.08,
              ease
            },
            '-=0.42'
          )
          .from(
            '.about-aside .compact-card',
            {
              x: 36,
              y: 18,
              opacity: 0,
              duration: 0.78,
              stagger: 0.14,
              ease
            },
            '-=0.68'
          )
          .from(
            '.mini-icons img',
            {
              scale: 0.5,
              rotate: -12,
              opacity: 0,
              duration: 0.5,
              stagger: 0.06,
              ease
            },
            '-=0.3'
          );
      }

      gsap.utils.toArray<HTMLElement>('.timeline-card').forEach((target, index) => {
        gsap.from(target, {
          scrollTrigger: {
            trigger: target,
            start: 'top 84%'
          },
          x: index % 2 === 0 ? -48 : 48,
          y: 18,
          opacity: 0,
          duration: 0.82,
          ease
        });
      });
    });

    // Mobile animations (<= 768px): zero horizontal offsets and zero 3D tilts to prevent overflow and trapezoid distortion
    mm.add('(max-width: 768px)', () => {
      const profileCard = root.querySelector('.profile-card');
      if (profileCard) {
        gsap.from(profileCard, {
          scrollTrigger: {
            trigger: profileCard,
            start: 'top 88%'
          },
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease
        });
      }

      const aboutCopyLines = root.querySelectorAll('.about-copy-line, .info-row');
      if (aboutCopyLines.length) {
        gsap.from(aboutCopyLines, {
          scrollTrigger: {
            trigger: aboutCopyLines[0],
            start: 'top 88%'
          },
          y: 22,
          opacity: 0,
          duration: 0.65,
          stagger: 0.06,
          ease
        });
      }

      const compactCards = root.querySelectorAll<HTMLElement>('.about-aside .compact-card');
      compactCards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%'
          },
          y: 22,
          opacity: 0,
          duration: 0.65,
          ease
        });
      });

      const miniIcons = root.querySelectorAll('.mini-icons img');
      if (miniIcons.length) {
        gsap.from(miniIcons, {
          scrollTrigger: {
            trigger: miniIcons[0],
            start: 'top 92%'
          },
          scale: 0.7,
          opacity: 0,
          duration: 0.45,
          stagger: 0.05,
          ease
        });
      }

      gsap.utils.toArray<HTMLElement>('.timeline-card').forEach((target) => {
        gsap.from(target, {
          scrollTrigger: {
            trigger: target,
            start: 'top 88%'
          },
          y: 22,
          opacity: 0,
          duration: 0.72,
          ease
        });
      });
    });

    const staggerGroups = [
      { selector: '.stats-shell .stat-item', stagger: 0.12, y: 42, scale: 1 },
      { selector: '.project-stage', stagger: 0.12, y: 42, scale: 0.985 },
      { selector: '.skills-grid .skill-orb', stagger: 0.1, y: 30, scale: 0.92 },
      { selector: '.contact-grid > *', stagger: 0.15, y: 48, scale: 1 }
    ];

    for (const group of staggerGroups) {
      const targets = root.querySelectorAll(group.selector);
      if (!targets.length) {
        continue;
      }

      gsap.from(targets, {
        scrollTrigger: {
          trigger: targets[0],
          start: 'top 84%'
        },
        y: group.y,
        scale: group.scale,
        opacity: 0,
        duration: 0.82,
        stagger: group.stagger,
        ease
      });
    }
  }, root);

  return () => context.revert();
}
